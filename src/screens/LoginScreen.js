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
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as Crypto from 'expo-crypto'; // 👈 Import para criptografia

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
    if (attempts >= 3) {
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
        Alert.alert('Bem-vindo!', 'Login realizado com sucesso ✅');
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
