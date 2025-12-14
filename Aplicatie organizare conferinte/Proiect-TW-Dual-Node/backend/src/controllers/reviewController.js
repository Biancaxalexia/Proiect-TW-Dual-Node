// Controller pentru gestionarea recenziilor
// Permite recenzorilor să vadă și să trimită recenzii pentru lucrările atribuite

const { Review, Submission, User, Conference } = require('../models');

// GET recenziile mele
exports.getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { reviewerId: req.user.id }, 
      include: [
        {
          model: Submission,
          as: 'submission', 
          include: [
            {
              model: User,
              as: 'author',
              attributes: ['id', 'name', 'email']
            },
            {
              model: Conference,
              as: 'conference', 
              attributes: ['id', 'title', 'description', 'date']
            }
          ]
        }
      ],
      order: [['createdAt', 'DESC']] 
    });
    
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Trimiterea recenziei
exports.submitReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { comment, score } = req.body;
    
    const review = await Review.findByPk(reviewId);
    if (!review) {
      return res.status(404).json({ error: 'Recenzia nu a fost găsită' });
    }
    if (review.reviewerId !== req.user.id) {
      return res.status(403).json({ error: 'Poți trimite doar propriile tale recenzii' });
    }
    if (review.status === 'completed') {
      return res.status(400).json({ error: 'Această recenzie a fost deja trimisă' });
    }
    if (score < 1 || score > 10) {
      return res.status(400).json({ error: 'Nota trebuie să fie între 1 și 10' });
    }
    review.comment = comment;
    review.score = score;
    review.status = 'completed';
    await review.save();

    const submission = await Submission.findByPk(review.SubmissionId);
    if (submission && submission.status === 'pending') {
      submission.status = 'under_review';
      await submission.save();
    }
    
    res.json({
      message: 'Recenzie trimisă cu succes',
      review
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET recenzie by ID
exports.getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByPk(id, {
      include: [
        {
          model: Submission,
          as: 'submission',
          include: [
            {
              model: User,
              as: 'author',
              attributes: ['id', 'name', 'email']
            },
            {
              model: Conference,
              as: 'conference',
              attributes: ['id', 'title', 'description', 'date']
            }
          ]
        },
        {
          model: User,
          as: 'reviewer', 
          attributes: ['id', 'name', 'email']
        }
      ]
    });
    
    if (!review) {
      return res.status(404).json({ message: 'Recenzia nu a fost găsită' });
    }
    
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
