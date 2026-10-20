const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');

let mainWindow;
let checking = false;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1000,
    minHeight: 650,
    backgroundColor: '#1e1f26',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });
  mainWindow.loadFile(path.join(__dirname, 'app', 'index.html'));
}

app.whenReady().then(() => {
  // Keep update downloads under user control; install is offered after download.
  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = true;
  autoUpdater.on('update-available', () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      dialog.showMessageBox(mainWindow, {
        type: 'info',
        title: 'VC@D Update',
        message: 'Đã tìm thấy phiên bản mới. VCAD sẽ tải bản cập nhật ở chế độ nền.'
      });
    }
  });
  autoUpdater.on('update-not-available', () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      dialog.showMessageBox(mainWindow, {
        type: 'info',
        title: 'VC@D Update',
        message: 'Bạn đang dùng phiên bản mới nhất.'
      });
    }
  });
  autoUpdater.on('update-downloaded', async () => {
    if (!mainWindow || mainWindow.isDestroyed()) return;
    const result = await dialog.showMessageBox(mainWindow, {
      type: 'info',
      title: 'VC@D Update',
      message: 'Bản cập nhật đã tải xong. Khởi động lại VCAD để cài đặt?',
      buttons: ['Khởi động lại và cập nhật', 'Để sau'],
      defaultId: 0,
      cancelId: 1
    });
    if (result.response === 0) autoUpdater.quitAndInstall();
  });
  autoUpdater.on('error', (err) => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      dialog.showMessageBox(mainWindow, {
        type: 'error',
        title: 'VC@D Update',
        message: 'Không thể kiểm tra/tải cập nhật.',
        detail: String(err && err.message ? err.message : err)
      });
    }
  });

  ipcMain.handle('vcad:check-updates', async () => {
    if (checking) return { ok: false, reason: 'checking' };
    checking = true;
    try {
      await autoUpdater.checkForUpdates();
      return { ok: true };
    } catch (err) {
      return { ok: false, error: String(err && err.message ? err.message : err) };
    } finally {
      checking = false;
    }
  });

  createWindow();
  Menu.setApplicationMenu(null);
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
