const router = require('express').Router();

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

// Rute publice, respectic pentru utilizatorii logați
// Ruta GET /:id permite oricărui utilizator logat să poată vizualiza o lucrare specifică
router.get('/:id', authenticate, getSubmissionById);

module.exports = router;
