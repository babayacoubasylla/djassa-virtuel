// frontend/src/pages/Annonces.js
export default function Annonces() {
  const annonces = [
    {
      id: 1,
      title: "Téléphone Samsung S10",
      price: "120 000 FCFA",
      location: "Cocody, Abidjan",
      category: "Électronique",
      photo: "https://placehold.co/300x200/orange/white?text=Samsung+S10",
      phone: "07080900"
    },
    {
      id: 2,
      title: "Chambre à louer",
      price: "250 000 FCFA/mois",
      location: "Yopougon",
      category: "Immobilier",
      photo: "https://placehold.co/300x200/green/white?text=Chambre+à+Louer",
      phone: "05060708"
    }
  ];

  const contacter = (annonce) => {
    alert(`📞 Contacter ${annonce.title}\nAppeler ou WhatsApp : ${annonce.phone}`);
  };

  return (
    <div style={styles.container}>
      <h2>🔍 Toutes les annonces</h2>
      <div style={styles.list}>
        {annonces.map(annonce => (
          <div key={annonce.id} style={styles.card}>
            <img src={annonce.photo} alt={annonce.title} style={styles.photo} />
            <div style={styles.info}>
              <h3>{annonce.title}</h3>
              <p><strong>{annonce.price}</strong></p>
              <p>{annonce.location}</p>
              <span style={styles.badge}>{annonce.category}</span>
              <button
                onClick={() => contacter(annonce)}
                style={styles.contactBtn}
              >
                💬 Contacter
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '20px', fontFamily: 'Arial' },
  list: { display: 'grid', gap: '20px', marginTop: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' },
  card: {
    border: '1px solid #eee',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  photo: { width: '100%', height: '200px', objectFit: 'cover' },
  info: { padding: '15px' },
  badge: {
    backgroundColor: '#007A3D',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '0.8em'
  },
  contactBtn: {
    backgroundColor: '#E76F00',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '10px',
    width: '100%'
  }
};