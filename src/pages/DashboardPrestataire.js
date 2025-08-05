// frontend/src/pages/DashboardPrestataire.js
export default function DashboardPrestataire() {
  return (
    <div style={styles.container}>
      <h2>🔧 Tableau de bord Prestataire</h2>
      <div style={styles.card}>
        <h3>📅 Disponibilité</h3>
        <p>• Aujourd’hui : 2 créneaux libres</p>
      </div>
      <div style={styles.card}>
        <h3>💼 Devis envoyés</h3>
        <p>3 en attente</p>
      </div>
      <div style={styles.card}>
        <h3>⭐ Réputation</h3>
        <p>4.9/5 • 24 avis</p>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '20px', fontFamily: 'Arial' },
  card: { padding: '15px', border: '1px solid #eee', borderRadius: '8px', marginBottom: '15px' }
};