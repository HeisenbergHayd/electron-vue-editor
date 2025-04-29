# 📝 Desktop Notepad Application

> A modern, cross-platform desktop notepad built with **Electron + Vue 3 + TypeScript**. Supports offline file operations, theme switching, and seamless auto-updates.

![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS-blue)
![License](https://img.shields.io/github/license/yourusername/electron-notepad)
![Build](https://img.shields.io/badge/build-passing-brightgreen)
![Language](https://img.shields.io/badge/language-TypeScript-blue)

---

## ✨ Features

- 🖥️ **Cross-platform**: One codebase for Windows/macOS
- 📁 **Offline file operations**: Open, edit, save locally
- ♻️ **Automatic updates**: Seamless version upgrading
- 🎨 **Theme support**: Light / Dark mode toggle
- 💾 **Auto-save**: Drafts preserved on close
- 🚀 **Clean UI**: Built with modern frontend tech stack

---

## 📦 Tech Stack

- **Electron 27+** - cross-platform runtime
- **Vue 3 + Vite** - frontend framework and tooling
- **TypeScript** - static typing
- **Pinia** - state management
- **electron-builder** - packaging and distribution

---

## 🚀 Getting Started

### ✅ Prerequisites

- [Node.js](https://nodejs.org/) 18+
- npm 8+

### 📥 Clone & Install

```bash
git clone https://github.com/yourusername/electron-notepad.git
cd electron-notepad
npm install
🛠️ Start Development
bash
Copy
Edit
npm run electron:dev
🏗️ Build for Production
bash
Copy
Edit
npm run electron:build
Output files will be in the dist_electron/ directory

📁 Project Structure
csharp
Copy
Edit
electron-notepad/
├── electron-main/            # Electron main process
│   ├── main.ts               # Main process entry
│   └── preload.ts            # Secure API bridge
├── src/                      # Vue 3 application
│   ├── components/           # Vue components
│   ├── stores/               # Pinia stores
│   ├── assets/               # Static assets
│   └── types/                # TypeScript definitions
├── build/                    # Build & packaging config
│   ├── electron-builder.yml
│   └── entitlements.mac.plist
└── public/                   # Static public files
🔐 Security Practices
✅ contextIsolation enabled

❌ nodeIntegration disabled

🧩 Expose only safe APIs via preload.js

📦 Use secure file I/O and avoid remote code execution

🔄 Auto Update
Powered by electron-updater

Connects to a private or GitHub update server

Graceful update flow with user prompt before restart

📸 Screenshots
Add screenshots in /screenshots folder and link them here:


Light Mode	Dark Mode
🧪 Future Features (Planned)
⌨️ Markdown support with live preview

☁️ Cloud sync support

🔐 Password-protected notes

🧱 Plugin system for extension

📃 License
MIT License

🌐 Connect
If you like this project, feel free to star ⭐ it or fork 🍴 it! Contributions welcome.

yaml
Copy
Edit






