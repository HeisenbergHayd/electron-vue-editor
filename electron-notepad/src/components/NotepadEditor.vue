<template>
  <div class="notepad-container">
    <div class="toolbar">
      <button @click="newFile">New</button>
      <button @click="openFile">Open</button>
      <button @click="saveFile">Save</button>
      <button @click="saveFileAs">Save As</button>
    </div>
    
    <textarea
      v-model="content"
      class="editor"
      @input="handleInput"
      placeholder="Start typing..."
    ></textarea>
    
    <div class="status-bar">
      <span v-if="currentFile">{{ currentFile }}</span>
      <span v-else>Untitled</span>
      <span v-if="isDirty">*</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useSettingsStore } from '../stores/settings';

const content = ref('');
const currentFile = ref('');
const isDirty = ref(false);
const settingsStore = useSettingsStore();

// File operations
const newFile = async (): Promise<void> => {
  if (isDirty.value) {
    if (!confirm('Do you want to save changes before creating a new file?')) {
      return;
    }
    await saveFile();
  }
  content.value = '';
  currentFile.value = '';
  isDirty.value = false;
};

const openFile = async (): Promise<void> => {
  if (isDirty.value) {
    if (!confirm('Do you want to save changes before opening another file?')) {
      return;
    }
    await saveFile();
  }

  try {
    const result = await window.api.showOpenDialog();
    if (!result.canceled && result.filePaths.length > 0) {
      const filePath = result.filePaths[0];
      const fileResult = await window.api.readFile(filePath);
      if (fileResult.success) {
        content.value = fileResult.data || '';
        currentFile.value = filePath;
        isDirty.value = false;
      } else {
        alert('Failed to read file: ' + fileResult.error);
      }
    }
  } catch (error) {
    console.error('Error opening file:', error);
    alert('Failed to open file');
  }
};

const saveFile = async (): Promise<void> => {
  if (!currentFile.value) {
    return saveFileAs();
  }
  
  try {
    const result = await window.api.writeFile(currentFile.value, content.value);
    if (result.success) {
      isDirty.value = false;
    } else {
      alert('Failed to save file: ' + result.error);
    }
  } catch (error) {
    console.error('Error saving file:', error);
    alert('Failed to save file');
  }
};

const saveFileAs = async (): Promise<void> => {
  try {
    const result = await window.api.showSaveDialog();
    if (!result.canceled && result.filePath) {
      currentFile.value = result.filePath;
      const saveResult = await window.api.writeFile(currentFile.value, content.value);
      if (saveResult.success) {
        isDirty.value = false;
      } else {
        alert('Failed to save file: ' + saveResult.error);
      }
    }
  } catch (error) {
    console.error('Error saving file:', error);
    alert('Failed to save file');
  }
};

const handleInput = (): void => {
  isDirty.value = true;
};

// Auto-save
let autoSaveInterval: number;

onMounted(() => {
  if (settingsStore.settings.autoSave) {
    autoSaveInterval = window.setInterval(() => {
      if (isDirty.value && currentFile.value) {
        saveFile();
      }
    }, settingsStore.settings.autoSaveInterval);
  }
});

onUnmounted(() => {
  if (autoSaveInterval) {
    clearInterval(autoSaveInterval);
  }
});
</script>

<style scoped>
.notepad-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--bg-color);
  color: var(--text-color);
}

.toolbar {
  padding: 8px;
  border-bottom: 1px solid var(--border-color);
}

.editor {
  flex: 1;
  padding: 16px;
  border: none;
  resize: none;
  font-family: monospace;
  font-size: 14px;
  line-height: 1.5;
  background: transparent;
  color: inherit;
}

.status-bar {
  padding: 4px 8px;
  border-top: 1px solid var(--border-color);
  font-size: 12px;
  color: var(--text-secondary);
}
</style> 