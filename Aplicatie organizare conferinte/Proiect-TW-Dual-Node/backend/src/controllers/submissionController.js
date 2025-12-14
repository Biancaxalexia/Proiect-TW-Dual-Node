// Controller pentru gestionarea lucrărilor trimise de autori
// Permite trimiterea lucrărilor, revizuirea și vizualizarea acestora

const { Submission, User, Review, Conference } = require('../models');

// Trimiterea unei lucrări noi
exports.submitArticle = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Fișierul este necesar' }); 
    }
    
    const { title, conferenceId } = req.body;
    
    const conference = await Conference.findByPk(conferenceId);
    if (!conference) {
      return res.status(404).json({ error: 'Conferința nu a fost găsită' });
    }
    
    const submission = await Submission.create({
      title,
      file: req.file.filename, 
      authorId: req.user.id,  
      ConferenceId: conferenceId,
      status: 'pending',      
      version: 1               
    });
    
    await assignReviewers(submission.id);
    
    res.status(201).json({
      message: 'Lucrarea a fost trimisă cu succes. Au fost alocați doi recenzori',
      submission
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Atribuirea recenzorilor
// Funcție care atribuie automat 2 recenzori pentru o lucrare
async function assignReviewers(submissionId) {
  try {
    const reviewers = await User.findAll({ where: { role: 'reviewer' } }); 
    
    if (reviewers.length < 2) {
      console.warn('Avertisment: Mai puțin de 2 recenzori disponibili în sistem');
      return;
    }
    
    const selectedReviewers = reviewers
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
    
    for (const reviewer of selectedReviewers) {
      await Review.create({
        SubmissionId: submissionId,
        reviewerId: reviewer.id,
        comment: '', 
        score: 0,   
        status: 'pending'
      });
    }
  } catch (err) {
    console.error('Eroare la atribuirea recenzorilor:', err);
  }
}

// GET lucrările mele
exports.getMySubmissions = async (req, res) => {
  try {
    const submissions = await Submission.findAll({
      where: { authorId: req.user.id },
      include: [
        {
          model: Conference,
          as: 'conference',
          attributes: ['id', 'title', 'description', 'date']
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

// Revizuirea lucrărilor
// Permite autorilor să trimită o versiune revizuită a lucrării
exports.submitRevision = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Fișierul este necesar' });
    }
    
    const { submissionId } = req.params;
    
    const submission = await Submission.findByPk(submissionId);
    if (!submission) {
      return res.status(404).json({ error: 'Lucrarea nu a fost găsită' });
    }
    
    if (submission.authorId !== req.user.id) {
      return res.status(403).json({ error: 'Poți să revizuiești doar propriile tale lucrări' });
    }
    
    submission.file = req.file.filename;
    submission.version += 1;
    submission.status = 'pending'; 
    await submission.save();
    
    await assignReviewers(submissionId);
    
    res.json({
      message: 'Revizuirea a fost trimisă cu succes. Noi recenzori au fost desemnați',
      submission
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET lucrare by ID
exports.getSubmissionById = async (req, res) => {
  try {
    const { id } = req.params;
    const submission = await Submission.findByPk(id, {
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
    });
    
    if (!submission) {
      return res.status(404).json({ message: 'Lucrarea nu a fost găsită' });
    }
    
    res.json(submission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
