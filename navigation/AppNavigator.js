import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LocalAuthContext } from "../src/engine/LocalAuthEngine";

// Telas
import SignUpScreen from "../src/screens/SignUpScreen";
import LoginScreen from "../src/screens/LoginScreen";
import HomeScreen from "../src/screens/HomeScreen";
import AddPetScreen from "../src/screens/AddPetScreen";
import ProfileScreen from "../src/screens/ProfileScreen";
import EditProfileScreen from "../src/screens/EditProfileScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user } = useContext(LocalAuthContext);
  
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName={user ? "Home" : "SignUp"} 
        screenOptions={{ 
          headerShown: false,
          animation: 'none', // ✨ Desabilita todas as animações
        }}
      >
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddPet" component={AddPetScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}