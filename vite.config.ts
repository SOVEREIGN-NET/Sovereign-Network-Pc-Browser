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
    alias: [
      { find: /^react-native\/Libraries\/Utilities\/codegenNativeComponent$/, replacement: path.resolve(__dirname, "src/native/shims/codegenNativeComponent.js") },
      { find: /^react-native\/Libraries\/Renderer\/shims\/NativeComponentRegistry$/, replacement: path.resolve(__dirname, "src/native/shims/NativeComponentRegistry.js") },
      { find: "react-native-keychain", replacement: path.resolve(__dirname, "src/native/Keychain.ts") },
      { find: "react-native-safe-area-context", replacement: path.resolve(__dirname, "src/native/SafeAreaShim.tsx") },
      { find: "@react-native-async-storage/async-storage", replacement: path.resolve(__dirname, "src/native/AsyncStorageShim.ts") },
      { find: "react-native-linear-gradient", replacement: path.resolve(__dirname, "src/native/LinearGradientShim.tsx") },
      { find: "react-native-svg", replacement: path.resolve(__dirname, "src/native/shims/react-native-svg.tsx") },
      { find: "src/native/NativeIdentityProvisioning", replacement: path.resolve(__dirname, "src/native/NativeIdentityProvisioning.ts") },
      { find: "react-native", replacement: path.resolve(__dirname, "src/native/shims/react-native.js") },
    ],
  },
  optimizeDeps: {
    exclude: ["react-native-svg", "react-native-keychain", "react-native-linear-gradient"],
  },
  // Tauri expect a fixed port, fail if not available
  server: {
    port: 1420,
    strictPort: true,
  },
});
