import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
  ActionSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {
  PawPrint,
  Calendar,
  Weight,
  MapPin,
  User,
  Camera,
  ArrowLeft,
  Check,
  Image as ImageIcon,
  X,
} from 'lucide-react-native';

export default function AddPetScreen({ navigation }) {
  const [petData, setPetData] = useState({
    name: '',
    species: '',
    breed: '',
    birthDate: '',
    weight: '',
    gender: '',
    microchip: '',
    location: '',
  });

  const [selectedGender, setSelectedGender] = useState('');
  const [errors, setErrors] = useState({});
  const [petImage, setPetImage] = useState(null);

  // Request permissions on mount
  React.useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    })();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!petData.name.trim()) {
      newErrors.name = 'Pet name is required';
    }
    
    if (!petData.species.trim()) {
      newErrors.species = 'Species is required';
    }
    
    if (!selectedGender) {
      newErrors.gender = 'Please select a gender';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      Alert.alert(
        'Success',
        `${petData.name} has been added successfully!`,
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home'),
          },
        ]
      );
    } else {
      Alert.alert('Error', 'Please fill in all required fields');
    }
  };

  const updateField = (field, value) => {
    setPetData({ ...petData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
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

  const takePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setPetImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setPetImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const removeImage = () => {
    setPetImage(null);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft color="white" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Pet</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
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
              <Camera color="#888" size={32} />
              <Text style={styles.photoUploadText}>Add Photo</Text>
              <Text style={styles.photoUploadSubtext}>Tap to upload or take a photo</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Basic Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>

          <View style={styles.inputGroup}>
            <View style={styles.inputIcon}>
              <PawPrint color="#7a6047" size={20} />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Pet Name *</Text>
              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                placeholder="e.g., Max, Luna, Pibble"
                placeholderTextColor="#999"
                value={petData.name}
                onChangeText={(value) => updateField('name', value)}
              />
              {errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputIcon}>
              <PawPrint color="#7a6047" size={20} />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Species *</Text>
              <TextInput
                style={[styles.input, errors.species && styles.inputError]}
                placeholder="e.g., Dog, Cat, Rabbit"
                placeholderTextColor="#999"
                value={petData.species}
                onChangeText={(value) => updateField('species', value)}
              />
              {errors.species && (
                <Text style={styles.errorText}>{errors.species}</Text>
              )}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputIcon}>
              <PawPrint color="#7a6047" size={20} />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Breed</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Labrador, Persian"
                placeholderTextColor="#999"
                value={petData.breed}
                onChangeText={(value) => updateField('breed', value)}
              />
            </View>
          </View>
        </View>

        {/* Gender Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gender *</Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={[
                styles.genderButton,
                selectedGender === 'male' && styles.genderButtonActive,
              ]}
              onPress={() => {
                setSelectedGender('male');
                setErrors({ ...errors, gender: '' });
              }}
            >
              <Text
                style={[
                  styles.genderButtonText,
                  selectedGender === 'male' && styles.genderButtonTextActive,
                ]}
              >
                Male
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.genderButton,
                selectedGender === 'female' && styles.genderButtonActive,
              ]}
              onPress={() => {
                setSelectedGender('female');
                setErrors({ ...errors, gender: '' });
              }}
            >
              <Text
                style={[
                  styles.genderButtonText,
                  selectedGender === 'female' && styles.genderButtonTextActive,
                ]}
              >
                Female
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.genderButton,
                selectedGender === 'other' && styles.genderButtonActive,
              ]}
              onPress={() => {
                setSelectedGender('other');
                setErrors({ ...errors, gender: '' });
              }}
            >
              <Text
                style={[
                  styles.genderButtonText,
                  selectedGender === 'other' && styles.genderButtonTextActive,
                ]}
              >
                Other
              </Text>
            </TouchableOpacity>
          </View>
          {errors.gender && (
            <Text style={styles.errorText}>{errors.gender}</Text>
          )}
        </View>

        {/* Additional Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Details</Text>

          <View style={styles.inputGroup}>
            <View style={styles.inputIcon}>
              <Calendar color="#7a6047" size={20} />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Birth Date</Text>
              <TextInput
                style={styles.input}
                placeholder="MM/DD/YYYY"
                placeholderTextColor="#999"
                value={petData.birthDate}
                onChangeText={(value) => updateField('birthDate', value)}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputIcon}>
              <Weight color="#7a6047" size={20} />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Weight (kg)</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 4.5"
                placeholderTextColor="#999"
                keyboardType="decimal-pad"
                value={petData.weight}
                onChangeText={(value) => updateField('weight', value)}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputIcon}>
              <User color="#7a6047" size={20} />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Microchip ID</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter microchip number"
                placeholderTextColor="#999"
                value={petData.microchip}
                onChangeText={(value) => updateField('microchip', value)}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputIcon}>
              <MapPin color="#7a6047" size={20} />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Location</Text>
              <TextInput
                style={styles.input}
                placeholder="City, Country"
                placeholderTextColor="#999"
                value={petData.location}
                onChangeText={(value) => updateField('location', value)}
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
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Check color="white" size={20} />
            <Text style={styles.saveButtonText}>Save Pet</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c5b7a1',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 16,
    backgroundColor: '#7a6047',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  photoUpload: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
  },
  photoUploadText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 12,
  },
  photoUploadSubtext: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
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
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  inputGroup: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    fontWeight: '600',
  },
  input: {
    fontSize: 16,
    color: '#333',
    padding: 0,
  },
  inputError: {
    borderBottomWidth: 1,
    borderBottomColor: '#f87171',
  },
  errorText: {
    color: '#f87171',
    fontSize: 11,
    marginTop: 4,
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  genderButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  genderButtonActive: {
    backgroundColor: '#7a6047',
    borderColor: '#5a4837',
  },
  genderButtonText: {
    color: '#666',
    fontWeight: '600',
    fontSize: 14,
  },
  genderButtonTextActive: {
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#7a6047',
  },
  cancelButtonText: {
    color: '#7a6047',
    fontWeight: 'bold',
    fontSize: 16,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#7a6047',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});