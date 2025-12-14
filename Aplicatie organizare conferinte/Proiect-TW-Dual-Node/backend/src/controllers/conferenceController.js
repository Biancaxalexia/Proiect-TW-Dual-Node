// Controller pentru gestionarea conferințelor - crearea, listarea și vizualizarea conferințelor și lucrărilor asociate
const { Conference, Submission, Review, User } = require('../models');

// Crearea unei conferințe noi
// Doar organizatorii pot crea conferințe
exports.createConference = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const conference = await Conference.create({
      title,
      description,
      date,
      organizerId: req.user.id
    });
    
    res.status(201).json({
      message: 'Conferință creată cu succes',
      conference
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET toate conferințele
// Endpoint pentru listarea tuturor conferințelor
exports.getConferences = async (req, res) => {
  try {
    const conferences = await Conference.findAll({
      include: [{
        model: User,
        as: 'organizer',
        attributes: ['id', 'name', 'email'] 
      }],
      order: [['date', 'DESC']] 
    });
    res.json(conferences);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET conferință by ID
exports.getConferenceById = async (req, res) => {
  try {
    const { id } = req.params;
    const conference = await Conference.findByPk(id, {
      include: [
        {
          model: User,
          as: 'organizer',
          attributes: ['id', 'name', 'email']
        },
        {
          model: Submission,
          as: 'submissions',
          include: [
            {
              model: User,
              as: 'author',
              attributes: ['id', 'name', 'email']
            },
            {
              model: Review,
              as: 'reviews',
              include: [{
                model: User,
                as: 'reviewer',
                attributes: ['id', 'name', 'email']
              }]
            }
          ]
        }
      ]
    });
    
    if (!conference) {
      return res.status(404).json({ message: 'Conferința nu a fost găsită' });
    }
    
    res.json(conference);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET toate lucrările trimise pentru o conferință
// Organizatorul poate vizualiza toate lucrările trimise la conferințele proprii
exports.getConferenceSubmissions = async (req, res) => {
  try {
    const { id } = req.params;
    const conference = await Conference.findByPk(id);
    if (!conference) {
      return res.status(404).json({ message: 'Conferința nu a fost găsită' });
    }
    if (conference.organizerId !== req.user.id) {
      return res.status(403).json({ message: 'Poți vizualiza doar lucrările trimise pentru conferințele tale' });
    }
    
    const submissions = await Submission.findAll({
      where: { ConferenceId: id },
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'name', 'email']
        },
        {
          model: Review,
          as: 'reviews',
          include: [{
            model: User,
            as: 'reviewer',
            attributes: ['id', 'name', 'email']
          }]
        }
      ],
      order: [['createdAt', 'DESC']] 
    });
    
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
