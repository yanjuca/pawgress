import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'; // 👈 ADICIONE ESTA IMPORT

export default function PawgressLoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); // 👈 ADICIONE ESTE HOOK

  const handleLogin = () => {
    // Aqui você pode adicionar validação de login futuramente
    console.log('Tentando login com:', email, password);
    
    // 👈 NAVEGA PARA A TELA HOME
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <LinearGradient
        colors={['#9d7350', '#2d3a2c']}
        start={[0.5, 0]}
        end={[0.5, 1]}
        style={styles.background}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>pawgress</Text>
        </View>

        <BlurView intensity={60} tint="dark" style={styles.cardBlur}>
          <View style={styles.cardInner}>
            <TextInput
              placeholder="email"
              placeholderTextColor="rgba(255,255,255,0.7)"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              placeholder="password"
              placeholderTextColor="rgba(255,255,255,0.7)"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={[styles.input, { marginTop: 12 }]}
              autoCapitalize="none"
            />

            <TouchableOpacity 
              style={styles.loginWrapper} 
              activeOpacity={0.85}
              onPress={handleLogin} // 👈 ADICIONE ONPRESS AQUI
            >
              <LinearGradient
                colors={['#c8e99a', '#9fdc7c']}
                start={[0, 0]}
                end={[1, 1]}
                style={styles.loginBtn}
              >
                <Text style={styles.loginText}>login</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </BlurView>

        <View style={styles.decorLeft} />
        <View style={styles.decorRight} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#2d3a2c',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    marginBottom: 50,
  },
  title: {
    fontSize: 46,
    fontWeight: '700',
    color: '#fff',
    textTransform: 'lowercase',
    letterSpacing: 1.5,
  },
  cardBlur: {
    width: '85%',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  cardInner: {
    padding: 20,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
  loginWrapper: {
    marginTop: 20,
  },
  loginBtn: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  loginText: {
    color: '#2d3a2c',
    fontWeight: '700',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  decorLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 100,
    height: 100,
    backgroundColor: '#9d7350',
    borderTopRightRadius: 100,
  },
  decorRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 100,
    height: 100,
    backgroundColor: '#9fdc7c',
    borderBottomLeftRadius: 100,
  },
});
