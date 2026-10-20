const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('vcadUpdater', {
  check: () => ipcRenderer.invoke('vcad:check-updates'),
  onProgress: (callback) => {
    if (typeof callback !== 'function') return;
    const listener = (_event, payload) => callback(payload);
    ipcRenderer.on('vcad:update-event', listener);
    // Return an unsubscribe function for future UI lifecycle changes.
    return () => ipcRenderer.removeListener('vcad:update-event', listener);
  }
});
