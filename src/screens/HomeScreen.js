import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Eye, ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react-native';

export default function PawgressApp() {
  const [currentPet, setCurrentPet] = useState(0);

  const pets = [
    {
      name: "Pibble",
      number: 2,
      image: "https://heapet.com/cdn/shop/articles/what-is-a-pibble-dog-smile_7b0f5b3b-0901-48a5-8e7e-0f48f3417712.webp?v=1751761402",
      healthStatus: "Great Pawgress!",
      lastCheckup: "Dr. Evans (Vetamin Clinic) on 10/20/2025",
      weight: "4.5 kg (On target for age)",
      energy: "High (Daily walks to play)",
      upcoming: [
        { item: "Vaccine Booster", date: "Due 11/25/2025" },
        { item: "Flea/Tick Prevention", date: "Due 11/01/2025" }
      ]
    }
  ];

  const pet = pets[currentPet];

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>pawgress</Text>
          <MoreVertical color="white" size={24} />
        </View>

        {/* Navigation */}
        <View style={styles.nav}>
          <View style={styles.navButtons}>
            <ChevronLeft color="white" size={20} />
            <ChevronRight color="white" size={20} />
          </View>
          <Text style={styles.petName}>
            {pet.name}, {pet.number}
          </Text>
        </View>

        {/* Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: pet.image }} style={styles.image} />
        </View>

        {/* Health Info */}
        <ScrollView style={styles.infoSection}>
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>
              Health Overview: {pet.healthStatus}
            </Text>

            <Text style={styles.infoText}>
              <Text style={styles.label}>Last Check-up: </Text>
              {pet.lastCheckup}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.label}>Weight: </Text>
              {pet.weight}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.label}>Energy Levels: </Text>
              {pet.energy}
            </Text>

            <View style={{ marginTop: 10 }}>
              <Text style={styles.label}>Upcoming:</Text>
              {pet.upcoming.map((item, idx) => (
                <Text key={idx} style={styles.upcomingItem}>
                  {item.item}: {item.date}
                </Text>
              ))}
            </View>
          </View>

          {/* Eye Button */}
          <View style={styles.eyeButtonContainer}>
            <TouchableOpacity style={styles.eyeButton}>
              <Eye color="white" size={22} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

// 🎨 Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6b7069',
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 12,
    backgroundColor: 'rgba(90, 96, 88, 0.95)',
    paddingBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  navButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  petName: {
    color: 'white',
    fontSize: 18,
  },
  imageContainer: {
    padding: 16,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 16,
  },
  infoSection: {
    paddingHorizontal: 16,
  },
  infoBox: {
    backgroundColor: 'rgba(50, 50, 50, 0.5)',
    borderRadius: 8,
    padding: 12,
  },
  infoTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  infoText: {
    color: '#ddd',
    marginBottom: 4,
  },
  label: {
    color: 'white',
    fontWeight: '600',
  },
  upcomingItem: {
    color: '#ccc',
  },
  eyeButtonContainer: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  eyeButton: {
    backgroundColor: 'rgba(80, 80, 80, 0.8)',
    padding: 10,
    borderRadius: 8,
  },
});
