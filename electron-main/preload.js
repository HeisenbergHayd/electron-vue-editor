const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  'api', {
    // File dialogs
    showOpenDialog: () => ipcRenderer.invoke('show-open-dialog'),
    showSaveDialog: () => ipcRenderer.invoke('show-save-dialog'),
    
    // File operations
    readFile: (filePath) => ipcRenderer.invoke('read-file', filePath),
    writeFile: (filePath, content) => ipcRenderer.invoke('write-file', { filePath, content }),
    
    // Settings management
    getSettings: () => ipcRenderer.invoke('get-settings'),
    setSettings: (settings) => ipcRenderer.invoke('set-settings', settings),
    
    // Auto-updater
    checkForUpdates: () => ipcRenderer.invoke('check-for-updates'),
    installUpdate: () => ipcRenderer.invoke('install-update'),
    
    // Update events
    onUpdateAvailable: (callback) => {
      ipcRenderer.on('update-available', callback);
      return () => ipcRenderer.removeListener('update-available', callback);
    },
    onUpdateDownloaded: (callback) => {
      ipcRenderer.on('update-downloaded', callback);
      return () => ipcRenderer.removeListener('update-downloaded', callback);
    }
  }
); 