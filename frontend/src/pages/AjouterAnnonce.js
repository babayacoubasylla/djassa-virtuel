// src/pages/AjouterAnnonce.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AjouterAnnonce() {
  const [data, setData] = useState({
    title: '',
    category: 'electronique',
    price: '',
    location: 'abidjan',
    description: ''
  });
  const [photos, setPhotos] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  // ✅ useEffect en haut, sans condition ni return avant
  useEffect(() => {
    const user = localStorage.getItem('djassa_user');
    
    if (!user) {
      // Si pas connecté, redirige vers connexion
      navigate('/connexion');
      return;
    }

    const parsed = JSON.parse(user);
    if (!parsed.verified) {
      alert("⚠️ Votre compte est en attente de vérification.");
      navigate('/');
      return;
    }

    // Si tout va bien, on est authentifié
    setIsAuthenticated(true);
  }, [navigate]);

  // ✅ Plus de useEffect après return → OK

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    photos.forEach(photo => formData.append('photos', photo));

    try {
      const res = await fetch('http://localhost:5000/api/annonce', {
        method: 'POST',
        body: formData
      });
      const result = await res.json();
      if (result.success) {
        alert('✅ Annonce publiée !');
        setData({
          title: '',
          category: 'electronique',
          price: '',
          location: 'abidjan',
          description: ''
        });
        setPhotos([]);
      } else {
        alert('❌ ' + (result.error || 'Erreur'));
      }
    } catch (err) {
      alert('❌ Erreur réseau');
    }
  };

  // ✅ Ne rend rien tant qu'on vérifie l’état
  if (isAuthenticated === null) {
    return <div style={styles.loading}>Chargement...</div>;
  }

  return (
    <div style={styles.container}>
      <h2>📌 Publier une annonce</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.group}>
          <label>Titre *</label>
          <input
            type="text"
            value={data.title}
            onChange={e => setData({ ...data, title: e.target.value })}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.group}>
          <label>Catégorie *</label>
          <select
            value={data.category}
            onChange={e => setData({ ...data, category: e.target.value })}
            style={styles.input}
          >
            <option value="electronique">Électronique</option>
            <option value="immobilier">Immobilier</option>
            <option value="vehicules">Véhicules</option>
            <option value="services">Services</option>
            <option value="mode">Mode</option>
            <option value="maison">Maison & Déco</option>
          </select>
        </div>
        <div style={styles.group}>
          <label>Prix (FCFA) *</label>
          <input
            type="number"
            value={data.price}
            onChange={e => setData({ ...data, price: e.target.value })}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.group}>
          <label>Ville *</label>
          <select
            value={data.location}
            onChange={e => setData({ ...data, location: e.target.value })}
            style={styles.input}
          >
            <option value="abidjan">Abidjan</option>
            <option value="bouake">Bouaké</option>
            <option value="yamoussoukro">Yamoussoukro</option>
            <option value="korhogo">Korhogo</option>
            <option value="sanpedro">San-Pédro</option>
          </select>
        </div>
        <div style={styles.group}>
          <label>Description</label>
          <textarea
            value={data.description}
            onChange={e => setData({ ...data, description: e.target.value })}
            rows="4"
            style={styles.input}
          ></textarea>
        </div>
        <div style={styles.group}>
          <label>Photos (max 3)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={e => setPhotos(Array.from(e.target.files))}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.btn}>Publier l’annonce</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial',
    maxWidth: '600px',
    margin: 'auto'
  },
  form: { marginTop: '20px' },
  group: { marginBottom: '15px' },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px'
  },
  btn: {
    backgroundColor: '#E76F00',
    color: 'white',
    border: 'none',
    padding: '14px 20px',
    fontSize: '16px',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '100%'
  },
  loading: {
    textAlign: 'center',
    padding: '40px',
    fontSize: '18px',
    color: '#555'
  }
};