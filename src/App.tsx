import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigation/RootNavigator";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { SidebarProvider } from "./context/SidebarContext";
import { colors } from "./theme";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SidebarProvider>
          <NavigationContainer>
            <View style={[styles.container, { height: '100vh', width: '100vw', overflow: 'hidden' }]}>
              <RootNavigator />
            </View>
          </NavigationContainer>
        </SidebarProvider>
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
