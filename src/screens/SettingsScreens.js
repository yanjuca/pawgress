import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PawgressSettings() {
  const [confirmed, setConfirmed] = useState(false);

  const menuItems = [
    { id: 'notifications', label: 'Notifications', icon: 'notifications-outline' },
    { id: 'help', label: 'Help & Feedback', icon: 'chatbubble-outline' },
    { id: 'privacy', label: 'Privacy Policy', icon: 'lock-closed-outline' },
    { id: 'account', label: 'Account Settings', icon: 'person-outline' },
    { id: 'logout', label: 'Log Out', icon: 'log-out-outline' },
  ];

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => setConfirmed(false), 2000);
  };

  const handleMenuItemPress = (itemId) => {
    if (itemId === 'logout') {
      Alert.alert('Log Out', 'Are you sure you want to log out?');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>pawgress</Text>
          <Ionicons name="settings-outline" size={28} color="#9ca3af" />
        </View>

        {/* Title */}
        <Text style={styles.subtitle}>Settings Menu</Text>

        {/* Menu Items */}
        <ScrollView style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuButton}
              onPress={() => handleMenuItemPress(item.id)}
            >
              <Text style={styles.menuText}>
                {item.label}
              </Text>
              <Ionicons name={item.icon} size={22} color="#4b5563" />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Confirm Button */}
        <TouchableOpacity
          onPress={handleConfirm}
          style={[
            styles.confirmButton,
            confirmed && styles.confirmButtonActive
          ]}
        >
          {confirmed ? (
            <View style={styles.confirmContent}>
              <Ionicons name="checkmark" size={20} color="white" />
              <Text style={styles.confirmTextActive}>Confirmed!</Text>
            </View>
          ) : (
            <Text style={styles.confirmText}>Click and Confirm</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Os estilos (StyleSheet) permanecem os mesmos acima
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6b7069',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  content: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(90, 96, 88, 0.95)',
    borderRadius: 12,
    padding: 24,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 24,
  },
  menuContainer: {
    marginBottom: 24,
    maxHeight: 400,
  },
  menuButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(200, 200, 190, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 12,
  },
  menuText: {
    color: '#1f2937',
    fontWeight: '600',
    fontSize: 16,
  },
  confirmButton: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: 'rgba(200, 180, 100, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonActive: {
    backgroundColor: 'rgba(70, 130, 70, 0.9)',
  },
  confirmContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  confirmText: {
    color: '#4a4a3a',
    fontWeight: 'bold',
    fontSize: 16,
  },
  confirmTextActive: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
