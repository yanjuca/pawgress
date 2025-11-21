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
    {
      id: 1,
      name: 'Pibble',
      species: 'Dog',
      breed: 'Mixed',
      image: 'https://heapet.com/cdn/shop/articles/what-is-a-pibble-dog-smile_7b0f5b3b-0901-48a5-8e7e-0f48f3417712.webp?v=1751761402',
      healthStatus: 'Great Pawgress!',
      healthScore: 95,
      lastCheckup: 'Dr. Evans (Vetamin Clinic) on 10/20/2025',
      weight: '4.5 kg',
      weightStatus: 'On target for age',
      energy: 'High',
      energyDetail: 'Daily walks to play',
      upcoming: [
        { item: 'Vaccine Booster', date: 'Due 11/25/2025', priority: 'high' },
        { item: 'Flea/Tick Prevention', date: 'Due 11/01/2025', priority: 'medium' },
      ],
    }
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