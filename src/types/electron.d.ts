interface ElectronAPI {
  // File dialogs
  showOpenDialog: () => Promise<{ canceled: boolean; filePaths: string[] }>;
  showSaveDialog: () => Promise<{ canceled: boolean; filePath?: string }>;
  
  // File operations
  readFile: (filePath: string) => Promise<{ success: boolean; data?: string; error?: string }>;
  writeFile: (filePath: string, content: string) => Promise<{ success: boolean; error?: string }>;
  
  // Settings
  getSettings: () => Promise<{ success: boolean; data?: any; error?: string }>;
  setSettings: (settings: any) => Promise<{ success: boolean; error?: string }>;
  
  // Updates
  checkForUpdates: () => Promise<void>;
  installUpdate: () => Promise<void>;
  onUpdateAvailable: (callback: () => void) => () => void;
  onUpdateDownloaded: (callback: () => void) => () => void;
}

declare global {
  interface Window {
    api: ElectronAPI;
  }
} 