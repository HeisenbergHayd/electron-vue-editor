<script setup lang="ts">
import { ref, onMounted } from 'vue';
import NotepadEditor from './components/NotepadEditor.vue';
import { useSettingsStore } from './stores/settings';

const settingsStore = useSettingsStore();
const updateAvailable = ref(false);

// Handle auto-updates
onMounted(() => {
  // Check for updates on startup
  window.api.checkForUpdates();
  
  // Listen for update events
  window.api.onUpdateAvailable(() => {
    updateAvailable.value = true;
  });
  
  window.api.onUpdateDownloaded(() => {
    // Show notification that update is ready to install
    updateAvailable.value = true;
  });
});

const installUpdate = () => {
  window.api.installUpdate();
};
</script>

<template>
  <div class="app" :class="settingsStore.settings.theme">
    <NotepadEditor />
    
    <!-- Update notifications -->
    <div v-if="updateAvailable" class="update-notification">
      <p>A new version is available!</p>
      <button @click="installUpdate">Install Update</button>
    </div>
  </div>
</template>

<style>
:root {
  --bg-color: #ffffff;
  --text-color: #000000;
  --border-color: #e0e0e0;
  --text-secondary: #666666;
}

.dark {
  --bg-color: #1e1e1e;
  --text-color: #ffffff;
  --border-color: #333333;
  --text-secondary: #999999;
}

.app {
  height: 100vh;
  background: var(--bg-color);
  color: var(--text-color);
}

.update-notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

button {
  background: var(--bg-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 4px;
}

button:hover {
  background: var(--border-color);
}
</style>
