// src/pages/Admin.js
import React, { useState, useEffect } from 'react';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // Liste des utilisateurs en attente de vérification
  const [users, setUsers] = useState([
    { id: 1, phone: '07080900', role: 'vendeur', verified: false, createdAt: '2025-04-05' }
  ]);

  // Simule des statistiques
  const stats = {
    totalUsers: 150,
    pendingVerifications: users.length,
    totalAnnonces: 320,
    revenue: "1 200 000 FCFA"
  };

  // Vérifie si l'admin est déjà connecté (token dans localStorage)
  useEffect(() => {
    const saved = localStorage.getItem('adminToken');
    if (saved) {
      setToken(saved);
      setIsAuthenticated(true);
    }
  }, []);

  // Gestion de la connexion
  const handleLogin = (e) => {
    e.preventDefault();
    if (phone === '01020304' && password === 'djassa2025') {
      const newToken = `admin_${Date.now()}`;
      localStorage.setItem('adminToken', newToken);
      setToken(newToken);
      setIsAuthenticated(true);
    } else {
      alert('❌ Identifiants incorrects');
    }
  };

  // Approuver un utilisateur
  const handleVerify = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    alert('✅ Utilisateur approuvé');
  };

  // Rejeter un utilisateur
  const handleReject = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    alert('❌ Utilisateur rejeté');
  };

  // Formulaire de connexion admin
  if (!isAuthenticated) {
    return (
      <div style={styles.login}>
        <h2>🔐 Connexion Admin</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="text"
            placeholder="Téléphone (01020304)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe (djassa2025)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.btn}>Se connecter</button>
        </form>
      </div>
    );
  }

  // Tableau de bord admin
  return (
    <div style={styles.container}>
      <h2>👮‍♂️ Tableau de Bord Admin</h2>

      {/* Statistiques */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>👤 {stats.totalUsers} Utilisateurs</div>
        <div style={styles.statCard}>📌 {stats.pendingVerifications} En attente</div>
        <div style={styles.statCard}>📢 {stats.totalAnnonces} Annonces</div>
        <div style={styles.statCard}>💰 {stats.revenue}</div>
      </div>

      <h3>📋 Modération des utilisateurs</h3>
      {users.length === 0 ? (
        <p>✅ Aucune demande en attente.</p>
      ) : (
        users.map(u => (
          <div key={u.id} style={styles.userCard}>
            <p><strong>{u.role}</strong> – {u.phone} – {u.createdAt}</p>
            <div>
              <button onClick={() => handleVerify(u.id)} style={styles.approve}>✅ Approuver</button>
              <button onClick={() => handleReject(u.id)} style={styles.reject}>❌ Rejeter</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// Styles globaux
const styles = {
  login: {
    padding: '40px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    maxWidth: '350px',
    margin: '20px auto'
  },
  input: {
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none'
  },
  btn: {
    backgroundColor: '#007A3D',
    color: 'white',
    border: 'none',
    padding: '12px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
    marginBottom: '20px'
  },
  statCard: {
    backgroundColor: '#f0f8ff',
    padding: '15px',
    borderRadius: '8px',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#007A3D',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
  },
  userCard: {
    border: '1px solid #eee',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    flexWrap: 'wrap',
    gap: '10px'
  },
  approve: {
    backgroundColor: '#007A3D',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  reject: {
    backgroundColor: '#d32f2f',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};