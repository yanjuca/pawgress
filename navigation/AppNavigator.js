import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 👇 Ajustei todos os imports para refletir a estrutura real
import SignUpScreen from '../src/screens/SignUpScreen';
import HomeScreen from '../src/screens/HomeScreen';
import LoginScreen from '../src/screens/LoginScreen';
import AddPetScreen from '../src/screens/AddPetScreen';
import ProfileScreen from '../src/screens/ProfileScreen';
import EditProfileScreen from '../src/screens/EditProfileScreen';
import SettingsScreen from '../src/screens/SettingsScreens'; // 👈 Nome correto do arquivo

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="SignUp">
      
      <Stack.Screen 
        name="SignUp" 
        component={SignUpScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }}
      />

      <Stack.Screen 
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="AddPet" 
        component={AddPetScreen} 
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Profile" 
        component={ProfileScreen} 
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="EditProfile" 
        component={EditProfileScreen} 
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Settings" 
        component={SettingsScreen} 
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
}
