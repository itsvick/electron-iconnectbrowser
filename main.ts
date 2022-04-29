import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import * as path from 'path';
import { shell } from 'electron';
import * as fs from 'fs';
import * as driveList from 'drivelist';
import * as usb from 'usb-detection';

let win: BrowserWindow | null = null;

app.on('ready', createWindow);

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

function createWindow() {
  console.log('create window start');
  win = new BrowserWindow({
    width: 1700,
    height: 900,
    minWidth: 1180,
    minHeight: 780,
    webPreferences: {
      nodeIntegration: true,
      webviewTag:true,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(app.getAppPath(), 'dist/extraResources/preload', 'preload.js'),
      // dev tools for debugging
      // devTools: true
    },
    icon: path.join(app.getAppPath(), 'dist/assets', 'favicon.png'),
  });

  // win.webContents.openDevTools()

  // https://stackoverflow.com/a/58548866/600559
  Menu.setApplicationMenu(null);

  win.loadFile(path.join(app.getAppPath(), 'dist', 'index.html'));

  win.on('closed', () => {
    win = null;
  });
}

// ipcMain.on('dev-tools', () => {
//   if (win) {
//     win.webContents.toggleDevTools();
//   }
// });

ipcMain.on('open-link', (event, args) => {
  shell.openExternal(args[0]);
});


ipcMain.on('all-video-paths', (event, args) => {
  const sdCardPath = args[0];
  fs.readdir(sdCardPath, (err, items) => {
    if (err) {
      console.log(err);
    } else {


      if (items) {
        console.log('found', items.length + ' videos');
        if (win) {
          event.sender.send('all-video-path-complete', items);
        }
      } else {
        if (win) {
          event.sender.send('all-video-path-complete', []);
        }
      }
    }
  });
});


ipcMain.on('video-path', (event, args) => {
  const sdCardPath = args[0];
  const encryptedCode = args[1]
  fs.readdir(sdCardPath, (err, items) => {
    if (err) {
      console.log(err);
    } else {
      const video = items.find(i => i.substr(i.length - 4) == encryptedCode);

      if (video) {
        if (win) {
          event.sender.send('video-path-complete', { hasPath: true, path: sdCardPath + video });
        }
      } else {
        if (win) {
          event.sender.send('video-path-complete', { hasPath: false, path: Math.random().toString(36).substring(7) });
        }
      }
      // items.forEach((item) => {
      //   if (item.substr(item.length - 4) == encryptedCode) {
      //     this.openVideoDialog(sdCardPath + item);
      //     if(win) {
      //     event.sender.send('video-path-complete', sdCardPath + item);
      //     }
      //   }
      // });
    }
  });
});

ipcMain.on('start-monitoring', (event) => {
  usb.startMonitoring();
});

ipcMain.on('monitoring', (event) => {
  usb.on('add', (device) => {
    if (win) {
      event.sender.send('usb-info-change', { add: true, device });
      // this delay is for the pc to catch up that a drive is plugged in. (might be too little time in some cases ?)
      setTimeout(() => {
        console.log('device added', device);
        ipcMain.emit('detect-sd-card');
      }, 5000)
    }
  });
  usb.on('remove', (device) => {
    if (win) {
      event.sender.send('usb-info-change', { add: false, device });
      // this delay is for the pc to catch up that a drive is plugged in. (might be too little time in some cases ?)
      setTimeout(() => {
        ipcMain.emit('detect-sd-card');
      }, 5000)
    }
  });
});

ipcMain.on('detect-sd-card', async (event) => {
  const drives: Array<any> = await (await driveList.list()).filter(d => (d.isUSB || d.isCard));

  let sdCardPath: string = '';
  const drivesLength: number = (drives.length - 1) as number;
  // internal hard drives filtered out by this point.
  if (drives.length <= 0) {
    if (win) {
      if (event) {
        event.sender.send('detect-sd-card-complete', { hasPath: false, path: Math.random().toString(36).substring(7) });
      } else {
        win.webContents.send("detect-sd-card-complete", { hasPath: false, path: Math.random().toString(36).substring(7) });
      }
    }
  } else {
    for (const { index, drive } of drives.map((drive, index) => ({ index, drive }))) {
      const mountPath = drive.mountpoints[0].path;
      fs.readdir(mountPath, (err, items) => {
        if (err) {
          console.log(err);
        } else {
          try {
            if (win) {
              if (items.includes('.papervideo')) {
                sdCardPath = mountPath + '/.papervideo/'
                if (event) {
                  event.sender.send('detect-sd-card-complete', { hasPath: true, path: sdCardPath });
                } else {
                  win.webContents.send("detect-sd-card-complete", { hasPath: true, path: sdCardPath });
                }

              } else {

                if (!items.includes('.papervideo') && index === drivesLength) {
                  if (event) {
                    event.sender.send('detect-sd-card-complete', { hasPath: false, path: Math.random().toString(36).substring(7) });
                  } else {
                    win.webContents.send("detect-sd-card-complete", { hasPath: false, path: Math.random().toString(36).substring(7) });
                  }
                }
              }
            } else {
              console.log('win null somehow');
            }
          } catch(err) {
            console.log('OOPS', err)
          }
        }
      })
    }
  }
});
