import { useNavigation } from '@react-navigation/native';

export default function PawgressApp() {
  const navigation = useNavigation();
  
  // resto do código...
}<View style={styles.header}>
  <Text style={styles.title}>pawgress</Text>
  <TouchableOpacity onPress={() => {
    console.log('Botão clicado!'); // Para testar se o botão funciona
    navigation.navigate('EditProfile');
  }}>
    <MoreVertical color="white" size={24} />
  </TouchableOpacity>
</View>
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PawgressApp from '../screens/PawgressApp';
import EditProfileScreen from '../screens/EditProfileScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={PawgressApp} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}