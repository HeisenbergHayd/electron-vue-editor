import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { EditorSettings } from '../types/editor';

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<EditorSettings>({
    theme: 'light',
    fontSize: 14,
    tabSize: 2,
    autoSave: true,
    autoSaveInterval: 30000, // 30 seconds
    wordWrap: true,
  });

  function updateSettings(newSettings: Partial<EditorSettings>) {
    settings.value = {
      ...settings.value,
      ...newSettings,
    };
    saveSettings();
  }

  function loadSettings() {
    const savedSettings = localStorage.getItem('editor-settings');
    if (savedSettings) {
      settings.value = {
        ...settings.value,
        ...JSON.parse(savedSettings),
      };
    }
  }

  function saveSettings() {
    localStorage.setItem('editor-settings', JSON.stringify(settings.value));
  }

  // Load settings on store creation
  loadSettings();

  return {
    settings,
    updateSettings,
  };
}); 