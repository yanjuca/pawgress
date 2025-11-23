import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  StatusBar,
} from 'react-native';
import { Trash2, ChevronLeft, ChevronRight, Heart, Calendar, Activity, User, Plus } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert } from 'react-native';
import { usePet } from '../../context/PetContext';

export default function HomeScreen({ navigation }) {
  const { pets, deletePet } = usePet();
  
  // Se não houver pets, mostra o card de adicionar como primeiro
  const petsToDisplay = pets.length === 0 ? [{ isAddPet: true }] : [...pets, { isAddPet: true }];
  
  const [currentPet, setCurrentPet] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(1));

  const pet = petsToDisplay[currentPet];

  const handlePetChange = (direction) => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    if (direction === 'next') {
      setCurrentPet((prev) => (prev + 1) % petsToDisplay.length);
    } else {
      setCurrentPet((prev) => (prev - 1 + petsToDisplay.length) % petsToDisplay.length);
    }
  };

  const getHealthColor = (score) => {
    if (score >= 90) return '#4ade80';
    if (score >= 70) return '#fbbf24';
    return '#f87171';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#f87171';
      case 'medium':
        return '#fbbf24';
      default:
        return '#4ade80';
    }
  };

  const handleDeletePet = () => {
    Alert.alert(
      'Delete Pet',
      `Are you sure you want to delete ${pet.name}? This action cannot be undone.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deletePet(pet.id);
            // Se era o último pet, volta para o card de adicionar
            if (pets.length === 1) {
              setCurrentPet(0);
            } else if (currentPet >= pets.length - 1) {
              setCurrentPet(pets.length - 2);
            }
          },
        },
      ]
    );
  };

  // Renderiza card de "Adicionar Pet"
  if (pet.isAddPet) {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
        
        <Image 
          source={require('../../assets/background.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />

        <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
          <View style={styles.header}>
            <Image 
              source={require('../../assets/pawgresslogo.png')}
              style={styles.headerLogo}
              resizeMode="contain"
            />
            
            <TouchableOpacity 
              style={styles.profileButton}
              onPress={() => navigation.navigate('Profile')}
            >
              <User color="#fff" size={24} />
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <TouchableOpacity
                style={styles.navButton}
                onPress={() => handlePetChange('prev')}
                disabled={petsToDisplay.length === 1}
              >
                <ChevronLeft color="white" size={24} />
              </TouchableOpacity>

              <View style={styles.petInfo}>
                <Text style={styles.petName}>Add New Pet</Text>
                <View style={styles.petIndicators}>
                  {petsToDisplay.map((_, idx) => (
                    <View
                      key={idx}
                      style={[
                        styles.indicator,
                        idx === currentPet && styles.activeIndicator,
                      ]}
                    />
                  ))}
                </View>
              </View>

              <TouchableOpacity
                style={styles.navButton}
                onPress={() => handlePetChange('next')}
                disabled={petsToDisplay.length === 1}
              >
                <ChevronRight color="white" size={24} />
              </TouchableOpacity>
            </View>

            <View style={styles.addPetContent}>
              <View style={styles.addPetIcon}>
                <Plus color="#c8e99a" size={80} strokeWidth={2} />
              </View>
              
              <Text style={styles.addPetTitle}>Add a New Pet</Text>
              <Text style={styles.addPetSubtitle}>
                Start tracking your pet's health journey
              </Text>

              <TouchableOpacity 
                style={styles.addPetButton}
                onPress={() => navigation.navigate('AddPet')}
              >
                <Text style={styles.addPetButtonText}>Add Pet</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  // Renderiza card normal do pet
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <Image 
        source={require('../../assets/background.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <Image 
            source={require('../../assets/pawgresslogo.png')}
            style={styles.headerLogo}
            resizeMode="contain"
          />
          
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <User color="#fff" size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => handlePetChange('prev')}
              disabled={petsToDisplay.length === 1}
            >
              <ChevronLeft color="white" size={24} />
            </TouchableOpacity>

            <View style={styles.petInfo}>
              <Text style={styles.petName}>{pet.name}</Text>
              {(pet.breed || pet.species) && (
                <Text style={styles.petDetails}>
                  {pet.breed || pet.species} • {pet.gender || 'Not specified'}
                </Text>
              )}
              <View style={styles.petIndicators}>
                {petsToDisplay.map((_, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.indicator,
                      idx === currentPet && styles.activeIndicator,
                    ]}
                  />
                ))}
              </View>
            </View>

            <TouchableOpacity
              style={styles.navButton}
              onPress={() => handlePetChange('next')}
              disabled={petsToDisplay.length === 1}
            >
              <ChevronRight color="white" size={24} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <Animated.View style={{ opacity: fadeAnim }}>
              {/* Imagem do Pet */}
              {pet.image && (
                <View style={styles.imageContainer}>
                  <Image source={{ uri: pet.image }} style={styles.image} />
                  <View style={styles.imageOverlay}>
                    <View style={styles.badge}>
                      <Heart color="#ff6b6b" size={16} fill="#ff6b6b" />
                      <Text style={styles.badgeText}>#{pet.id}</Text>
                    </View>
                    {pet.location && (
                      <View style={styles.locationBadge}>
                        <Text style={styles.locationText}>{pet.location}</Text>
                      </View>
                    )}
                  </View>
                </View>
              )}

              {/* Informações Básicas */}
              <View style={styles.basicInfoContainer}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Species:</Text>
                  <Text style={styles.infoValue}>{pet.species || 'Not specified'}</Text>
                </View>
                {pet.breed && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Breed:</Text>
                    <Text style={styles.infoValue}>{pet.breed}</Text>
                  </View>
                )}
                {pet.birthDate && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Birth Date:</Text>
                    <Text style={styles.infoValue}>{new Date(pet.birthDate).toLocaleDateString()}</Text>
                  </View>
                )}
                {pet.microchip && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Microchip:</Text>
                    <Text style={styles.infoValue}>{pet.microchip}</Text>
                  </View>
                )}
              </View>

              {/* Health Score - só mostra se existir */}
              {pet.healthScore && (
                <View style={styles.healthScoreContainer}>
                  <View style={styles.healthScoreContent}>
                    <Activity color={getHealthColor(pet.healthScore)} size={20} />
                    <Text style={styles.healthScoreText}>{pet.healthStatus}</Text>
                  </View>
                  <View style={styles.scoreBar}>
                    <View
                      style={[
                        styles.scoreBarFill,
                        {
                          width: `${pet.healthScore}%`,
                          backgroundColor: getHealthColor(pet.healthScore),
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.scorePercentage}>{pet.healthScore}% Health Score</Text>
                </View>
              )}

              {/* Quick Stats */}
              {(pet.weight || pet.energy) && (
                <View style={styles.statsGrid}>
                  {pet.weight && (
                    <View style={styles.statCard}>
                      <Text style={styles.statLabel}>Weight</Text>
                      <Text style={styles.statValue}>{pet.weight} kg</Text>
                      {pet.weightStatus && (
                        <Text style={styles.statSubtext}>{pet.weightStatus}</Text>
                      )}
                    </View>
                  )}

                  {pet.energy && (
                    <View style={styles.statCard}>
                      <Text style={styles.statLabel}>Energy</Text>
                      <Text style={styles.statValue}>{pet.energy}</Text>
                      {pet.energyDetail && (
                        <Text style={styles.statSubtext}>{pet.energyDetail}</Text>
                      )}
                    </View>
                  )}
                </View>
              )}

              {/* Last Checkup */}
              {pet.lastCheckup && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Calendar color="#fff" size={18} />
                    <Text style={styles.sectionTitle}>Last Check-up</Text>
                  </View>
                  <Text style={styles.checkupText}>{pet.lastCheckup}</Text>
                </View>
              )}

              {/* Upcoming */}
              {pet.upcoming && pet.upcoming.length > 0 && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Calendar color="#fff" size={18} />
                    <Text style={styles.sectionTitle}>Upcoming</Text>
                  </View>
                  {pet.upcoming.map((item, idx) => (
                    <View key={idx} style={styles.upcomingCard}>
                      <View
                        style={[
                          styles.priorityDot,
                          { backgroundColor: getPriorityColor(item.priority) },
                        ]}
                      />
                      <View style={styles.upcomingContent}>
                        <Text style={styles.upcomingItem}>{item.item}</Text>
                        <Text style={styles.upcomingDate}>{item.date}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}

              {/* Delete Button */}
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={handleDeletePet}
              >
                <Trash2 color="white" size={20} />
                <Text style={styles.deleteButtonText}>Delete Pet</Text>
              </TouchableOpacity>
            </Animated.View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: 'transparent' },
  backgroundImage: { position: 'absolute', width: '100%', height: '100%' },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  headerLogo: {
    width: 120,
    height: 50,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: 'rgba(45, 58, 44, 0.85)',
    marginHorizontal: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  navButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  petInfo: {
    alignItems: 'center',
    flex: 1,
  },
  petName: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  petDetails: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 8,
  },
  petIndicators: {
    flexDirection: 'row',
    gap: 6,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  activeIndicator: {
    backgroundColor: '#c8e99a',
    width: 24,
  },
  
  addPetContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  addPetIcon: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(200, 233, 154, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: 'rgba(200, 233, 154, 0.3)',
    borderStyle: 'dashed',
  },
  addPetTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  addPetSubtitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 32,
  },
  addPetButton: {
    backgroundColor: '#c8e99a',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  addPetButtonText: {
    color: '#2d3a2c',
    fontWeight: '700',
    fontSize: 16,
    textTransform: 'uppercase',
  },

  scrollContent: {
    flex: 1,
  },
  imageContainer: {
    padding: 16,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 280,
    borderRadius: 16,
  },
  imageOverlay: {
    position: 'absolute',
    top: 28,
    right: 28,
    alignItems: 'flex-end',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  locationBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  locationText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  basicInfoContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  infoLabel: {
    color: '#aaa',
    fontSize: 14,
    fontWeight: '500',
  },
  infoValue: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  healthScoreContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
  },
  healthScoreContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  healthScoreText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scoreBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  scoreBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  scorePercentage: {
    color: '#aaa',
    fontSize: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 12,
  },
  statLabel: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statSubtext: {
    color: '#888',
    fontSize: 11,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkupText: {
    color: '#ddd',
    fontSize: 14,
    lineHeight: 20,
  },
  upcomingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 12,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  upcomingContent: {
    flex: 1,
  },
  upcomingItem: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  upcomingDate: {
    color: '#aaa',
    fontSize: 12,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    backgroundColor: 'rgba(157, 64, 55, 0.2)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#9d4037',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});