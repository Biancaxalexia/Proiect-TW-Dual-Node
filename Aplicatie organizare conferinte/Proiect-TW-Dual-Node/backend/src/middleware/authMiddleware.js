const jwt = require("jsonwebtoken"); 
const { User } = require("../models"); 

// Funcție care verifică autentificarea utilizatorului logat
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Nu a fost furnizat niciun token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalid sau expirat" });
  }
}

// Funcție care verifică tipul de rol al utilizatorului
function authenticateRole(roles) {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Nu a fost furnizat niciun token" });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ 
          message: "Acces interzis. Rol necesar: " + roles.join(" sau ") 
        });
      }

      next();
    } catch (err) {
      return res.status(401).json({ message: "Token invalid sau expirat" });
    }
  };
}

module.exports = { authenticate, authenticateRole };
