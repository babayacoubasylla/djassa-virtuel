// src/components/Paiement.js
import React, { useState } from 'react';

export default function Paiement({ montant, service }) {
  const [methode, setMethode] = useState('');
  const [numero, setNumero] = useState('');

  const payer = () => {
    if (!methode || !numero) {
      alert("Veuillez remplir tous les champs");
      return;
    }
    alert(`📞 Paiement de ${montant} FCFA lancé via ${methode} au numéro ${numero}\nService : ${service}`);
  };

  return (
    <div style={styles.container}>
      <h3>💳 Payer via Mobile Money</h3>
      <select value={methode} onChange={e => setMethode(e.target.value)} style={styles.input}>
        <option value="">Choisir</option>
        <option value="Orange Money">Orange Money</option>
        <option value="MTN Mobile Money">MTN Mobile Money</option>
      </select>
      <input
        type="text"
        placeholder="Votre numéro (ex: 07080900)"
        value={numero}
        onChange={e => setNumero(e.target.value)}
        style={styles.input}
      />
      <button onClick={payer} style={styles.btn}>Payer {montant} FCFA</button>
    </div>
  );
}

const styles = {
  container: { padding: '20px', fontFamily: 'Arial, sans-serif' },
  input: { display: 'block', width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '6px' },
  btn: { backgroundColor: '#E76F00', color: 'white', border: 'none', padding: '12px', borderRadius: '6px', cursor: 'pointer', width: '100%' }
};