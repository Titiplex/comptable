const {app, BrowserWindow, ipcMain} = require('electron/main')
const {updateElectronApp} = require('update-electron-app')
updateElectronApp()
const path = require('node:path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, '../electron/preload.js'),
        }
    })

    win.loadFile(path.join(__dirname, '../dist/renderer/src/index.html'));
    win.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })

    ipcMain.handle('ping', () => 'pong')
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
