// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { UserContext } from './context/UserContext';

// === Pages ===
import Annonces from './pages/Annonces';
import AjouterAnnonce from './pages/AjouterAnnonce';
import Comparateur from './pages/Comparateur';
import Hotels from './pages/Hotels';
import Prestataires from './pages/Prestataires';
import Chat from './pages/Chat';
import Admin from './pages/Admin';
import Profil from './pages/Profil';
import Connexion from './pages/Connexion';
import Dashboard from './pages/Dashboard';
import DashboardAcheteur from './pages/DashboardAcheteur';
import DashboardVendeur from './pages/DashboardVendeur';
import DashboardPrestataire from './pages/DashboardPrestataire';
import DashboardProprietaire from './pages/DashboardProprietaire';

import './App.css';

function App() {
  const { user, logout, loading } = useContext(UserContext);

  // Affiche un loader pendant le chargement
  if (loading) {
    return <div style={styles.loader}>Chargement...</div>;
  }

  return (
    <Router>
      <div className="App">
        {/* === BARRE DE NAVIGATION === */}
        <nav style={styles.nav}>
          <Link to="/" style={styles.logo}>
            Djassa Virtuel
          </Link>
          <div style={styles.navLinks}>
            <Link to="/" style={styles.navItem}>🏠 Annonces</Link>
            <Link to="/comparateur" style={styles.navItem}>🛒 Comparateur</Link>
            <Link to="/hotels" style={styles.navItem}>🏨 Hôtels</Link>
            <Link to="/prestataires" style={styles.navItem}>🔧 Prestataires</Link>
            <Link to="/ajouter" style={styles.publishButton}>➕ Publier</Link>
            <Link to="/chat" style={styles.navItem}>💬 Chat</Link>
            {user && <Link to="/profil" style={styles.navItem}>👤 Profil</Link>}

            {/* === Connexion / Déconnexion === */}
            {!user ? (
              <Link to="/connexion" style={styles.navItem}>🔑 Connexion</Link>
            ) : (
              <div style={styles.userMenu}>
                <span style={styles.userName}>
                  👋 {roleLabels[user.role] || 'Utilisateur'}
                </span>
                <button onClick={logout} style={styles.logoutBtn}>
                  🔴 Déconnexion
                </button>
              </div>
            )}

            {/* === Accès Admin uniquement === */}
            {user?.role === 'admin' && (
              <Link to="/admin" style={styles.adminLink}>👮 Admin</Link>
            )}
          </div>
        </nav>

        {/* === CONTENU DES PAGES === */}
        <div style={styles.page}>
          <Routes>
            <Route path="/" element={<Annonces />} />
            <Route path="/ajouter" element={<AjouterAnnonce />} />
            <Route path="/comparateur" element={<Comparateur />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/prestataires" element={<Prestataires />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/acheteur" element={<DashboardAcheteur />} />
            <Route path="/dashboard/vendeur" element={<DashboardVendeur />} />
            <Route path="/dashboard/prestataire" element={<DashboardPrestataire />} />
            <Route path="/dashboard/proprietaire" element={<DashboardProprietaire />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </div>
    </Router>
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

// === 🎨 STYLES GLOBAUX ===
const styles = {
  nav: {
    backgroundColor: '#007A3D',
    padding: '15px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  logo: {
    fontSize: '1.5em',
    fontWeight: 'bold',
    color: 'white',
    textDecoration: 'none',
    fontFamily: 'Arial, sans-serif'
  },
  navLinks: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center'
  },
  navItem: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '14px',
    padding: '8px 12px',
    borderRadius: '6px',
    transition: 'background 0.3s'
  },
  publishButton: {
    backgroundColor: '#E76F00',
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '14px',
    padding: '10px 16px',
    borderRadius: '20px',
    boxShadow: '0 2px 6px rgba(231, 111, 0, 0.3)',
    transition: 'background 0.3s'
  },
  adminLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '13px',
    padding: '6px 10px',
    borderRadius: '6px',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    transition: 'all 0.3s'
  },
  userMenu: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    fontSize: '14px'
  },
  userName: {
    color: '#fff',
    fontWeight: '500'
  },
  logoutBtn: {
    backgroundColor: '#d32f2f',
    color: 'white',
    border: 'none',
    padding: '6px 10px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px'
  },
  page: {
    minHeight: 'calc(100vh - 80px)',
    marginTop: '20px',
    padding: '0 20px',
    fontFamily: 'Arial, sans-serif'
  },
  loader: {
    textAlign: 'center',
    padding: '40px',
    fontSize: '18px',
    color: '#555',
    fontFamily: 'Arial, sans-serif'
  }
};

export default App;