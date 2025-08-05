// src/context/UserContext.js
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('djassa_user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        console.error("Erreur lecture localStorage", e);
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    localStorage.setItem('djassa_user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('djassa_user');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {loading ? <div style={styles.loader}>Chargement...</div> : children}
    </UserContext.Provider>
  );
};

const styles = {
  loader: {
    textAlign: 'center',
    padding: '40px',
    fontSize: '18px',
    color: '#555',
    fontFamily: 'Arial, sans-serif'
  }
};