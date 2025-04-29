# Desktop Notepad Application

A cross-platform desktop notepad application built with Vue 3 and Electron, featuring offline file operations and automatic updates.

## Features

- Cross-platform support (Windows/macOS)
- Offline file operations (open, save, new)
- Automatic updates
- Theme support (light/dark)
- Auto-save functionality
- Modern, clean interface

## Development

### Prerequisites

- Node.js 18 or later
- npm 8 or later

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/electron-notepad.git
cd electron-notepad
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run electron:dev
```

### Building

To build the application for your platform:

```bash
npm run electron:build
```

The built application will be available in the `dist_electron` directory.

## Project Structure

```
├── electron-main/          # Electron main process
│   ├── main.js            # Main process entry
│   └── preload.js         # Preload script
├── src/                   # Vue application
│   ├── components/        # Vue components
│   ├── stores/           # Pinia stores
│   └── types/            # TypeScript definitions
└── build/                # Build configuration
    ├── electron-builder.yml
    └── entitlements.mac.plist
```

## Security

- Context isolation enabled
- Node integration disabled
- Preload script with minimal API exposure
- Sandboxed file system access

## License

MIT 