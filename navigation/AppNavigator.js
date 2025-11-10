import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import AddPetScreen from '../screens/AddPetScreen';
import ChoosePetScreen from '../screens/ChoosePetScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
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
        name="ChoosePet" 
        component={ChoosePetScreen}
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
    </Stack.Navigator>
  );
}