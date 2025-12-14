const router = require('express').Router();
const { register, login } = require('../controllers/authController');

// Ruta POST /register permite unui utilizator să se înregistreze
router.post('/register', register);

// Ruta POST /login permite unui utilizator să se autentifice
router.post('/login', login);

module.exports = router;
