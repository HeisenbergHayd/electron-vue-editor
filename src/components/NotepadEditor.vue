<template>
  <div class="notepad-container">
    <div class="toolbar">
      <div class="toolbar-group">
        <button class="toolbar-button" @click="newFile" title="New File">
          <span class="icon">📄</span>
          <span class="label">New</span>
        </button>
        <button class="toolbar-button" @click="openFile" title="Open File">
          <span class="icon">📂</span>
          <span class="label">Open</span>
        </button>
        <button class="toolbar-button" @click="saveFile" title="Save">
          <span class="icon">💾</span>
          <span class="label">Save</span>
        </button>
        <button class="toolbar-button" @click="saveFileAs" title="Save As">
          <span class="icon">📁</span>
          <span class="label">Save As</span>
        </button>
      </div>
    </div>
    
    <div class="editor-container">
      <textarea
        v-model="content"
        class="editor"
        @input="handleInput"
        placeholder="Start typing..."
        :style="{ fontSize: fontSize + 'px' }"
      ></textarea>
    </div>
    
    <div class="status-bar">
      <div class="status-item">
        <span class="status-label">File:</span>
        <span class="status-value" :title="currentFile">
          {{ currentFile ? currentFile.split('/').pop() : 'Untitled' }}
          <span v-if="isDirty" class="dirty-indicator">●</span>
        </span>
      </div>
      <div class="status-controls">
        <button class="icon-button" @click="decreaseFontSize" title="Decrease font size">A-</button>
        <span class="font-size">{{ fontSize }}px</span>
        <button class="icon-button" @click="increaseFontSize" title="Increase font size">A+</button>
      </div>
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
const fontSize = ref(14);

// Font size controls
const increaseFontSize = () => {
  if (fontSize.value < 24) fontSize.value += 2;
};

const decreaseFontSize = () => {
  if (fontSize.value > 10) fontSize.value -= 2;
};

// File operations
const newFile = async () => {
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

const openFile = async () => {
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
        content.value = fileResult.data;
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

const saveFile = async () => {
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

const saveFileAs = async () => {
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

const handleInput = () => {
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
  padding: 8px 16px;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  transition: var(--transition);
}

.toolbar-group {
  display: flex;
  gap: 8px;
}

.toolbar-button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: var(--bg-color);
  color: var(--text-color);
  cursor: pointer;
  transition: var(--transition);
}

.toolbar-button:hover {
  background: var(--hover-bg);
}

.icon {
  font-size: 16px;
}

.label {
  font-size: 14px;
}

.editor-container {
  flex: 1;
  padding: 16px;
  background: var(--bg-color);
  transition: var(--transition);
}

.editor {
  width: 100%;
  height: 100%;
  padding: 16px;
  border: none;
  border-radius: 8px;
  resize: none;
  font-family: var(--font-mono);
  line-height: 1.6;
  background: var(--bg-secondary);
  color: var(--text-color);
  transition: var(--transition);
}

.editor:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: -2px;
}

.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  font-size: 12px;
  color: var(--text-secondary);
  transition: var(--transition);
}

.status-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-label {
  color: var(--text-secondary);
}

.status-value {
  color: var(--text-color);
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dirty-indicator {
  color: var(--primary-color);
  font-size: 10px;
  margin-left: 4px;
}

.status-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon-button {
  padding: 4px 8px;
  font-size: 12px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: var(--bg-color);
  color: var(--text-color);
  cursor: pointer;
  transition: var(--transition);
}

.icon-button:hover {
  background: var(--hover-bg);
}

.font-size {
  font-size: 12px;
  color: var(--text-secondary);
  min-width: 40px;
  text-align: center;
}
</style> 