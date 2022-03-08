"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var electron_2 = require("electron");
var fs = require("fs");
var driveList = require("drivelist");
var usb = require("usb-detection");
var win = null;
electron_1.app.on('ready', createWindow);
electron_1.app.on('activate', function () {
    if (win === null) {
        createWindow();
    }
});
function createWindow() {
    console.log('create window start');
    win = new electron_1.BrowserWindow({
        width: 1700,
        height: 900,
        minWidth: 1180,
        minHeight: 780,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(electron_1.app.getAppPath(), 'dist/extraResources/preload', 'preload.js'),
        },
        icon: path.join(electron_1.app.getAppPath(), 'dist/assets', 'favicon.ico'),
    });
    win.webContents.openDevTools();
    // https://stackoverflow.com/a/58548866/600559
    electron_1.Menu.setApplicationMenu(null);
    win.loadFile(path.join(electron_1.app.getAppPath(), 'dist', 'index.html'));
    win.on('closed', function () {
        win = null;
    });
}
electron_1.ipcMain.on('dev-tools', function () {
    if (win) {
        win.webContents.toggleDevTools();
    }
});
electron_1.ipcMain.on('open-link', function (event, args) {
    electron_2.shell.openExternal(args[0]);
});
electron_1.ipcMain.on('all-video-paths', function (event, args) {
    var sdCardPath = args[0];
    fs.readdir(sdCardPath, function (err, items) {
        if (err) {
            console.log(err);
        }
        else {
            if (items) {
                console.log('found', items.length + ' videos');
                if (win) {
                    event.sender.send('all-video-path-complete', items);
                }
            }
            else {
                if (win) {
                    event.sender.send('all-video-path-complete', []);
                }
            }
        }
    });
});
electron_1.ipcMain.on('video-path', function (event, args) {
    var sdCardPath = args[0];
    var encryptedCode = args[1];
    console.log('hits');
    fs.readdir(sdCardPath, function (err, items) {
        if (err) {
            console.log(err);
        }
        else {
            var video = items.find(function (i) { return i.substr(i.length - 4) == encryptedCode; });
            if (video) {
                console.log('found', video);
                if (win) {
                    event.sender.send('video-path-complete', { hasPath: true, path: sdCardPath + video });
                }
            }
            else {
                console.log('not found', encryptedCode);
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
electron_1.ipcMain.on('start-monitoring', function (event) {
    usb.startMonitoring();
});
electron_1.ipcMain.on('monitoring', function (event) {
    usb.on('add', function (device) {
        if (win) {
            event.sender.send('usb-info-change', { add: true, device: device });
            // this delay is for the pc to catch up that a drive is plugged in. (might be too little time in some cases ?)
            setTimeout(function () {
                console.log('device added', device);
                electron_1.ipcMain.emit('detect-sd-card');
            }, 5000);
        }
    });
    usb.on('remove', function (device) {
        if (win) {
            event.sender.send('usb-info-change', { add: false, device: device });
            // this delay is for the pc to catch up that a drive is plugged in. (might be too little time in some cases ?)
            setTimeout(function () {
                electron_1.ipcMain.emit('detect-sd-card');
            }, 5000);
        }
    });
});
electron_1.ipcMain.on('detect-sd-card', function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var drives, sdCardPath, drivesLength, _loop_1, _i, _a, _b, index, drive;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                console.log('event--test', event);
                return [4 /*yield*/, driveList.list()];
            case 1: return [4 /*yield*/, (_c.sent()).filter(function (d) { return (d.isUSB || d.isCard); })];
            case 2:
                drives = _c.sent();
                console.log('drives', drives);
                sdCardPath = '';
                drivesLength = (drives.length - 1);
                // internal hard drives filtered out by this point.
                if (drives.length <= 0) {
                    console.log('zero drives');
                    if (win) {
                        console.log('sends false');
                        if (event) {
                            event.sender.send('detect-sd-card-complete', { hasPath: false, path: Math.random().toString(36).substring(7) });
                        }
                        else {
                            win.webContents.send("detect-sd-card-complete", { hasPath: false, path: Math.random().toString(36).substring(7) });
                        }
                    }
                }
                else {
                    _loop_1 = function (index, drive) {
                        // console.log('index', index);
                        var mountPath = drive.mountpoints[0].path;
                        fs.readdir(mountPath, function (err, items) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                console.log('event--', event);
                                try {
                                    if (win) {
                                        console.log("itemes", items);
                                        if (items.includes('.papervideo')) {
                                            sdCardPath = mountPath + '/.papervideo/';
                                            console.log('found on index', index);
                                            // console.log('sends true');
                                            if (event) {
                                                event.sender.send('detect-sd-card-complete', { hasPath: true, path: sdCardPath });
                                            }
                                            else {
                                                win.webContents.send("detect-sd-card-complete", { hasPath: true, path: sdCardPath });
                                            }
                                        }
                                        else {
                                            if (!items.includes('.papervideo') && index === drivesLength) {
                                                console.log('sends false');
                                                if (event) {
                                                    event.sender.send('detect-sd-card-complete', { hasPath: false, path: Math.random().toString(36).substring(7) });
                                                }
                                                else {
                                                    win.webContents.send("detect-sd-card-complete", { hasPath: false, path: Math.random().toString(36).substring(7) });
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        console.log('win null somehow');
                                    }
                                }
                                catch (err) {
                                    console.log('OOPS', err);
                                }
                            }
                        });
                    };
                    for (_i = 0, _a = drives.map(function (drive, index) { return ({ index: index, drive: drive }); }); _i < _a.length; _i++) {
                        _b = _a[_i], index = _b.index, drive = _b.drive;
                        _loop_1(index, drive);
                    }
                }
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=main.js.map