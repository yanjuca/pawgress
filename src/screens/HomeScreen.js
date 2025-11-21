import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { Eye, ChevronLeft, ChevronRight, Heart, Calendar, Activity, Plus } from 'lucide-react-native';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { usePet } from '../../context/PetContext'; // Ajuste o caminho

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const { pets } = usePet();
  const [currentPet, setCurrentPet] = useState(0);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1));

  // Verifica se há pets, se não, mostra estado vazio
  if (pets.length === 0) {
    return (
      <View style={styles.container}>
        <Header 
          title="pawgress" 
          onMenuPress={() => setIsSidebarVisible(true)}
          showAddButton={true}
          onAddPress={() => navigation.navigate('AddPet')}
        />
        
        <Sidebar
          isVisible={isSidebarVisible}
          onClose={() => setIsSidebarVisible(false)}
        />

        <View style={styles.emptyState}>
          <View style={styles.emptyCard}>
            <Heart color="#7a6047" size={64} />
            <Text style={styles.emptyTitle}>No Pets Added Yet</Text>
            <Text style={styles.emptyText}>
              Start by adding your first pet to track their health and progress!
            </Text>
            <TouchableOpacity 
              style={styles.addFirstPetButton}
              onPress={() => navigation.navigate('AddPet')}
            >
              <Plus color="white" size={20} />
              <Text style={styles.addFirstPetText}>Add Your First Pet</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  const pet = pets[currentPet];

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
      setCurrentPet((prev) => (prev + 1) % pets.length);
    } else {
      setCurrentPet((prev) => (prev - 1 + pets.length) % pets.length);
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

  return (
    <View style={styles.container}>
      <Header 
        title="pawgress" 
        onMenuPress={() => setIsSidebarVisible(true)}
        showAddButton={true}
        onAddPress={() => navigation.navigate('AddPet')}
      />

      <Sidebar
        isVisible={isSidebarVisible}
        onClose={() => setIsSidebarVisible(false)}
      />

      <View style={styles.card}>
        {/* Header do Card com Navegação */}
        <View style={styles.cardHeader}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => handlePetChange('prev')}
            disabled={pets.length === 1}
          >
            <ChevronLeft color="white" size={24} />
          </TouchableOpacity>

          <View style={styles.petInfo}>
            <Text style={styles.petName}>{pet.name}</Text>
            <Text style={styles.petDetails}>
              {pet.breed || pet.species} • {pet.gender || 'Not specified'}
            </Text>
            <View style={styles.petIndicators}>
              {pets.map((_, idx) => (
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
            disabled={pets.length === 1}
          >
            <ChevronRight color="white" size={24} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Animated.View style={{ opacity: fadeAnim }}>
            {/* Imagem do Pet */}
            <View style={styles.imageContainer}>
              <Image source={{ uri: pet.image }} style={styles.image} />
              <View style={styles.imageOverlay}>
                <View style={styles.badge}>
                  <Heart color="#ff6b6b" size={16} fill="#ff6b6b" />
                  <Text style={styles.badgeText}>#{pet.number}</Text>
                </View>
                {pet.location && (
                  <View style={styles.locationBadge}>
                    <Text style={styles.locationText}>{pet.location}</Text>
                  </View>
                )}
              </View>
            </View>

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
                  <Text style={styles.infoValue}>{pet.birthDate}</Text>
                </View>
              )}
              {pet.microchip && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Microchip:</Text>
                  <Text style={styles.infoValue}>{pet.microchip}</Text>
                </View>
              )}
            </View>

            {/* Health Score */}
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

            {/* Quick Stats */}
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Weight</Text>
                <Text style={styles.statValue}>{pet.weight}</Text>
                <Text style={styles.statSubtext}>{pet.weightStatus}</Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Energy</Text>
                <Text style={styles.statValue}>{pet.energy}</Text>
                <Text style={styles.statSubtext}>{pet.energyDetail}</Text>
              </View>
            </View>

            {/* Last Checkup */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Calendar color="#fff" size={18} />
                <Text style={styles.sectionTitle}>Last Check-up</Text>
              </View>
              <Text style={styles.checkupText}>{pet.lastCheckup}</Text>
            </View>

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

            {/* View Details Button */}
            <TouchableOpacity style={styles.detailsButton}>
              <Eye color="white" size={20} />
              <Text style={styles.detailsButtonText}>View Full Health Report</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6b7069',
    paddingHorizontal: 16,
  },
  card: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: 'rgba(90, 96, 88, 0.95)',
    marginTop: 20,
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
    backgroundColor: '#4ade80',
    width: 24,
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
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    backgroundColor: 'rgba(74, 222, 128, 0.2)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4ade80',
  },
  detailsButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    width: '100%',
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7a6047',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  addFirstPetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#7a6047',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  addFirstPetText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});