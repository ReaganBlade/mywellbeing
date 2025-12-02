// electron/preload.js (CommonJS)
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  onActiveWindow: (callback) => {
    if (typeof callback !== "function") return;

    const listener = (event, payload) => callback(payload);
    ipcRenderer.on("active-window", listener);

    return () => {
      ipcRenderer.removeListener("active-window", listener);
    };
  },
});
