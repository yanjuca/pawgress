
import React, { useContext, useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator
} from 'react-native';

import { ChevronLeft, User, Mail, Save } from 'lucide-react-native';
import { LocalAuthContext } from '../engine/LocalAuthEngine';

export default function EditProfileScreen({ navigation }) {
  
  const { user, updateUser, isLoading } = useContext(LocalAuthContext);

  // Estados locais para edição
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Atualiza os estados quando o usuário carrega
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleSave = async () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Erro', 'Digite um email válido.');
      return;
    }

    try {
      setIsSaving(true);
      await updateUser({
        ...user,
        name: name.trim(),
        email: email.trim(),
      });
      
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.log('Erro ao salvar:', error);
      Alert.alert('Erro', 'Não foi possível salvar as alterações.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            disabled={isSaving}
          >
            <ChevronLeft color="white" size={24} />
          </TouchableOpacity>

          <Text style={styles.title}>Editar Perfil</Text>

          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <User color="white" size={50} />
            </View>
          </View>

          {/* Campo Nome */}
          <Text style={styles.label}>Nome</Text>
          <View style={styles.inputContainer}>
            <User color="#888" size={18} />
            <TextInput 
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Seu nome"
              placeholderTextColor="#aaa"
              editable={!isSaving}
            />
          </View>

          {/* Campo Email */}
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputContainer}>
            <Mail color="#888" size={18} />
            <TextInput 
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Seu email"
              keyboardType="email-address"
              placeholderTextColor="#aaa"
              autoCapitalize="none"
              editable={!isSaving}
            />
          </View>

          {/* Salvar */}
          <TouchableOpacity 
            style={[styles.saveButton, isSaving && styles.disabledButton]}
            onPress={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Save color="white" size={20} />
            )}
            <Text style={styles.saveButtonText}>
              {isSaving ? 'Salvando...' : 'Salvar Alterações'}
            </Text>
          </TouchableOpacity>

        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6b7069',
    padding: 16,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 12,
    backgroundColor: 'rgba(90, 96, 88, 0.95)',
    paddingBottom: 16,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  backButton: {
    padding: 4,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(70, 130, 70, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  label: {
    color: 'white',
    marginBottom: 6,
    marginLeft: 4,
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(50, 50, 50, 0.5)',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  input: {
    flex: 1,
    color: 'white',
    padding: 12,
    fontSize: 15,
  },
  saveButton: {
    backgroundColor: 'rgba(70, 130, 70, 0.9)',
    borderRadius: 8,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.6,
  },
});
