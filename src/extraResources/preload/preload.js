const { contextBridge, ipcRenderer } = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {
  electronIpcSend: (channel, ...arg) => {
    ipcRenderer.send(channel, arg);
  },
  electronIpcSendSync: (channel, ...arg) => {
    return ipcRenderer.sendSync(channel, arg);
  },
  electronIpcOn: (channel, listener) => {
    ipcRenderer.on(channel, listener);
  },
  electronIpcOnce: (channel, listener) => {
    ipcRenderer.once(channel, listener);
  },
  electronIpcRemoveListener: (channel, listener) => {
    ipcRenderer.removeListener(channel, listener);
  },
  electronIpcRemoveAllListeners: (channel) => {
    ipcRenderer.removeAllListeners(channel);
  },
});
