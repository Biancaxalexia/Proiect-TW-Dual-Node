// Controller care gestionează înregistrările și autentificările utilizatorilor
const bcrypt = require('bcryptjs');        
const jwt = require('jsonwebtoken');       
const { User } = require('../models');     

// Înregistrează un nou utilizator
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'Toate câmpurile sunt obligatorii' });
    }
    if (!['organizer', 'author', 'reviewer'].includes(role)) {
      return res.status(400).json({ error: 'Rol invalid. Trebuie să fie organizator, autor sau recenzor' });
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Un utilizator cu acest email deja există' });
    }
    const hashedPassword = await bcrypt.hash(password, 10); 
    const user = await User.create({ 
      name, 
      email, 
      password: hashedPassword, 
      role 
    });
    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };
    
    res.status(201).json({
      message: 'Utilizator înregistrat cu succes',
      user: userResponse
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Autentificarea unui utilizator existent
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email și parola sunt obligatorii' });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Email sau parolă invalidă' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Email sau parolă invalidă' });
    }
    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.name },  
      process.env.JWT_SECRET,                            
      { expiresIn: '7d' }                                
    );
    
    res.json({
      message: 'Logat cu succes',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
