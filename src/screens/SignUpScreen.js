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
  Image,
  Alert,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

export default function PawgressSignUpScreen() {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigation = useNavigation();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (senha) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(senha);
  };

  const handleCadastro = async () => {
    if (!nomeCompleto.trim() || !email.trim() || !senha.trim()) {
      Alert.alert('Campos obrigatórios', 'Preencha todos os campos.');
      return;
    }

    if (nomeCompleto.trim().length < 3) {
      Alert.alert('Nome inválido', 'Digite seu nome completo.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('E-mail inválido', 'Digite um e-mail válido.');
      return;
    }

    if (!validatePassword(senha)) {
      Alert.alert(
        'Senha fraca',
        'Sua senha deve conter:\n• 8 caracteres\n• 1 letra maiúscula\n• 1 número\n• 1 símbolo'
      );
      return;
    }

    try {
      // Hash da senha
      const passwordHash = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        senha
      );

      // Carrega usuários do storage
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      // Verifica se email já existe
      const exists = users.some((u) => u.email === email);
      if (exists) {
        Alert.alert('E-mail já cadastrado', 'Use outro e-mail.');
        return;
      }

      // Novo usuário
      const newUser = {
        nome: nomeCompleto,
        email,
        passwordHash,
      };

      users.push(newUser);

      // Salva no AsyncStorage
      await AsyncStorage.setItem('users', JSON.stringify(users));

      Alert.alert('Sucesso 🎉', 'Conta criada com sucesso!', [
        {
          text: 'Ir para Login',
          onPress: () => navigation.navigate('Login'),
        },
      ]);
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível concluir o cadastro.');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <Image
        source={require('../../assets/background.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/pawgresslogo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <BlurView intensity={100} tint="dark" style={styles.cardBlur}>
            <View style={styles.cardInner}>
              <TextInput
                placeholder="nome completo"
                placeholderTextColor="rgba(255,255,255,0.7)"
                value={nomeCompleto}
                onChangeText={setNomeCompleto}
                style={styles.input}
                autoCapitalize="words"
              />

              <TextInput
                placeholder="email"
                placeholderTextColor="rgba(255,255,255,0.7)"
                value={email}
                onChangeText={setEmail}
                style={[styles.input, { marginTop: 12 }]}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <TextInput
                placeholder="senha"
                placeholderTextColor="rgba(255,255,255,0.7)"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
                style={[styles.input, { marginTop: 12 }]}
                autoCapitalize="none"
              />

              <TouchableOpacity
                style={styles.loginWrapper}
                activeOpacity={0.85}
                onPress={handleCadastro}
              >
                <LinearGradient
                  colors={['#c8e99a', '#9fdc7c']}
                  start={[0, 0]}
                  end={[1, 1]}
                  style={styles.loginBtn}
                >
                  <Text style={styles.loginText}>cadastrar</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.createAccountBtn}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.createAccountText}>
                  já tem conta? <Text style={styles.createAccountBold}>entrar</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  backgroundImage: { position: 'absolute', width: '100%', height: '100%' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  logoContainer: { marginBottom: 30, alignItems: 'center' },
  logo: { width: 200, height: 200, marginBottom: -70 },
  cardBlur: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  cardInner: { padding: 20 },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
  loginWrapper: { marginTop: 20 },
  loginBtn: { paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  loginText: { color: '#2d3a2c', fontWeight: '700', fontSize: 16 },
  createAccountBtn: { marginTop: 16, alignItems: 'center', paddingVertical: 10 },
  createAccountText: { color: 'rgba(255,255,255,0.7)', fontSize: 14 },
  createAccountBold: { color: '#c8e99a', fontWeight: '700' },
});
