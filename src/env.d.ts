/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ElectronAPI {
  readFile: (path: string) => Promise<{ success: boolean; data?: string; error?: string }>;
  writeFile: (path: string, content: string) => Promise<{ success: boolean; error?: string }>;
  showOpenDialog: () => Promise<{ canceled: boolean; filePaths: string[] }>;
  showSaveDialog: () => Promise<{ canceled: boolean; filePath?: string }>;
  checkForUpdates: () => void;
  onUpdateAvailable: (callback: () => void) => void;
  onUpdateDownloaded: (callback: () => void) => void;
  installUpdate: () => void;
}

interface Window {
  api: ElectronAPI;
} 