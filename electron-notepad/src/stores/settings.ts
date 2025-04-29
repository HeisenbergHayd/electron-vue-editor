import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

interface Settings {
  theme: 'light' | 'dark';
  autoSave: boolean;
  autoSaveInterval: number;
  fontSize: number;
  fontFamily: string;
}

interface SettingsResponse {
  success: boolean;
  data?: Settings;
  error?: string;
}

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<Settings>({
    theme: 'light',
    autoSave: true,
    autoSaveInterval: 30000, // 30 seconds
    fontSize: 14,
    fontFamily: 'monospace'
  });

  // Load settings from electron
  const loadSettings = async () => {
    try {
      const result = await window.api.getSettings() as SettingsResponse;
      if (result.success && result.data) {
        settings.value = { ...settings.value, ...result.data };
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  // Save settings to electron
  const saveSettings = async () => {
    try {
      await window.api.setSettings(settings.value);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  // Watch for changes and save
  watch(settings, () => {
    saveSettings();
  }, { deep: true });

  // Initialize
  loadSettings();

  return {
    settings,
    loadSettings,
    saveSettings
  };
}); 