// src/pages/Admin.js
import React, { useState, useEffect } from 'react';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([
    { id: 1, phone: '07080900', role: 'vendeur', verified: false, createdAt: '2025-04-05' }
  ]);

  // Simule des stats
  const stats = {
    totalUsers: 150,
    pendingVerifications: users.length,
    totalAnnonces: 320,
    revenue: "1 200 000 FCFA"
  };

  useEffect(() => {
    const saved = localStorage.getItem('adminToken');
    if (saved) {
      setToken(saved);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (e) => {
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

  const handleVerify = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    alert('✅ Utilisateur approuvé');
  };

  const handleReject = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    alert('❌ Utilisateur rejeté');
  };

  if (!isAuthenticated) {
    return (
      <div style={styles.login}>
        <h2>🔐 Connexion Admin</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <input placeholder="Téléphone" value={phone} onChange={e => setPhone(e.target.value)} style={styles.input} />
          <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} style={styles.input} />
          <button type="submit" style={styles.btn}>Se connecter</button>
        </form>
      </div>
    );
  }

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

const styles = {
  login: { padding: '40px', textAlign: 'center' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px', margin: '20px auto' },
  input: { padding: '10px', border: '1px solid #ddd', borderRadius: '6px' },
  btn: { backgroundColor: '#007A3D', color: 'white', border: 'none', padding: '12px', borderRadius: '6px', cursor: 'pointer' },
  container: { padding: '20px' },
  statsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' },
  statCard: { backgroundColor: '#f0f8ff', padding: '15px', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold', color: '#007A3D' },
  userCard: { border: '1px solid #eee', padding: '15px', borderRadius: '8px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  approve: { backgroundColor: '#007A3D', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' },
  reject: { backgroundColor: '#d32f2f', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }
};