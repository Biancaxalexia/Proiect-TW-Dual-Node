const router = require('express').Router();
const path = require("path"); 
const fs = require("fs"); 
const { Submission } = require("../models"); 

const { 
  submitArticle, 
  getMySubmissions, 
  submitRevision,
  getSubmissionById 
} = require('../controllers/submissionController');

const { authenticateRole, authenticate } = require('../middleware/authMiddleware');

const upload = require('../middleware/upload');

// Rute utilizate doar de autori
// Ruta POST / permite autorului să trimită o lucrare
router.post('/', authenticateRole(['author']), upload.single('file'), submitArticle);

// Ruta GET /my-submissionsnreturnează toate lucrările trimise de autorul logat
router.get('/my-submissions', authenticateRole(['author']), getMySubmissions);

// Ruta POST /:submissionId/revision permite autorului să trimită o revizie pentru o lucrare existentă
router.post('/:submissionId/revision', authenticateRole(['author']), upload.single('file'), submitRevision);

// Rută GET /:id/download permite descărcarea fișierului asociat unei lucrări
router.get("/:id/download", authenticate, async (req, res) => {
  try {
    const submission = await Submission.findByPk(req.params.id);

    // Verificăm dacă lucrarea există și are fișier asociat
    if (!submission || !submission.file) {
      return res.status(404).json({ message: "Nu există fișier" });
    }

    // Construim calea către fișierul din folderul uploads
    const filePath = path.join(__dirname,"../uploads",submission.file);

    // Verificăm dacă fișierul există fizic pe server
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "Fișierul nu există pe server" });
    }

    // Trimitem fișierul spre descărcare
    res.download(filePath);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rute publice, respectic pentru utilizatorii logați
// Ruta GET /:id permite oricărui utilizator logat să poată vizualiza o lucrare specifică
router.get('/:id', authenticate, getSubmissionById);

module.exports = router;
