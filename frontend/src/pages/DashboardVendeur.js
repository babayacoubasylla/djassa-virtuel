// src/pages/DashboardVendeur.js
import React, { useState } from 'react';

export default function DashboardVendeur() {
  const [annonces] = useState([
    { id: 1, titre: "Téléphone Samsung", prix: "120 000 FCFA", vues: 42 },
    { id: 2, titre: "Chambre à louer", prix: "250 000 FCFA", vues: 18 }
  ]);

  const publier = () => {
    alert("✅ Annonce soumise ! En attente de validation.");
  };

  return (
    <div style={styles.container}>
      <h2>📌 Tableau de bord Vendeur</h2>
      <p style={styles.role}>🔑 Connecté comme <strong>Vendeur</strong></p>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>📊 Annonces actives ({annonces.length})</h3>
          {annonces.map(a => (
            <div key={a.id} style={styles.item}>
              <p><strong>{a.titre}</strong> – {a.prix}</p>
              <p>👁️ {a.vues} vues</p>
            </div>
          ))}
          <button onClick={publier} style={styles.btn}>➕ Publier une annonce</button>
        </div>

        <div style={styles.card}>
          <h3>📩 Messages</h3>
          <p>3 nouveaux messages non lus</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '20px', fontFamily: 'Arial, sans-serif' },
  role: { fontSize: '14px', color: '#E76F00', marginBottom: '10px' },
  grid: { display: 'grid', gap: '20px', gridTemplateColumns: '1fr 1fr', marginTop: '20px' },
  card: { padding: '15px', border: '1px solid #eee', borderRadius: '12px', backgroundColor: 'white' },
  item: { marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px dashed #ddd' },
  btn: { backgroundColor: '#007A3D', color: 'white', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', width: '100%' }
};