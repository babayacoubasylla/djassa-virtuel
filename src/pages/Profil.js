import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Profil() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  // Si pas de user, redirige vers connexion
  if (!user) {
    navigate('/connexion');
    return null;
  }

  const handleLogout = () => {
    if (window.confirm("Se déconnecter ?")) {
      logout();
      navigate('/connexion');
    }
  };

  return (
    <div style={styles.container}>
      <h2>👤 Mon Profil</h2>

      <div style={styles.card}>
        <h3>Informations</h3>
        <p><strong>📞 Téléphone :</strong> {user.phone}</p>
        <p><strong>🎯 Rôle :</strong> <span style={styles.badge}>{roleLabels[user.role]}</span></p>
        <p><strong>✅ Statut :</strong> <span style={styles.badgeSuccess}>Vérifié</span></p>
      </div>

      <div style={styles.card}>
        <h3>🔐 Sécurité</h3>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          🔴 Déconnexion
        </button>
      </div>
    </div>
  );
}

// Traduction des rôles
const roleLabels = {
  acheteur: 'Acheteur',
  vendeur: 'Vendeur',
  prestataire: 'Prestataire',
  proprietaire: 'Propriétaire',
  admin: 'Admin'
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    margin: 'auto'
  },
  card: {
    padding: '15px',
    border: '1px solid #eee',
    borderRadius: '12px',
    backgroundColor: 'white',
    marginBottom: '15px'
  },
  badge: {
    backgroundColor: '#E76F00',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '0.9em'
  },
  badgeSuccess: {
    backgroundColor: '#007A3D',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '0.9em'
  },
  logoutBtn: {
    backgroundColor: '#d32f2f',
    color: 'white',
    border: 'none',
    padding: '12px',
    borderRadius: '6px',
    cursor: 'pointer',
    width: '100%'
  }
};