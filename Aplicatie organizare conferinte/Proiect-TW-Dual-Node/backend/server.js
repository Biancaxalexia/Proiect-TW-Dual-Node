require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/db');
require('./src/models');

const authRoutes = require('./src/routes/authRoutes');
const conferenceRoutes = require('./src/routes/conferenceRoutes');
const submissionRoutes = require('./src/routes/submissionRoutes');
const reviewRoutes = require('./src/routes/reviewRoutes');

const app = express();

// Configurare middleware Express
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Rute API
app.use('/api/auth', authRoutes);
app.use('/api/conferences', conferenceRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/reviews', reviewRoutes);

// Endpoint pentru verificarea rulării serverului
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Serverul este pornit' });
});

// Configurarea middleware pentru erori
app.use((err, req, res, next) => {
  console.error('Eroare:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Eroare internă a serverului'
  });
});

const PORT = process.env.PORT;

// Testarea conexiunii la baza de date
sequelize.authenticate()
  .then(() => {
    console.log('Conexiunea la baza de date a fost stabilită cu succes');
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log('Tabelele bazei de date au fost sincronizate');
    
    app.listen(PORT, () => {
      console.log(`Serverul rulează pe port${PORT}`);
      console.log(`API valabil la http://localhost:${PORT}/api`);
    });
  })
  .catch((err) => {
    console.error('Nu se poate conecta la baza de date:', err);
    process.exit(1);
  });
