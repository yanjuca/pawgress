import React from "react";
import { LogBox } from "react-native";
import AppNavigator from "./navigation/AppNavigator";
import { LocalAuthProvider } from "./src/engine/LocalAuthEngine";
import { PetProvider } from "./context/PetContext";

// Desabilita TODOS os avisos e logs
LogBox.ignoreAllLogs();
console.disableYellowBox = true;

export default function App() {
  return (
    <LocalAuthProvider>
      <PetProvider>
        <AppNavigator />
      </PetProvider>
    </LocalAuthProvider>
  );
}