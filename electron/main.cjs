// electron/main.js (CommonJS)
console.log('[main] electron main.cjs loaded — pid=' + process.pid);

// ...

const { app, BrowserWindow } = require("electron");
const path = require("path");
const activeWin = require("active-win");
const { platform } = require("os");

const POLL_MS = 1000;

const isDev = !app.isPackaged;

let lastActive = null;
let pollHandle = null;

// replace your existing startPolling / stopPolling with this
function startPolling() {
  if (pollHandle) {
    console.log('[main] startPolling called but already running');
    return;
  }
  console.log('[main] startPolling — beginning active-win polling (POLL_MS=' + POLL_MS + ')');

  pollHandle = setInterval(async () => {
    try {
      console.log('[main] polling active-win at', new Date().toLocaleTimeString());
      const winInfo = await activeWin();
      console.log('[main] activeWin returned:', !!winInfo);

      const payload = winInfo
        ? { owner: winInfo.owner?.name, title: winInfo.title, pid: winInfo.owner?.processId, platform: process.platform, timestamp: Date.now() }
        : { owner: null, title: null, pid: null, platform: process.platform, timestamp: Date.now() };

      const changed =
        !lastActive ||
        payload.owner !== lastActive.owner ||
        payload.title !== lastActive.title ||
        payload.pid !== lastActive.pid;

      if (changed) {
        lastActive = payload;
        console.log('[main] active window changed — broadcasting:', payload);
        BrowserWindow.getAllWindows().forEach((bw) => {
          if (bw && bw.webContents && !bw.webContents.isDestroyed()) {
            bw.webContents.send('active-window', payload);
          }
        });
      } else {
        console.log('[main] no change in active window');
      }
    } catch (err) {
      console.error('[main] activeWin error:', err && (err.stack || err.message || err));
    }
  }, POLL_MS);
}

function stopPolling() {
  if (!pollHandle) {
    console.log('[main] stopPolling called but nothing to stop');
    return;
  }
  clearInterval(pollHandle);
  pollHandle = null;
  console.log('[main] stopped active-win polling');
}

function createWindow() {
  const win = new BrowserWindow({
    // Open the window fullscreen by default so the UI fills the display.
    // Change to `fullscreen: false` if you prefer windowed mode.
    fullscreen: false,
    webPreferences: {
      // preload script exists as preload.cjs in this repo, so point to that file
      preload: path.join(process.cwd(), "electron", "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      enableRemoteModule: false,
    },
  });

  if (isDev) {
    win.loadURL("http://localhost:5173");
    // Only open DevTools if explicitly requested via the OPEN_DEVTOOLS env var.
    // This prevents opening DevTools automatically on each dev run.
    const shouldOpenDevTools = process.env.OPEN_DEVTOOLS === "true";
    if (shouldOpenDevTools) {
      win.webContents.openDevTools({ mode: "undocked" });
    }
  } else {
    win.loadFile(path.join(process.cwd(), "dist", "index.html"));
  }
}

// When the app is ready, create the window and start polling the OS for
// the active window. Polling must be started explicitly — otherwise the
// renderer will never receive 'active-window' events.
app.whenReady().then(() => {
  createWindow();
  startPolling();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
