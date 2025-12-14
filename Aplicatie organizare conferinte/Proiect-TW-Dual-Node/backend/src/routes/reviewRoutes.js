const router = require('express').Router();

const { 
  getMyReviews, 
  submitReview,
  getReviewById 
} = require('../controllers/reviewController');

const { authenticateRole, authenticate } = require('../middleware/authMiddleware');

// Rute utilizate doar de recenzori
// Ruta GET /my-reviews returnează toate recenziile atribuite recenzorului logat
router.get('/my-reviews', authenticateRole(['reviewer']), getMyReviews);

// Ruta PUT /:reviewId/submit permite recenzorului să trimită rezultatul unei recenzii
router.put('/:reviewId/submit', authenticateRole(['reviewer']), submitReview);

// Rutele utilizate de orice utilizator logat
// Ruta GET /:id permite unui utilizator logat să vizualizeze detaliile unei recenzii
router.get('/:id', authenticate, getReviewById);

module.exports = router;
