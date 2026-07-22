# Sovereign Network Desktop

A 1:1 functional clone of the Sovereign Network mobile application, built for Desktop (Windows, macOS, Linux) using Tauri and React.

## Features
- **Native ZHTP/QUIC**: Uses the exact same Rust-based QUIC implementation as the mobile app.
- **Desktop First**: Permanent sidebar navigation for better efficiency on large screens.
- **Cross-Platform**: Compiles to native binaries for all major desktop operating systems.
- **Shared UI**: Leverages the same React logic and components from the mobile project.

## Development
1. Install [Tauri prerequisites](https://tauri.app/v1/guides/getting-started/prerequisites).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run in development mode:
   ```bash
   npm run tauri dev
   ```

## Project Structure
- `src/`: React frontend (shared logic with mobile).
- `src-tauri/`: Rust backend (Native QUIC and Identity logic).
- `src/navigation/`: Desktop-specific navigation (Sidebar).
- `src/native/`: Desktop shims for mobile native modules.
