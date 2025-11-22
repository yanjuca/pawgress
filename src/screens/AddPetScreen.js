import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  StyleSheet,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { usePet } from '../../context/PetContext';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  PawPrint,
  Calendar,
  Weight,
  MapPin,
  User as UserIcon,
  Camera,
  ArrowLeft,
  Check,
  X,
} from 'lucide-react-native';

export default function AddPetScreen({ navigation }) {
  const { addPet } = usePet();
  
  const [petData, setPetData] = useState({
    name: '',
    species: '',
    breed: '',
    birthDate: new Date(),
    weight: '',
    microchip: '',
    location: ''
  });
  
  const [selectedGender, setSelectedGender] = useState('');
  const [petImage, setPetImage] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const validateForm = () => {
    return (
      petData.name.trim() !== '' &&
      petData.species.trim() !== '' &&
      selectedGender !== '' &&
      petData.weight.trim() !== ''
    );
  };

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Precisamos de acesso à sua galeria de fotos.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setPetImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível selecionar a imagem.');
    }
  };

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Precisamos de acesso à sua câmera.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setPetImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível tirar a foto.');
    }
  };

  const handleImagePicker = () => {
    Alert.alert(
      'Add Photo',
      'Choose an option',
      [
        {
          text: 'Take Photo',
          onPress: () => takePhoto(),
        },
        {
          text: 'Choose from Library',
          onPress: () => pickImage(),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  const removeImage = () => {
    setPetImage(null);
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setPetData({ ...petData, birthDate: selectedDate });
    }
  };

  const handleSave = () => {
    if (validateForm()) {
      const newPet = {
        id: Date.now().toString(),
        name: petData.name,
        species: petData.species,
        breed: petData.breed,
        birthDate: petData.birthDate.toISOString(),
        weight: parseFloat(petData.weight) || 0,
        gender: selectedGender,
        microchip: petData.microchip,
        location: petData.location,
        image: petImage,
        createdAt: new Date().toISOString(),
      };

      addPet(newPet);
      
      Alert.alert(
        'Sucesso',
        `${petData.name} foi adicionado com sucesso!`,
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home'),
          },
        ]
      );
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios');
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <Image 
        source={require('../../assets/background.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
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

          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <BlurView intensity={100} tint="dark" style={styles.card}>
              <View style={styles.cardInner}>
                <Text style={styles.cardTitle}>add new pet</Text>

                {/* Photo Upload */}
                <TouchableOpacity 
                  style={styles.photoUpload}
                  onPress={handleImagePicker}
                  activeOpacity={0.7}
                >
                  {petImage ? (
                    <View style={styles.photoPreviewContainer}>
                      <Image source={{ uri: petImage }} style={styles.photoPreview} />
                      <TouchableOpacity
                        style={styles.removePhotoButton}
                        onPress={removeImage}
                      >
                        <X color="white" size={20} />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <>
                      <Camera color="rgba(255,255,255,0.5)" size={40} />
                      <Text style={styles.photoUploadText}>add photo</Text>
                      <Text style={styles.photoUploadSubtext}>tap to upload or take a photo</Text>
                    </>
                  )}
                </TouchableOpacity>

                {/* Basic Information */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>basic information</Text>

                  <View style={styles.inputGroup}>
                    <View style={styles.inputIcon}>
                      <PawPrint color="#c8e99a" size={18} />
                    </View>
                    <View style={styles.inputWrapper}>
                      <Text style={styles.inputLabel}>pet name *</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="e.g., max, luna, pibble"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        value={petData.name}
                        onChangeText={(text) => setPetData({ ...petData, name: text })}
                      />
                    </View>
                  </View>

                  <View style={styles.inputGroup}>
                    <View style={styles.inputIcon}>
                      <PawPrint color="#c8e99a" size={18} />
                    </View>
                    <View style={styles.inputWrapper}>
                      <Text style={styles.inputLabel}>species *</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="e.g., dog, cat, rabbit"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        value={petData.species}
                        onChangeText={(text) => setPetData({ ...petData, species: text })}
                      />
                    </View>
                  </View>

                  <View style={styles.inputGroup}>
                    <View style={styles.inputIcon}>
                      <PawPrint color="#c8e99a" size={18} />
                    </View>
                    <View style={styles.inputWrapper}>
                      <Text style={styles.inputLabel}>breed</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="e.g., labrador, persian"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        value={petData.breed}
                        onChangeText={(text) => setPetData({ ...petData, breed: text })}
                      />
                    </View>
                  </View>
                </View>

                {/* Gender Selection */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>gender *</Text>
                  <View style={styles.genderContainer}>
                    {['Macho', 'Fêmea'].map((gender) => (
                      <TouchableOpacity
                        key={gender}
                        style={[
                          styles.genderButton,
                          selectedGender === gender && styles.genderButtonActive,
                        ]}
                        onPress={() => setSelectedGender(gender)}
                      >
                        <Text
                          style={[
                            styles.genderButtonText,
                            selectedGender === gender && styles.genderButtonTextActive,
                          ]}
                        >
                          {gender.toLowerCase()}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* Additional Details */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>additional details</Text>

                  <View style={styles.inputGroup}>
                    <View style={styles.inputIcon}>
                      <Calendar color="#c8e99a" size={18} />
                    </View>
                    <View style={styles.inputWrapper}>
                      <Text style={styles.inputLabel}>birth date</Text>
                      <TouchableOpacity
                        style={styles.dateButton}
                        onPress={() => setShowDatePicker(true)}
                      >
                        <Text style={styles.dateText}>
                          {formatDate(petData.birthDate)}
                        </Text>
                      </TouchableOpacity>
                      
                      {showDatePicker && (
                        <DateTimePicker
                          value={petData.birthDate}
                          mode="date"
                          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                          onChange={onDateChange}
                          maximumDate={new Date()}
                        />
                      )}
                    </View>
                  </View>

                  <View style={styles.inputGroup}>
                    <View style={styles.inputIcon}>
                      <Weight color="#c8e99a" size={18} />
                    </View>
                    <View style={styles.inputWrapper}>
                      <Text style={styles.inputLabel}>weight (kg) *</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="e.g., 4.5"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        keyboardType="decimal-pad"
                        value={petData.weight}
                        onChangeText={(text) => setPetData({ ...petData, weight: text })}
                      />
                    </View>
                  </View>

                  <View style={styles.inputGroup}>
                    <View style={styles.inputIcon}>
                      <UserIcon color="#c8e99a" size={18} />
                    </View>
                    <View style={styles.inputWrapper}>
                      <Text style={styles.inputLabel}>microchip id</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="enter microchip number"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        value={petData.microchip}
                        onChangeText={(text) => setPetData({ ...petData, microchip: text })}
                      />
                    </View>
                  </View>

                  <View style={styles.inputGroup}>
                    <View style={styles.inputIcon}>
                      <MapPin color="#c8e99a" size={18} />
                    </View>
                    <View style={styles.inputWrapper}>
                      <Text style={styles.inputLabel}>location</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="city, country"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        value={petData.location}
                        onChangeText={(text) => setPetData({ ...petData, location: text })}
                      />
                    </View>
                  </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => navigation.goBack()}
                  >
                    <Text style={styles.cancelButtonText}>cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.saveWrapper}
                    onPress={handleSave}
                    activeOpacity={0.85}
                    disabled={!validateForm()}
                  >
                    <LinearGradient
                      colors={validateForm() ? ['#c8e99a', '#9fdc7c'] : ['#666', '#555']}
                      start={[0, 0]}
                      end={[1, 1]}
                      style={styles.saveButton}
                    >
                      <Check color={validateForm() ? "#2d3a2c" : "#999"} size={20} />
                      <Text style={[styles.saveButtonText, !validateForm() && styles.saveButtonTextDisabled]}>save pet</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </BlurView>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: 'transparent' },
  backgroundImage: { position: 'absolute', width: '100%', height: '100%' },
  container: { flex: 1 },
  
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

  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },

  card: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  cardInner: {
    padding: 20,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textTransform: 'lowercase',
    textAlign: 'center',
  },

  photoUpload: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: 'rgba(200, 233, 154, 0.3)',
    borderStyle: 'dashed',
  },
  photoUploadText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 12,
    textTransform: 'lowercase',
  },
  photoUploadSubtext: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 4,
    textTransform: 'lowercase',
  },
  photoPreviewContainer: {
    width: '100%',
    position: 'relative',
  },
  photoPreview: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  removePhotoButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    padding: 8,
  },

  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#c8e99a',
    marginBottom: 12,
    textTransform: 'lowercase',
  },

  inputGroup: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 12,
  },
  inputIcon: {
    justifyContent: 'center',
    marginRight: 12,
  },
  inputWrapper: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 4,
    fontWeight: '600',
    textTransform: 'lowercase',
  },
  input: {
    fontSize: 16,
    color: '#fff',
    padding: 0,
  },
  dateButton: {
    paddingVertical: 4,
  },
  dateText: {
    fontSize: 16,
    color: '#fff',
  },

  genderContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  genderButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  genderButtonActive: {
    backgroundColor: 'rgba(200, 233, 154, 0.2)',
    borderColor: '#c8e99a',
  },
  genderButtonText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '600',
    fontSize: 14,
    textTransform: 'lowercase',
  },
  genderButtonTextActive: {
    color: '#c8e99a',
  },

  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'lowercase',
  },
  saveWrapper: {
    flex: 1,
  },
  saveButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  saveButtonText: {
    color: '#2d3a2c',
    fontWeight: '700',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  saveButtonTextDisabled: {
    color: '#999',
  },
});