// src/pages/DashboardProprietaire.js
import React, { useState } from 'react';

export default function DashboardProprietaire() {
  const [biens] = useState([
    {
      id: 1,
      nom: "Chambre à louer",
      ville: "Cocody",
      prix: "80 000 FCFA",
      statut: "Disponible"
    },
    {
      id: 2,
      nom: "Salle événementielle",
      ville: "Plateau",
      prix: "150 000 FCFA",
      statut: "Réservée"
    }
  ]);

  const [reservations] = useState([
    { id: 1, client: "Koffi Laurent", date: "2025-04-10", montant: "80 000 FCFA" }
  ]);

  const publier = () => {
    alert("✅ Annonce créée ! Elle sera examinée par l’admin.");
  };

  return (
    <div style={styles.container}>
      <h2>🏨 Tableau de bord Propriétaire</h2>
      <p style={styles.roleTag}>🔑 Vous êtes connecté comme <strong>Propriétaire</strong></p>

      <div style={styles.grid}>
        {/* Mes biens */}
        <div style={styles.card}>
          <h3>🏠 Mes biens</h3>
          {biens.map(b => (
            <div key={b.id} style={styles.item}>
              <p><strong>{b.nom}</strong> – {b.ville}</p>
              <p>{b.prix} • <span style={statusStyle[b.statut]}>{b.statut}</span></p>
            </div>
          ))}
          <button onClick={publier} style={styles.btn}>➕ Ajouter un bien</button>
        </div>

        {/* Réservations */}
        <div style={styles.card}>
          <h3>📅 Réservations</h3>
          {reservations.length === 0 ? (
            <p>Aucune réservation.</p>
          ) : (
            reservations.map(r => (
              <div key={r.id} style={styles.item}>
                <p>👤 {r.client}</p>
                <p>📅 {r.date} • 💵 {r.montant}</p>
              </div>
            ))
          )}
        </div>

        {/* Revenus */}
        <div style={styles.card}>
          <h3>💰 Revenus</h3>
          <p><strong>720 000 FCFA</strong> ce mois</p>
          <p>📈 +12% par rapport au mois dernier</p>
        </div>
      </div>
    </div>
  );
}

const statusStyle = {
  Disponible: { color: '#007A3D', fontWeight: 'bold' },
  Réservée: { color: '#E76F00', fontWeight: 'bold' }
};

const styles = {
  container: { padding: '20px', fontFamily: 'Arial, sans-serif' },
  roleTag: { fontSize: '14px', color: '#E76F00', marginBottom: '10px' },
  grid: { display: 'grid', gap: '20px', gridTemplateColumns: '1fr 1fr', marginTop: '20px' },
  card: { padding: '15px', border: '1px solid #eee', borderRadius: '12px', backgroundColor: 'white' },
  item: { marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px dashed #ddd' },
  btn: { backgroundColor: '#007A3D', color: 'white', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', width: '100%' }
};