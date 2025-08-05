// frontend/src/pages/Hotels.js
import React, { useState } from 'react';

export default function Hotels() {
  const [ville, setVille] = useState('Abidjan');
  const [date, setDate] = useState('');
  const [resultats] = useState([
    {
      id: 1,
      nom: "Hôtel Ivoire",
      ville: "Abidjan",
      prix: "120 000 FCFA",
      note: 4.7,
      photo: "https://placehold.co/300x200/007A3D/white?text=Hôtel+Ivoire"
    },
    {
      id: 2,
      nom: "Résidence Cocody",
      ville: "Abidjan",
      prix: "80 000 FCFA",
      note: 4.5,
      photo: "https://placehold.co/300x200/E76F00/white?text=Résidence+Cocody"
    }
  ]);

  const reserver = (hotel) => {
    alert(`✅ Demande de réservation envoyée pour : ${hotel.nom}\nDate : ${date || 'Non spécifiée'}`);
  };

  // Toutes les villes de Côte d'Ivoire
  const villes = [
    'Abidjan', 'Bouaké', 'Yamoussoukro', 'Daloa', 'Korhogo', 'Gagnoa', 'San-Pédro',
    'Man', 'Agboville', 'Divo', 'Odienne', 'Toumodi', 'Ferkessédougou', 'Sassandra'
  ];

  return (
    <div style={styles.container}>
      <h2>🏨 Hôtels & Résidences</h2>
      <p>Réservez une chambre, un bureau ou un lieu événementiel.</p>

      <div style={styles.filters}>
        <select value={ville} onChange={(e) => setVille(e.target.value)} style={styles.input}>
          {villes.map(v => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={styles.input}
        />
        <button style={styles.btn}>🔍 Rechercher</button>
      </div>

      <div style={styles.list}>
        {resultats.filter(h => h.ville === ville).map(h => (
          <div key={h.id} style={styles.card}>
            <img src={h.photo} alt={h.nom} style={styles.photo} />
            <div style={styles.info}>
              <h3>{h.nom}</h3>
              <p>📍 {h.ville} | 💵 {h.prix}/nuit</p>
              <p>⭐ {h.note}/5</p>
              <button onClick={() => reserver(h)} style={styles.bookBtn}>📅 Réserver</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '20px', fontFamily: 'Arial, sans-serif' },
  filters: { display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' },
  input: { padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px' },
  btn: { backgroundColor: '#007A3D', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '8px', cursor: 'pointer' },
  list: { display: 'flex', flexDirection: 'column', gap: '20px' },
  card: { display: 'flex', gap: '15px', padding: '15px', border: '1px solid #eee', borderRadius: '12px', backgroundColor: 'white' },
  photo: { width: '150px', height: '100px', objectFit: 'cover', borderRadius: '8px' },
  info: { flex: 1 },
  bookBtn: { backgroundColor: '#E76F00', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '6px', cursor: 'pointer', marginTop: '10px' }
};