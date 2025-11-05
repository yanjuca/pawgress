import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function PawgressSplashScreen() {
  const navigation = useNavigation();
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.3);

  useEffect(() => {
    // Animação de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 10,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();

    // Navega para Home após 2.5 segundos
    const timer = setTimeout(() => {
      navigation.replace('Home'); // Use 'replace' para não deixar voltar pra splash
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <LinearGradient
        colors={['#9d7350', '#2d3a2c']}
        start={[0.5, 0]}
        end={[0.5, 1]}
        style={styles.background}
      />

      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.pawIconContainer}>
          <Text style={styles.pawIcon}>🐾</Text>
        </View>
        
        <Text style={styles.title}>pawgress</Text>
        <Text style={styles.subtitle}>acompanhe o progresso do seu pet</Text>
      </Animated.View>

      {/* Decorações */}
      <View style={styles.decorLeft} />
      <View style={styles.decorRight} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  logoContainer: {
    alignItems: 'center',
  },
  pawIconContainer: {
    marginBottom: 20,
    transform: [{ rotate: '-15deg' }],
  },
  pawIcon: {
    fontSize: 80,
  },
  title: {
    fontSize: 56,
    fontWeight: '700',
    color: '#fff',
    textTransform: 'lowercase',
    letterSpacing: 2,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    textTransform: 'lowercase',
    letterSpacing: 1,
  },
  decorLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 120,
    height: 120,
    backgroundColor: '#9d7350',
    borderTopRightRadius: 120,
    opacity: 0.6,
  },
  decorRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 120,
    height: 120,
    backgroundColor: '#9fdc7c',
    borderBottomLeftRadius: 120,
    opacity: 0.6,
  },
});