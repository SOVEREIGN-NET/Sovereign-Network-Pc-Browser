import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  define: {
    __DEV__: "true",
    global: "window",
  },
  resolve: {
    alias: {
      "react-native$": "react-native-web",
      "react-native/Libraries/Utilities/codegenNativeComponent": path.resolve(__dirname, "src/native/shims/codegenNativeComponent.js"),
      "react-native/Libraries/Renderer/shims/NativeComponentRegistry": path.resolve(__dirname, "src/native/shims/NativeComponentRegistry.js"),
      "react-native-keychain": path.resolve(__dirname, "src/native/Keychain.ts"),
      "react-native-safe-area-context": path.resolve(__dirname, "src/native/SafeAreaShim.tsx"),
      "@react-native-async-storage/async-storage": path.resolve(__dirname, "src/native/AsyncStorageShim.ts"),
      "react-native-linear-gradient": path.resolve(__dirname, "src/native/LinearGradientShim.tsx"),
      "src/native/NativeIdentityProvisioning": path.resolve(__dirname, "src/native/NativeIdentityProvisioning.ts"),
    },
  },
  // Tauri expect a fixed port, fail if not available
  server: {
    port: 1420,
    strictPort: true,
  },
});
