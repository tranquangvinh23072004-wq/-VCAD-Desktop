const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');

let mainWindow;
let checking = false;
function sendUpdate(event, extra = {}) {
  if (mainWindow && !mainWindow.isDestroyed() && mainWindow.webContents && !mainWindow.webContents.isDestroyed()) {
    mainWindow.webContents.send('vcad:update-event', { event, ...extra });
  }
}
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440, height: 900, minWidth: 1000, minHeight: 650,
    backgroundColor: '#1e1f26', autoHideMenuBar: true,
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false, sandbox: true }
  });
  mainWindow.loadFile(path.join(__dirname, 'app', 'index.html'));
  mainWindow.webContents.on('did-fail-load', (_e, code, description) => sendUpdate('error', { message: `Không tải được giao diện (${code}): ${description}` }));
}
app.whenReady().then(() => {
  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = true;
  autoUpdater.on('checking-for-update', () => sendUpdate('checking-for-update'));
  autoUpdater.on('update-available', info => sendUpdate('update-available', { version: info.version }));
  autoUpdater.on('update-not-available', info => sendUpdate('update-not-available', { version: info.version }));
  autoUpdater.on('download-progress', p => sendUpdate('download-progress', { percent: p.percent, transferred: p.transferred, total: p.total, bytesPerSecond: p.bytesPerSecond }));
  autoUpdater.on('update-downloaded', info => {
    sendUpdate('update-downloaded', { version: info.version, percent: 100 });
    if (mainWindow && !mainWindow.isDestroyed()) {
      const { dialog } = require('electron');
      dialog.showMessageBox(mainWindow, { type: 'info', title: 'VC@D Update', message: `Đã tải xong VC@D v${info.version}. Khởi động lại để cài đặt?`, buttons: ['Khởi động lại và cập nhật', 'Để sau'], defaultId: 0, cancelId: 1 })
        .then(result => { if (result.response === 0) autoUpdater.quitAndInstall(); });
    }
  });
  autoUpdater.on('error', err => sendUpdate('error', { message: String(err && err.message ? err.message : err) }));
  ipcMain.handle('vcad:check-updates', async () => {
    if (checking) return { ok: false, reason: 'checking' };
    checking = true;
    try { await autoUpdater.checkForUpdates(); return { ok: true }; }
    catch (err) { const message = String(err && err.message ? err.message : err); sendUpdate('error', { message }); return { ok: false, error: message }; }
    finally { checking = false; }
  });
  createWindow(); Menu.setApplicationMenu(null);
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
