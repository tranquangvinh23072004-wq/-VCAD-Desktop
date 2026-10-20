const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('vcadUpdater', {
  check: () => ipcRenderer.invoke('vcad:check-updates')
});
