// backend/server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// === 🔓 CORS : Autoriser le frontend React (http://localhost:3000) ===
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, x-auth-token');
  res.header('Access-Control-Allow-Credentials', true);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
});

// === 🔹 Autoriser les données JSON et servir les fichiers uploadés ===
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Pour accéder aux photos

// === 🔹 Créer les dossiers nécessaires ===
const uploadDir = './uploads';
const dirs = [
  uploadDir,
  `${uploadDir}/ids`,       // Pour les pièces d’identité
  `${uploadDir}/annonces`   // Pour les photos des annonces
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ \x1b[32mDossier créé :\x1b[0m ${dir}`);
  } else {
    console.log(`📁 \x1b[36mDossier existant :\x1b[0m ${dir}`);
  }
});

// === 🔹 Configuration de Multer (gestion des fichiers) ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'idFront' || file.fieldname === 'idBack') {
      cb(null, './uploads/ids');
    } else if (file.fieldname === 'photos') {
      cb(null, './uploads/annonces');
    } else {
      cb(null, './uploads');
    }
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.fieldname}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// === 🔹 Base de données temporaire ===
let users = [];
let annonces = [];
const sessions = {}; // Sessions admin

// === 🔐 Compte administrateur ===
const ADMIN_PHONE = "01020304";
const ADMIN_PASSWORD = "djassa2025";

// === 🔹 Middleware : Protection des routes admin ===
function isAdmin(req, res, next) {
  const token = req.headers['x-auth-token'];
  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Accès refusé. 🔑 Token d'authentification manquant."
    });
  }

  const session = sessions[token];
  if (!session) {
    return res.status(401).json({
      success: false,
      error: "Session invalide. ❌ Veuillez vous reconnecter."
    });
  }

  if (session.expires < Date.now()) {
    delete sessions[token];
    return res.status(401).json({
      success: false,
      error: "Session expirée. 🔐 Veuillez vous reconnecter."
    });
  }

  next();
}

// === 🔹 ROUTE : Inscription avec pièce d'identité ===
app.post('/api/register', upload.fields([
  { name: 'idFront', maxCount: 1 },
  { name: 'idBack', maxCount: 1 }
]), (req, res) => {
  const { phone, idNumber, role } = req.body;
  const idFront = req.files['idFront'] ? `/uploads/ids/${req.files['idFront'][0].filename}` : null;
  const idBack = req.files['idBack'] ? `/uploads/ids/${req.files['idBack'][0].filename}` : null;

  if ((role === 'vendeur' || role === 'prestataire') && (!idFront || !idBack)) {
    console.log(`🔴 \x1b[31mInscription refusée :\x1b[0m ${phone} (pièce manquante)`);
    return res.status(400).json({
      success: false,
      error: "Les vendeurs et prestataires doivent fournir les deux côtés de la pièce d'identité."
    });
  }

  const user = {
    id: Date.now(),
    phone,
    idNumber,
    role,
    idFront,
    idBack,
    verified: false,
    createdAt: new Date().toISOString()
  };

  users.push(user);
  console.log(`✅ \x1b[32mUtilisateur enregistré :\x1b[0m 📱 ${user.phone} | 🎯 ${user.role} | 🕒 ${new Date().toLocaleTimeString()}`);

  res.json({
    success: true,
    message: "Inscription envoyée. En attente de vérification.",
    userId: user.id
  });
});

// === 🔹 ROUTE : Publier une annonce ===
app.post('/api/annonce', upload.array('photos', 5), (req, res) => {
  const { title, category, price, location, description } = req.body;
  const photos = req.files.map(file => `/uploads/annonces/${file.filename}`);

  const annonce = {
    id: Date.now(),
    title,
    category,
    price: parseInt(price),
    location,
    description: description || "",
    photos,
    publishedAt: new Date().toISOString(),
    status: 'active'
  };

  annonces.push(annonce);
  console.log(`📌 \x1b[33mAnnonce publiée :\x1b[0m "${annonce.title}" | 💵 ${annonce.price} FCFA | 📍 ${annonce.location} | 🕒 ${new Date().toLocaleTimeString()}`);

  res.json({
    success: true,
    message: "Annonce publiée avec succès !",
    annonceId: annonce.id
  });
});

// === 🔹 ROUTE : Récupérer toutes les annonces ===
app.get('/api/annonces', (req, res) => {
  console.log(`🔍 \x1b[36m${annonces.length} annonce(s) demandée(s)\x1b[0m`);
  res.json(annonces);
});

// === 🔐 ROUTE : Connexion Admin ===
app.post('/api/admin/login', (req, res) => {
  const { phone, password } = req.body;

  if (phone === ADMIN_PHONE && password === ADMIN_PASSWORD) {
    const token = `admin_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    sessions[token] = { role: 'admin', expires: Date.now() + 3600000 }; // 1h

    console.log(`🔐 \x1b[32mADMIN CONNECTÉ :\x1b[0m ${phone} | Token: ${token} | 🕒 ${new Date().toLocaleTimeString()}`);
    return res.json({
      success: true,
      token,
      message: "Connexion admin réussie ! ✅"
    });
  }

  console.log(`🔴 \x1b[31mTentative de connexion admin échouée :\x1b[0m ${phone}`);
  res.status(401).json({
    success: false,
    error: "Identifiants incorrects. Accès refusé."
  });
});

// === 🔐 ROUTE : Test d'accès admin (protégée) ===
app.get('/api/admin/test', isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "✅ Accès autorisé. Vous êtes bien connecté en tant qu'administrateur.",
    usersPending: users.filter(u => !u.verified).length,
    totalAnnonces: annonces.length
  });
});

// === 🔹 ROUTE : Lister les utilisateurs non vérifiés (admin) ===
app.get('/api/admin/users', isAdmin, (req, res) => {
  const pendingUsers = users.filter(u => !u.verified);
  console.log(`📋 \x1b[35m${pendingUsers.length} utilisateur(s) en attente de vérification\x1b[0m`);
  res.json(pendingUsers);
});

// === 🌐 Page d'accueil du backend ===
app.get('/', (req, res) => {
  res.send(`
    <html>
    <head>
      <title>🚀 Djassa Virtuel - Backend</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, sans-serif; padding: 40px; background: #f7f9fc; color: #333; }
        h1 { color: #007A3D; }
        code { background: #eee; padding: 2px 6px; border-radius: 4px; }
        .api { margin: 15px 0; padding: 10px; background: #e8f5e8; border-left: 4px solid #007A3D; }
        .footer { margin-top: 50px; font-size: 0.9em; color: #666; }
      </style>
    </head>
    <body>
      <h1>🚀 Djassa Virtuel - Backend</h1>
      <p>✅ Serveur actif sur <code>http://localhost:5000</code></p>

      <h3>🔐 Authentification Admin</h3>
      <p>Téléphone: <code>${ADMIN_PHONE}</code> | Mot de passe: <code>djassa2025</code></p>

      <h3>🔧 APIs Disponibles</h3>

      <div class="api">
        <strong>POST /api/register</strong> → Inscription avec pièce d’identité
      </div>
      <div class="api">
        <strong>POST /api/annonce</strong> → Publier une annonce
      </div>
      <div class="api">
        <strong>GET /api/annonces</strong> → Lire toutes les annonces
      </div>
      <div class="api">
        <strong>POST /api/admin/login</strong> → Connexion admin
      </div>
      <div class="api">
        <strong>GET /api/admin/test</strong> → Route protégée (nécessite token)
      </div>
      <div class="api">
        <strong>GET /api/admin/users</strong> → Liste des utilisateurs à valider
      </div>

      <p>📁 Voir les fichiers uploadés : <a href="/uploads">/uploads</a></p>

      <div class="footer">
        <p><strong>Djassa Virtuel</strong> – Plateforme de confiance pour la Côte d'Ivoire</p>
        <p>🛠️ Backend Node.js + Express | MVP sécurisé</p>
      </div>
    </body>
    </html>
  `);
});

// === 🚀 Démarrer le serveur ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n`);
  console.log(`╔══════════════════════════════════════════════════╗`);
  console.log(`║ 🔥 \x1b[32mBACKEND LANCÉ AVEC SUCCÈS !\x1b[0m                 ║`);
  console.log(`╠══════════════════════════════════════════════════╣`);
  console.log(`║ 🌐 \x1b[36mhttp://localhost:${PORT}\x1b[0m                        ║`);
  console.log(`║ 📁 /uploads/ids       → Pièces d'identité         ║`);
  console.log(`║ 📁 /uploads/annonces → Photos des annonces        ║`);
  console.log(`║ 🔐 Admin: ${ADMIN_PHONE} / djassa2025             ║`);
  console.log(`╚══════════════════════════════════════════════════╝\n`);
});