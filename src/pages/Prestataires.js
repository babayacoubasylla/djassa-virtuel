// frontend/src/pages/Prestataires.js
import React, { useState } from 'react';

export default function Prestataires() {
  const [service, setService] = useState('');
  const [resultats] = useState([
    {
      id: 1,
      nom: "Koffi Laurent",
      metier: "Plombier",
      quartier: "Yopougon",
      note: 4.9,
      photo: "https://placehold.co/80x80/007A3D/white?text=👨‍🔧"
    },
    {
      id: 2,
      nom: "Adjoua Fatou",
      metier: "Coiffeuse",
      quartier: "Cocody",
      note: 4.8,
      photo: "https://placehold.co/80x80/E76F00/white?text=👩‍🦰"
    }
  ]);

  const contacter = (p) => {
    alert(`📞 Vous contactez ${p.nom} (${p.metier})\nQuartier : ${p.quartier}`);
  };

  const filtered = resultats.filter(p =>
    p.metier.toLowerCase().includes(service.toLowerCase()) ||
    p.nom.toLowerCase().includes(service.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h2>🔧 Trouver un Prestataire</h2>
      <p>Plombier, électricien, coiffeur, transporteur, etc.</p>

      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Ex: plombier, coiffeur, électricien..."
          value={service}
          onChange={(e) => setService(e.target.value)}
          style={styles.input}
        />
        <button style={styles.btn}>🔍 Rechercher</button>
      </div>

      <div style={styles.list}>
        {filtered.length === 0 ? (
          <p>Aucun prestataire trouvé.</p>
        ) : (
          filtered.map(p => (
            <div key={p.id} style={styles.card}>
              <img src={p.photo} alt={p.nom} style={styles.avatar} />
              <div style={styles.info}>
                <h3>{p.nom}</h3>
                <p>💼 {p.metier} | 📍 {p.quartier}</p>
                <p>⭐ {p.note}/5</p>
                <button onClick={() => contacter(p)} style={styles.contactBtn}>📞 Contacter</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '20px', fontFamily: 'Arial, sans-serif' },
  searchBox: { display: 'flex', gap: '10px', marginBottom: '20px' },
  input: { flex: 1, padding: '12px', border: '1px solid #ddd', borderRadius: '8px' },
  btn: { backgroundColor: '#007A3D', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '8px', cursor: 'pointer' },
  list: { display: 'flex', flexDirection: 'column', gap: '15px' },
  card: { display: 'flex', gap: '15px', padding: '15px', border: '1px solid #eee', borderRadius: '12px', backgroundColor: 'white', alignItems: 'center' },
  avatar: { width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' },
  info: { flex: 1 },
  contactBtn: { backgroundColor: '#E76F00', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '6px', cursor: 'pointer' }
};