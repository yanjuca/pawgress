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
import { ArrowLeft, User as UserIcon, MessageCircle, LogOut } from 'lucide-react-native';

export default function ProfileScreen({ navigation }) {
  const handleEditProfile = () => {
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
        {/* Header com logo e botão de voltar */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft color="#fff" size={24} />
          </TouchableOpacity>
          
          <Image 
            source={require('../../assets/pawgresslogo.png')}
            style={styles.headerLogo}
            resizeMode="contain"
          />
          
          <View style={{ width: 40 }} />
        </View>

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
                <View style={styles.optionBtn}>
                  <View style={styles.optionIconWrapper}>
                    <UserIcon color="#c8e99a" size={20} />
                  </View>
                  <Text style={styles.optionText}>editar perfil</Text>
                </View>
              </TouchableOpacity>

              {/* Opção 2: Ajuda e Feedback */}
              <TouchableOpacity 
                style={styles.optionWrapper} 
                activeOpacity={0.85}
                onPress={handleHelp}
              >
                <View style={styles.optionBtn}>
                  <View style={styles.optionIconWrapper}>
                    <MessageCircle color="#c8e99a" size={20} />
                  </View>
                  <Text style={styles.optionText}>ajuda e feedback</Text>
                </View>
              </TouchableOpacity>

              {/* Opção 3: Logout */}
              <TouchableOpacity 
                style={styles.optionWrapperLast} 
                activeOpacity={0.85}
                onPress={handleLogout}
              >
                <View style={styles.logoutBtn}>
                  <View style={styles.optionIconWrapper}>
                    <LogOut color="#fff" size={20} />
                  </View>
                  <Text style={styles.logoutText}>logout</Text>
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
  
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLogo: {
    width: 120,
    height: 50,
  },

  // Container
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

  // Card
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

  // Opções
  optionWrapper: {
    marginBottom: 12,
  },
  optionWrapperLast: {
    marginBottom: 0,
  },
  optionBtn: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    gap: 12,
  },
  optionIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(200, 233, 154, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    textTransform: 'lowercase',
    flex: 1,
  },

  // Logout button
  logoutBtn: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#9d4037',
    gap: 12,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    textTransform: 'lowercase',
    flex: 1,
  },
});