import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen({ navigation }) {
  const handleEditProfile = () => {
    // Navega para a tela de editar perfil
    console.log('Editar Perfil');
    navigation.navigate('EditProfile');
  };

  const handleHelp = () => {
    console.log('Ajuda e Feedback');
    // navigation.navigate('Help'); // Descomente se implementar a tela de ajuda
  };

  const handleLogout = () => {
    console.log('Logout');
    navigation.navigate('Login');
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Background Image */}
      <Image 
        source={require('../../assets/background.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <View style={styles.container}>
          {/* Título */}
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>perfil</Text>
          </View>

          {/* Card com as opções */}
          <BlurView intensity={100} tint="dark" style={styles.cardBlur}>
            <View style={styles.cardInner}>
              
              {/* Opção 1: Editar Perfil */}
              <TouchableOpacity 
                style={styles.optionWrapper} 
                activeOpacity={0.85}
                onPress={handleEditProfile}
              >
                <View style={styles.optionBtnSecondary}>
                  <Text style={styles.optionTextSecondary}>editar perfil</Text>
                </View>
              </TouchableOpacity>

              {/* Opção 2: Ajuda e Feedback */}
              <TouchableOpacity 
                style={styles.optionWrapper} 
                activeOpacity={0.85}
                onPress={handleHelp}
              >
                <View style={styles.optionBtnSecondary}>
                  <Text style={styles.optionTextSecondary}>ajuda e feedback</Text>
                </View>
              </TouchableOpacity>

              {/* Opção 3: Logout */}
              <TouchableOpacity 
                style={styles.optionWrapperLast} 
                activeOpacity={0.85}
                onPress={handleLogout}
              >
                <View style={styles.logoutBtn}>
                  <Text style={styles.optionTextSecondary}>logout</Text>
                </View>
              </TouchableOpacity>

            </View>
          </BlurView>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: '700',
    color: '#fff',
    textTransform: 'lowercase',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  cardBlur: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  cardInner: {
    padding: 20,
  },
  optionWrapper: {
    marginBottom: 12,
  },
  optionBtnSecondary: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  logoutBtn: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#69140E',
  },
  optionTextSecondary: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    textTransform: 'lowercase',
  },
  optionWrapperLast: {
    marginBottom: 0,
  },
});
