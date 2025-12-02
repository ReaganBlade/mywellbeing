// electron/main.js (CommonJS)
const { app, BrowserWindow } = require('electron');
const path = require('path');

const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800, // fixed spelling
    webPreferences: {
      // preload script exists as preload.cjs in this repo, so point to that file
      preload: path.join(process.cwd(), 'electron', 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      enableRemoteModule: false,
    },
  });

  if (isDev) {
    win.loadURL('http://localhost:5173');
    // Only open DevTools if explicitly requested via the OPEN_DEVTOOLS env var.
    // This prevents opening DevTools automatically on each dev run.
    const shouldOpenDevTools = process.env.OPEN_DEVTOOLS === 'true';
    if (shouldOpenDevTools) {
      win.webContents.openDevTools({ mode: 'undocked' });
    }
  } else {
    win.loadFile(path.join(process.cwd(), 'dist', 'index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
