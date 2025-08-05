// src/pages/Inscription.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Inscription() {
  const [role, setRole] = useState('acheteur');
  const [phone, setPhone] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [idFront, setIdFront] = useState(null);
  const [idBack, setIdBack] = useState(null);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (role !== 'acheteur' && (!idFront || !idBack)) {
      alert("Vendeur, prestataire ou propriétaire : vous devez joindre recto ET verso.");
      return;
    }

    const formData = new FormData();
    formData.append('phone', phone);
    formData.append('role', role);
    formData.append('idNumber', idNumber);
    if (idFront) formData.append('idFront', idFront);
    if (idBack) formData.append('idBack', idBack);

    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        body: formData
      });

      const result = await res.json();

      if (result.success) {
        alert("✅ Inscription envoyée ! En attente de vérification par l'admin.");
        navigate('/connexion');
      } else {
        alert("❌ Erreur : " + result.error);
      }
    } catch (err) {
      alert("❌ Impossible de se connecter au serveur. Vérifiez que le backend est lancé.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>📝 Inscription sur Djassa Virtuel</h2>
        <p><small>Rejoignez la communauté de confiance</small></p>

        {step === 1 && (
          <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} style={styles.form}>
            <div style={styles.group}>
              <label>Rôle</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} style={styles.input}>
                <option value="acheteur">Acheteur</option>
                <option value="vendeur">Vendeur</option>
                <option value="prestataire">Prestataire</option>
                <option value="proprietaire">Propriétaire d'hôtel/résidence</option>
              </select>
            </div>

            <div style={styles.group}>
              <label>Téléphone (WhatsApp)</label>
              <input
                type="tel"
                placeholder="Ex: 07080900"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                style={styles.input}
              />
            </div>

            {(role !== 'acheteur') && (
              <div style={styles.group}>
                <label>Numéro de pièce d'identité</label>
                <input
                  type="text"
                  placeholder="CNI, passeport, etc."
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  required
                  style={styles.input}
                />
              </div>
            )}

            <button type="submit" style={styles.btn}>Continuer</button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} style={styles.form}>
            <h3>📤 Joindre votre pièce d'identité</h3>
            <p><small>Photo claire, bien éclairée</small></p>

            <div style={styles.uploadGroup}>
              <div>
                <label>Photo recto</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setIdFront(e.target.files[0])}
                  required
                />
              </div>
              <div>
                <label>Photo verso</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setIdBack(e.target.files[0])}
                  required
                />
              </div>
            </div>

            <div style={styles.info}>
              🔐 Vos documents sont chiffrés et visibles uniquement par l'équipe de modération.
            </div>

            <button type="submit" style={styles.btnSuccess}>Envoyer pour vérification</button>
            <button type="button" onClick={() => setStep(1)} style={styles.btnSecondary}>
              Retour
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    maxWidth: '500px',
    margin: '40px auto',
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
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
  uploadGroup: {
    display: 'grid',
    gap: '15px',
  },
  info: {
    fontSize: '0.9em',
    color: '#666',
    margin: '15px 0'
  },
  btn: {
    backgroundColor: '#E76F00',
    color: 'white',
    border: 'none',
    padding: '14px 20px',
    fontSize: '16px',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '10px'
  },
  btnSuccess: {
    backgroundColor: '#007A3D',
    color: 'white',
    border: 'none',
    padding: '14px 20px',
    fontSize: '16px',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '10px'
  },
  btnSecondary: {
    backgroundColor: '#f1f1f1',
    color: '#333',
    border: '1px solid #ddd',
    padding: '12px',
    borderRadius: '8px',
    width: '100%',
    marginTop: '10px'
  }
};