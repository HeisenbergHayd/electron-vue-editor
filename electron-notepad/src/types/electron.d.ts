export {};

interface Settings {
  theme: 'light' | 'dark';
  autoSave: boolean;
  autoSaveInterval: number;
  fontSize: number;
  fontFamily: string;
}

interface FileDialogResult {
  canceled: boolean;
  filePaths?: string[];
  filePath?: string;
}

interface FileOperationResult {
  success: boolean;
  data?: string;
  error?: string;
}

interface SettingsResult {
  success: boolean;
  data?: Settings;
  error?: string;
}

interface ElectronAPI {
  // File dialogs
  showOpenDialog: () => Promise<FileDialogResult>;
  showSaveDialog: () => Promise<FileDialogResult>;
  
  // File operations
  readFile: (filePath: string) => Promise<FileOperationResult>;
  writeFile: (filePath: string, content: string) => Promise<FileOperationResult>;
  
  // Settings
  getSettings: () => Promise<SettingsResult>;
  setSettings: (settings: Settings) => Promise<FileOperationResult>;
  
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