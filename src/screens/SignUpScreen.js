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

export default function PawgressSignUpScreen() {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigation = useNavigation();

  // 🔎 Validações simples
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (senha) => {
    // Pelo menos 8 caracteres, uma maiúscula, um número e um símbolo
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(senha);
  };

  const handleCadastro = () => {
    console.log('Tentando cadastro com:', nomeCompleto, email, senha);

    // Verifica campos vazios
    if (!nomeCompleto.trim() || !email.trim() || !senha.trim()) {
      Alert.alert('Campos obrigatórios', 'Preencha todos os campos para continuar.');
      return;
    }

    // Valida o nome (mínimo 3 caracteres)
    if (nomeCompleto.trim().length < 3) {
      Alert.alert('Nome inválido', 'Digite seu nome completo.');
      return;
    }

    // Valida o formato do e-mail
    if (!validateEmail(email)) {
      Alert.alert('E-mail inválido', 'Digite um e-mail válido (ex: exemplo@email.com).');
      return;
    }

    // Valida força da senha
    if (!validatePassword(senha)) {
      Alert.alert(
        'Senha fraca',
        'Sua senha deve conter:\n• Pelo menos 8 caracteres\n• Uma letra maiúscula\n• Um número\n• Um símbolo (@, #, !, etc.)'
      );
      return;
    }

    // Caso tudo esteja certo
    Alert.alert('Cadastro concluído 🎉', 'Conta criada com sucesso!', [
      {
        text: 'Ir para home',
        onPress: () => navigation.navigate('Home'),
      },
    ]);
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Fundo */}
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
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../assets/pawgresslogo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Card de Cadastro */}
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
