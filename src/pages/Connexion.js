// src/pages/Connexion.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';

export default function Connexion() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simule les comptes
    const users = {
      '01020304': { role: 'admin', password: 'djassa2025' },
      '07080900': { role: 'vendeur', password: '0900' },
      '05060708': { role: 'prestataire', password: '0708' },
      '09080706': { role: 'proprietaire', password: '0706' },
      '08070605': { role: 'acheteur', password: '0605' }
    };

    const user = users[phone];
    if (user && password === user.password) {
      const userData = { phone, role: user.role, verified: true };
      login(userData);
      navigate('/dashboard');
    } else {
      alert('❌ Numéro ou mot de passe incorrect');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>🔐 Connexion</h2>
        <p>Accédez à votre tableau de bord</p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.group}>
            <label>Téléphone</label>
            <input
              type="text"
              placeholder="Ex: 07080900"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.group}>
            <label>Mot de passe</label>
            <input
              type="password"
              placeholder="Derniers chiffres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.btn}>Se connecter</button>
        </form>
        <p style={styles.link}>
          <a href="/inscription" style={{ color: '#E76F00' }}>Pas encore inscrit ?</a>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' },
  form: { marginTop: '20px' },
  group: { marginBottom: '15px' },
  input: { width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px' },
  btn: { backgroundColor: '#007A3D', color: 'white', border: 'none', padding: '14px 20px', fontSize: '16px', borderRadius: '8px', cursor: 'pointer', width: '100%' },
  link: { fontSize: '0.9em', marginTop: '15px', textAlign: 'center' }
};