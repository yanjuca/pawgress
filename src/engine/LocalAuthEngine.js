// engine/LocalAuthEngine.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LocalAuthContext = createContext();

export function LocalAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carrega o usuário do AsyncStorage ao inicializar
  useEffect(() => {
    loadUserFromStorage();
  }, []);

  const loadUserFromStorage = async () => {
    try {
      setIsLoading(true);
      const currentUserEmail = await AsyncStorage.getItem('currentUser');
      if (currentUserEmail) {
        const storedUsers = await AsyncStorage.getItem('users');
        const users = storedUsers ? JSON.parse(storedUsers) : [];
        const currentUser = users.find(u => u.email === currentUserEmail);
        if (currentUser) {
          setUser(currentUser);
        }
      }
    } catch (error) {
      console.log('Erro ao carregar usuário:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (updatedUser) => {
    try {
      setUser(updatedUser);
      
      // Atualiza também no AsyncStorage
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      
      const userIndex = users.findIndex(u => u.email === user.email);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updatedUser };
        await AsyncStorage.setItem('users', JSON.stringify(users));
        
        // Se o email foi alterado, atualiza também o currentUser
        if (updatedUser.email !== user.email) {
          await AsyncStorage.setItem('currentUser', updatedUser.email);
        }
      }
    } catch (error) {
      console.log('Erro ao atualizar usuário:', error);
      throw error;
    }
  };

  const login = async (userData) => {
    try {
      setUser(userData);
      await AsyncStorage.setItem('currentUser', userData.email);
    } catch (error) {
      console.log('Erro ao fazer login:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem('currentUser');
    } catch (error) {
      console.log('Erro ao fazer logout:', error);
      throw error;
    }
  };

  return (
    <LocalAuthContext.Provider value={{
      user,
      isLoading,
      updateUser,
      login,
      logout,
      loadUserFromStorage
    }}>
      {children}
    </LocalAuthContext.Provider>
  );
}
