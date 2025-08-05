// src/pages/Comparateur.js
import React, { useState } from 'react';

export default function Comparateur() {
  const [produit, setProduit] = useState('');
  const [resultats, setResultats] = useState([]);

  const comparer = () => {
    if (!produit.trim()) return;

    const data = [
      {
        id: 1,
        nom: produit,
        prix: 750,
        lieu: 'Carrefour Abidjan',
        type: 'Supermarché',
        disponibilite: 'En stock',
        note: 4.8
      },
      {
        id: 2,
        nom: produit,
        prix: 800,
        lieu: 'Boutique de Cocody',
        type: 'Boutique locale',
        disponibilite: 'En stock',
        note: 4.5
      },
      {
        id: 3,
        nom: produit,
        prix: 700,
        lieu: 'Vendeur sur Djassa',
        type: 'Particulier',
        disponibilite: '1 disponible',
        note: 4.9
      }
    ];
    setResultats(data);
  };

  const contacter = (item) => {
    alert(`📞 Vous contactez le vendeur pour : ${item.nom}\nLieu : ${item.lieu}\nPrix : ${item.prix} FCFA`);
  };

  return (
    <div style={styles.container}>
      <h2>🛒 Comparateur de Prix</h2>
      <p>Comparez les prix des produits dans les supermarchés, boutiques et chez les particuliers.</p>

      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Ex: savon Sommière, riz, téléphone..."
          value={produit}
          onChange={(e) => setProduit(e.target.value)}
          style={styles.input}
        />
        <button onClick={comparer} style={styles.btn}>🔍 Comparer</button>
      </div>

      {resultats.length > 0 && (
        <div style={styles.results}>
          <h3>🎯 Résultats pour "{produit}"</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Produit</th>
                <th>Prix (FCFA)</th>
                <th>Lieu</th>
                <th>Type</th>
                <th>Note</th>
                <th>Dispo</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {resultats.map(item => (
                <tr key={item.id}>
                  <td>{item.nom}</td>
                  <td><strong>{item.prix}</strong></td>
                  <td>{item.lieu}</td>
                  <td><span style={badgeStyle[item.type]}>{item.type}</span></td>
                  <td>⭐ {item.note}</td>
                  <td>{item.disponibilite}</td>
                  <td>
                    <button 
                      style={styles.contactBtn} 
                      onClick={() => contacter(item)}
                    >
                      💬 Contacter
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  searchBox: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px'
  },
  input: {
    flex: 1,
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px'
  },
  btn: {
    backgroundColor: '#007A3D',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  results: {
    marginTop: '20px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px'
  },
  contactBtn: {
    backgroundColor: '#E76F00',
    color: 'white',
    border: 'none',
    padding: '6px 10px',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};

const badgeStyle = {
  'Supermarché': { 
    backgroundColor: '#007A3D', 
    color: 'white', 
    padding: '4px 8px', 
    borderRadius: '4px', 
    fontSize: '0.8em' 
  },
  'Boutique locale': { 
    backgroundColor: '#1976D2', 
    color: 'white', 
    padding: '4px 8px', 
    borderRadius: '4px', 
    fontSize: '0.8em' 
  },
  'Particulier': { 
    backgroundColor: '#FFA000', 
    color: 'white', 
    padding: '4px 8px', 
    borderRadius: '4px', 
    fontSize: '0.8em' 
  }
};