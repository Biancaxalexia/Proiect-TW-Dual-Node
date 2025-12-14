const router = require('express').Router();

const { 
  createConference, 
  getConferences, 
  getConferenceById,
  getConferenceSubmissions 
} = require('../controllers/conferenceController');

const { authenticateRole, authenticate } = require('../middleware/authMiddleware');

// Rute publice pe care orice utilizator le poate utiliza
// Ruta GET / returnează lista tuturor conferințelor
router.get('/', getConferences); 

// Ruta GET /:id returnează detalii despre o conferință specifică
router.get('/:id', getConferenceById);

// Rute utilizate doar de organizatori
// Ruta POST / permite unui organizator să creeze o nouă conferință
router.post('/', authenticateRole(['organizer']), createConference);

// Ruta GET /:id/submissions permite organizatorului să vadă toate lucrările trimise pentru conferința sa
router.get('/:id/submissions', authenticateRole(['organizer']), getConferenceSubmissions);

module.exports = router;
