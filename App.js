import React from "react";
import AppNavigator from "./navigation/AppNavigator";
import { LocalAuthProvider } from "./src/engine/LocalAuthEngine";
import { PetProvider } from "./context/PetContext";

export default function App() {

  console.disableYellowBox = true;
  return (
    <LocalAuthProvider>
      <PetProvider>
        <AppNavigator />''
      </PetProvider>
    </LocalAuthProvider>
  );
}
