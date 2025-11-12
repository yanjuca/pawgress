import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignUpScreen from '../screens/SignUpScreen'; // Tela de cadastro
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import AddPetScreen from '../screens/AddPetScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    // 🟢 A tela inicial agora é o cadastro
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

      /><Stack.Screen
        name="EditProfile" 
        component={EditProfileScreen} 
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
}
