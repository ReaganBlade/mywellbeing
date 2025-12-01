import { create } from "domain";
import { app, BrowserWindow } from "electron";
import path from "path";

const isDev  = !app.isPackaged;

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        hieght: 800,
        webPreferences: {
            preload: path.join(process.cwd(), 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            enableRemoteModule: false,
        },
    });

    if (isDev) {
        win.loadURL('http://localhost:5173');
        win.webContents.openDevTools({
            mode: 'unlocked'
        });
    } else {
        win.loadFile(path.join(process.cwd(), 'dist', 'index.html'));
    }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

