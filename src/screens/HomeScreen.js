import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';


export default function HomeScreen() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header 
        title="pawgress" 
        onMenuPress={() => setSidebarVisible(true)} 
      />
      
      <ScrollView style={styles.content}>
        {/* Pet Info Section */}
        <View style={styles.petSection}>
          <Text style={styles.petName}>Pibble, 2</Text>
          <View style={styles.petTypeBadge}>
            <Text style={styles.petTypeText}>🐕 Dog</Text>
          </View>
        </View>

        {/* Health Overview */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Health Overview: Great Pawgress!</Text>
          
          <View style={styles.infoSection}>
            <Text style={styles.infoText}>
              Last Check-up: <Text style={styles.highlight}>Dr. Evans (Vetamin Clinic)</Text> on 10/20/2025
            </Text>
            <Text style={styles.infoText}>
              Weight: <Text style={styles.highlight}>4.5 kg</Text> (On target for age)
            </Text>
            <Text style={styles.infoText}>
              Energy Levels: <Text style={styles.highlight}>High</Text> (Daily walks & play)
            </Text>
          </View>
        </View>

        {/* Upcoming Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Upcoming:</Text>
          
          <View style={styles.upcomingItem}>
            <View style={styles.bulletPoint} />
            <Text style={styles.upcomingText}>
              <Text style={styles.highlight}>Vetaline Biosciety:</Text> Due 11/25/2025
            </Text>
          </View>
          
          <View style={styles.upcomingItem}>
            <View style={styles.bulletPoint} />
            <Text style={styles.upcomingText}>
              <Text style={styles.highlight}>HeartTrack Prevention:</Text> Due 11/07/2025
            </Text>
          </View>
        </View>

        {/* Hospital Consultant */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Hospital Consultant:</Text>
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkText}>
              https://www.hospitalhealth.gov.au/~hospital/
            </Text>
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('AddPet')}
          >
            <Text style={styles.actionButtonText}>Add new pet</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.actionButtonText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Sidebar 
        isVisible={sidebarVisible} 
        onClose={() => setSidebarVisible(false)} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f5f1', // Light beige background
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  petSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  petName: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2d3a2c', // Dark green
    letterSpacing: 0.5,
  },
  petTypeBadge: {
    backgroundColor: '#e8d7c5', // Light brown
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  petTypeText: {
    fontSize: 14,
    color: '#7a6047', // Medium brown
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f0e6d8',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2d3a2c',
    marginBottom: 15,
    letterSpacing: 0.3,
  },
  infoSection: {
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#5a5a5a',
    marginBottom: 8,
    lineHeight: 22,
  },
  highlight: {
    color: '#9d7350', // Brown accent
    fontWeight: '600',
  },
  upcomingItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#9d7350',
    marginTop: 8,
    marginRight: 12,
  },
  upcomingText: {
    fontSize: 16,
    color: '#5a5a5a',
    flex: 1,
    lineHeight: 22,
  },
  linkButton: {
    backgroundColor: '#f0e6d8',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e8d7c5',
  },
  linkText: {
    fontSize: 14,
    color: '#7a6047',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: '#9d7350', // Brown
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#2d3a2c', // Dark green
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});