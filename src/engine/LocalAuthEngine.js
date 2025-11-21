import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";

// 🔐 Chave para salvar o usuário local
const STORAGE_KEY = "@localUser";

export const LocalAuthContext = createContext();

export function LocalAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // -------------------------
  // 🔄 Carrega usuário salvo
  // -------------------------
  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) setUser(JSON.parse(saved));
    } catch (e) {
      console.log("Erro ao carregar usuário:", e);
    }
    setLoading(false);
  }

  // -------------------------
  // 🔐 Registrar usuário local
  // -------------------------
  async function register(name, email, password) {
    const encryptedPass = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password: encryptedPass,
    };

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setUser(newUser);

    return true;
  }

  // -------------------------
  // 🔓 Login local autenticado
  // -------------------------
  async function login(email, password) {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);
    if (!saved) return false;

    const savedUser = JSON.parse(saved);
    const encryptedPass = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );

    if (savedUser.email === email && savedUser.password === encryptedPass) {
      setUser(savedUser);
      return true;
    }

    return false;
  }

  // -------------------------
  // ✏ Atualizar dados locais
  // -------------------------
  async function updateUser(data) {
    const updated = { ...user, ...data };
    setUser(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  // -------------------------
  // 🚪 Logout local
  // -------------------------
  async function logout() {
    setUser(null);
  }

  return (
    <LocalAuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        updateUser,
        logout,
      }}
    >
      {children}
    </LocalAuthContext.Provider>
  );
}

export function useLocalAuth() {
  return useContext(LocalAuthContext);
}
