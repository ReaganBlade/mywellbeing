// electron/preload.js (CommonJS)
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  ping: () => 'pong'
});
