// frontend/src/pages/Dashboard.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('djassa_user');
    if (!user) return navigate('/connexion');

    const { role, verified } = JSON.parse(user);

    if (!verified) {
      alert("⚠️ Votre compte est en attente de vérification.");
      return navigate('/');
    }

    // Redirection selon le rôle
    switch (role) {
      case 'acheteur':
        navigate('/dashboard/acheteur');
        break;
      case 'vendeur':
        navigate('/dashboard/vendeur');
        break;
      case 'prestataire':
        navigate('/dashboard/prestataire');
        break;
      case 'proprietaire':
        navigate('/dashboard/proprietaire');
        break;
      case 'admin':
        navigate('/admin');
        break;
      default:
        navigate('/');
    }
  }, [navigate]);

  return <div>Chargement...</div>;
}