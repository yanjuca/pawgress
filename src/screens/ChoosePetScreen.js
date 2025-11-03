import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ChoosePetScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your favorite pet</Text>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.petType}>🐶 Dog</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.petType}>🐱 Cat</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d1c4b3',
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#7a6047',
    padding: 20,
    width: '70%',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  petType: {
    color: '#fff',
    fontSize: 18,
  },
});
