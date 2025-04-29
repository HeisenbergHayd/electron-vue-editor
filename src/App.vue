<template>
  <div class="app" :class="settingsStore.settings.theme">
    <NotepadEditor />
    
    <Transition name="fade">
      <div v-if="updateAvailable" class="update-notification">
        <div class="update-content">
          <span class="update-icon">⟳</span>
          <p>A new version is available!</p>
          <button class="primary" @click="installUpdate">Install Update</button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import NotepadEditor from './components/NotepadEditor.vue';
import { useSettingsStore } from './stores/settings';

const settingsStore = useSettingsStore();
const updateAvailable = ref(false);

// Handle auto-updates
onMounted(() => {
  window.api.checkForUpdates();
  
  window.api.onUpdateAvailable(() => {
    updateAvailable.value = true;
  });
  
  window.api.onUpdateDownloaded(() => {
    updateAvailable.value = true;
  });
});

const installUpdate = () => {
  window.api.installUpdate();
};
</script>

<style>
.app {
  height: 100vh;
  background: var(--bg-color);
  color: var(--text-color);
  transition: var(--transition);
}

.update-notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  padding: 16px;
  border-radius: 8px;
  box-shadow: var(--shadow-md);
  z-index: 1000;
}

.update-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.update-icon {
  font-size: 20px;
  color: var(--primary-color);
  animation: spin 2s linear infinite;
}

button {
  background: var(--bg-secondary);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: var(--transition);
}

button:hover {
  background: var(--hover-bg);
}

button.primary {
  background: var(--primary-color);
  color: white;
  border: none;
}

button.primary:hover {
  background: var(--primary-hover);
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 