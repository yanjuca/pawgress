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
  Platform
} from 'react-native';
import { usePet } from '../../context/PetContext';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

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

  // Função para validar o formulário
  const validateForm = () => {
    return (
      petData.name.trim() !== '' &&
      petData.species.trim() !== '' &&
      selectedGender !== '' &&
      petData.weight.trim() !== ''
    );
  };

  // Função para selecionar imagem da galeria
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

  // Função para tirar foto com a câmera
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

  // Função para lidar com a data de nascimento
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
    <ScrollView style={styles.container}>
      {/* Seção da Imagem */}
      <View style={styles.imageSection}>
        <TouchableOpacity 
          style={styles.imageContainer}
          onPress={pickImage}
        >
          {petImage ? (
            <Image source={{ uri: petImage }} style={styles.petImage} />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>Adicionar Foto</Text>
            </View>
          )}
        </TouchableOpacity>
        
        <View style={styles.cameraButtons}>
          <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>
            <Text style={styles.cameraButtonText}>Galeria</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cameraButton} onPress={takePhoto}>
            <Text style={styles.cameraButtonText}>Câmera</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Formulário */}
      <View style={styles.form}>
        {/* Nome */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome *</Text>
          <TextInput
            style={styles.input}
            value={petData.name}
            onChangeText={(text) => setPetData({ ...petData, name: text })}
            placeholder="Digite o nome do pet"
          />
        </View>

        {/* Espécie */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Espécie *</Text>
          <TextInput
            style={styles.input}
            value={petData.species}
            onChangeText={(text) => setPetData({ ...petData, species: text })}
            placeholder="Ex: Cachorro, Gato, etc."
          />
        </View>

        {/* Raça */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Raça</Text>
          <TextInput
            style={styles.input}
            value={petData.breed}
            onChangeText={(text) => setPetData({ ...petData, breed: text })}
            placeholder="Digite a raça"
          />
        </View>

        {/* Gênero */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Gênero *</Text>
          <View style={styles.genderContainer}>
            {['Macho', 'Fêmea'].map((gender) => (
              <TouchableOpacity
                key={gender}
                style={[
                  styles.genderButton,
                  selectedGender === gender && styles.genderButtonSelected
                ]}
                onPress={() => setSelectedGender(gender)}
              >
                <Text
                  style={[
                    styles.genderText,
                    selectedGender === gender && styles.genderTextSelected
                  ]}
                >
                  {gender}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Data de Nascimento */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Data de Nascimento</Text>
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

        {/* Peso */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Peso (kg) *</Text>
          <TextInput
            style={styles.input}
            value={petData.weight}
            onChangeText={(text) => setPetData({ ...petData, weight: text })}
            placeholder="Ex: 5.2"
            keyboardType="decimal-pad"
          />
        </View>

        {/* Microchip */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Número do Microchip</Text>
          <TextInput
            style={styles.input}
            value={petData.microchip}
            onChangeText={(text) => setPetData({ ...petData, microchip: text })}
            placeholder="Número do microchip"
          />
        </View>

        {/* Localização */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Localização</Text>
          <TextInput
            style={styles.input}
            value={petData.location}
            onChangeText={(text) => setPetData({ ...petData, location: text })}
            placeholder="Cidade/Estado"
          />
        </View>

        {/* Botão Salvar */}
        <TouchableOpacity 
          style={[
            styles.saveButton,
            !validateForm() && styles.saveButtonDisabled
          ]}
          onPress={handleSave}
          disabled={!validateForm()}
        >
          <Text style={styles.saveButtonText}>Salvar Pet</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageSection: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    overflow: 'hidden',
  },
  petImage: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
    backgroundColor: '#e1e1e1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#666',
    fontSize: 14,
  },
  cameraButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  cameraButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#007AFF',
    borderRadius: 20,
  },
  cameraButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  genderButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  genderButtonSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  genderText: {
    fontSize: 16,
    color: '#666',
  },
  genderTextSelected: {
    color: '#fff',
    fontWeight: '500',
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f9f9f9',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonDisabled: {
    backgroundColor: '#ccc',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});