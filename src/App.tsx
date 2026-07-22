import React from "react";
import { View, StyleSheet } from "react-native";
import { DesktopNavigator } from "./navigation/DesktopNavigator";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { colors } from "./theme";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <View style={styles.container}>
          <DesktopNavigator />
        </View>
      </AuthProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg_darkest,
  },
});

export default App;
