import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "react-native": "react-native-web",
      "react-native-keychain": "/src/native/Keychain.ts",
      "react-native-safe-area-context": "/src/native/SafeAreaShim.tsx",
      "src/native/NativeIdentityProvisioning": "/src/native/NativeIdentityProvisioning.ts",
    },
  },
  // Tauri expect a fixed port, fail if not available
  server: {
    port: 1420,
    strictPort: true,
  },
});
