import React from "react";
import "./Home.css";
import dogImage from "../assets/react.svg"; // troque aqui pela imagem real do pet

export default function Home() {
  return (
    <div className="home-container">
      {/* ====== HEADER ====== */}
      <header className="header">
        <h2 className="logo">pawgress</h2>
        <span className="pet-name">Pibble 🐶, 2</span>
      </header>

      {/* ====== PET CARD ====== */}
      <div className="card">
        <img src={dogImage} alt="Pet" className="pet-photo" />

        <div className="card-info">
          <h3>✨ Health Overview: Great Pawgress!</h3>
          <ul>
            <li>
              🩺 <strong>Last Check-up:</strong> Dr. Evans (Vetamin Clinic) — 10/20/2025
            </li>
            <li>
              ⚖️ <strong>Weight:</strong> 4.5 kg (on target for age)
            </li>
            <li>
              💨 <strong>Energy Level:</strong> High — loves walks & play!
            </li>
          </ul>

          <h4 className="upcoming">📅 Upcoming</h4>
          <ul>
            <li>💉 Vaccine Booster — <strong>Due 11/25/2025</strong></li>
            <li>🦟 Flea/Tick Prevention — <strong>Due 11/01/2025</strong></li>
          </ul>
        </div>

        <button className="details-btn" title="View Details">
          👁️
        </button>
      </div>

      {/* ====== FLOATING BUTTON ====== */}
      <button className="Add.newpet" title="Add New Pet">
        +
      </button>
    </div>
  );
}
