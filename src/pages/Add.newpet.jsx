import React, { useState } from "react";
import "./AddPet.css";

export default function AddPet() {
  const [petData, setPetData] = useState({
    name: "",
    age: "",
    species: "",
    breed: "",
    weight: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setPetData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Novo pet adicionado:", petData);
    alert(`Pet "${petData.name}" adicionado com sucesso! 🐶`);
  };

  return (
    <div className="addpet-container">
      <header className="addpet-header">
        <h2 className="logo">🐾 Pawgress</h2>
        <h3 className="title">Adicionar Novo Pet</h3>
      </header>

      <form className="addpet-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome do Pet</label>
          <input
            type="text"
            name="name"
            placeholder="Ex: Pibble"
            value={petData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Idade (anos)</label>
          <input
            type="number"
            name="age"
            placeholder="Ex: 2"
            value={petData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Espécie</label>
          <select name="species" value={petData.species} onChange={handleChange} required>
            <option value="">Selecione</option>
            <option value="dog">Cachorro</option>
            <option value="cat">Gato</option>
            <option value="bird">Pássaro</option>
            <option value="other">Outro</option>
          </select>
        </div>

        <div className="form-group">
          <label>Raça</label>
          <input
            type="text"
            name="breed"
            placeholder="Ex: Poodle, Siamês..."
            value={petData.breed}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Peso (kg)</label>
          <input
            type="number"
            name="weight"
            placeholder="Ex: 4.5"
            value={petData.weight}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Foto do Pet</label>
          <input type="file" accept="image/*" name="photo" onChange={handleChange} />
        </div>

        <button type="submit" className="add-btn">
          Adicionar Pet 🐾
        </button>
      </form>
    </div>
  );
}
