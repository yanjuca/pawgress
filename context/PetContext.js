import React, { createContext, useState, useContext } from 'react';

const PetContext = createContext();

export const usePet = () => {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error('usePet must be used within a PetProvider');
  }
  return context;
};

export const PetProvider = ({ children }) => {
  const [pets, setPets] = useState([

  ]);

  const addPet = (newPet) => {
    const petWithId = {
      ...newPet,
      id: Date.now(), // ID único baseado no timestamp
      number: pets.length + 1,
      // Valores padrão para campos que não estão no formulário
      healthStatus: 'Great Pawgress!',
      healthScore: Math.floor(Math.random() * 30) + 70, // Score entre 70-100
      lastCheckup: 'No check-up yet',
      weight: newPet.weight ? `${newPet.weight} kg` : 'Not set',
      weightStatus: 'Recently added',
      energy: 'Unknown',
      energyDetail: 'Needs assessment',
      upcoming: [],
      image: newPet.image || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400'
    };
    setPets(prevPets => [...prevPets, petWithId]);
  };

  const updatePet = (id, updatedPet) => {
    setPets(prevPets => 
      prevPets.map(pet => 
        pet.id === id ? { ...pet, ...updatedPet } : pet
      )
    );
  };

  const deletePet = (id) => {
    setPets(prevPets => prevPets.filter(pet => pet.id !== id));
  };

  return (
    <PetContext.Provider value={{ pets, addPet, updatePet, deletePet }}>
      {children}
    </PetContext.Provider>
  );
};