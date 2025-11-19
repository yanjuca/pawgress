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
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as Crypto from 'expo-crypto';

export default function PawgressLoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);
  const navigation = useNavigation();

  // Usuários "autorizados" (ideal: vir do backend)
  const authorizedUsers = [
    {
      email: 'admin@pawgress.com',
      // senha: "pawgress123"
      passwordHash:
        'b4c95d165f8c6b4a4c33148b7746e6673b7dc798c68da81962f82d099b2e906d',
    },
    {
      email: 'kalyel@pawgress.com',
      // senha: "a"
      passwordHash:
        'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb',
    },
  ];

  const handleLogin = async () => {
    if (attempts >= 10) {
      Alert.alert('Conta bloqueada', 'Muitas tentativas falhas. Tente mais tarde.');
      return;
    }

    // 🚫 Verificação de campos obrigatórios
    if (!email.trim() && !password.trim()) {
      Alert.alert('Erro', 'Você deve preencher o email e a senha.');
      return;
    }

    if (!email.trim()) {
      Alert.alert('Erro', 'O campo de email é obrigatório.');
      return;
    }

    if (!password.trim()) {
      Alert.alert('Erro', 'O campo de senha é obrigatório.');
      return;
    }

    try {
      // 🔐 Criptografa senha digitada
      const passwordHash = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password
      );

      // Verifica se existe usuário autorizado
      const user = authorizedUsers.find(
        (u) => u.email === email && u.passwordHash === passwordHash
      );

      if (user) {
        //Alert.alert('Bem-vindo!', 'Login realizado com sucesso ✅');
        setAttempts(0); // reseta tentativas
        navigation.navigate('Home');
      } else {
        setAttempts((prev) => prev + 1);
        const left = 3 - (attempts + 1);
        Alert.alert(
          'Acesso negado',
          left > 0
            ? `Credenciais inválidas. Restam ${left} tentativa(s).`
            : 'Você excedeu o número máximo de tentativas.'
        );
      }
    } catch (error) {
      console.error('Erro no login:', error);
      Alert.alert('Erro', 'Ocorreu um erro durante o login.');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Fundo - mesma imagem do cadastro */}
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
          {/* Logo - mesma da tela de cadastro */}
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../assets/pawgresslogo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Card de Login */}
          <BlurView intensity={100} tint="dark" style={styles.cardBlur}>
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
                placeholder="senha"
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
                onPress={handleLogin}
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

              <TouchableOpacity 
                style={styles.createAccountBtn}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('SignUp')}
              >
                <Text style={styles.createAccountText}>
                  não tem conta? <Text style={styles.createAccountBold}>cadastrar</Text>
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
  safe: { flex: 1, backgroundColor: 'transparent' },
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
  loginText: { color: '#2d3a2c', fontWeight: '700', fontSize: 16, textTransform: 'uppercase' },
  createAccountBtn: { marginTop: 16, alignItems: 'center', paddingVertical: 10 },
  createAccountText: { color: 'rgba(255,255,255,0.7)', fontSize: 14, textTransform: 'lowercase' },
  createAccountBold: { color: '#c8e99a', fontWeight: '700' },
});