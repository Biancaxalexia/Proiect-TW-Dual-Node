const sequelize = require('./src/config/db');
const { User, Conference, Submission, Review } = require('./src/models');
const bcrypt = require('bcryptjs'); 

// Funcție care populează baza de date
async function seed() {
  try {
    //Sincronizarea bazei de date(creează tabelele dacă nu există)
    await sequelize.sync({ alter: true });
    console.log("Tabelele bazei de date au fost sincronizate");

    // Funcție de hash pentru securizarea parolei
    const pwAndrei = await bcrypt.hash('andrei2025', 10);
    const pwMihai = await bcrypt.hash('mihai2025', 10);
    const pwElena = await bcrypt.hash('elena2025', 10);
    const pwGabriel = await bcrypt.hash('gabriel2025', 10);
    const pwAna = await bcrypt.hash('ana2025', 10);
    const pwIon = await bcrypt.hash('ion2025', 10);

    // Crearea utilizatorilor
    const organizer = await User.create({
      name: 'Andrei Popescu',
      email: 'andrei.popescu@conferencehub.ro',
      password: pwAndrei,
      role: 'organizer'
    });

    const author1 = await User.create({
      name: 'Mihai Ionescu',
      email: 'mihai.ionescu@gmail.com',
      password: pwMihai,
      role: 'author'
    });

    const author2 = await User.create({
      name: 'Elena Matei',
      email: 'elena.matei@gmail.com',
      password: pwElena,
      role: 'author'
    });

    const author3 = await User.create({
      name: 'Gabriel Dumitru',
      email: 'gabriel.dumitru@gmail.com',
      password: pwGabriel,
      role: 'author'
    });

    const reviewer1 = await User.create({
      name: 'Ana Pop',
      email: 'ana.pop@gmail.com',
      password: pwAna,
      role: 'reviewer'
    });

    const reviewer2 = await User.create({
      name: 'Ion Marinescu',
      email: 'ion.marinescu@gmail.com',
      password: pwIon,
      role: 'reviewer'
    });

    console.log("Utilizatori creați cu succes");

    // Crearea conferințelor
    const conf1 = await Conference.create({
      title: 'Conferința Națională de Literatură',
      description: 'Eveniment dedicat literaturii contemporane românești',
      date: new Date('2025-06-15'),
      organizerId: organizer.id
    });

    const conf2 = await Conference.create({
      title: 'Simpozion de Critică Literară',
      description: 'Analize moderne asupra literaturii române',
      date: new Date('2025-07-20'),
      organizerId: organizer.id
    });

    console.log("Conferințele au fost create cu succes");

    // Crearea lucrărilor aferente fiecărei conferințe
    const sub1 = await Submission.create({
      title: 'Metafora urbană în literatura recentă',
      file: 'submission1-sample.pdf',
      authorId: author1.id,
      ConferenceId: conf1.id,
      status: 'under_review',
      version: 1
    });

    const sub2 = await Submission.create({
      title: 'Reprezentarea memoriei în romanul contemporan',
      file: 'submission2-sample.pdf',
      authorId: author2.id,
      ConferenceId: conf1.id,
      status: 'under_review',
      version: 1
    });

    const sub3 = await Submission.create({
      title: 'Minimalismul poetic în generația 2000',
      file: 'submission3-sample.pdf',
      authorId: author3.id,
      ConferenceId: conf1.id,
      status: 'pending',
      version: 1
    });

    const sub4 = await Submission.create({
      title: 'Literatura și noile tehnologii',
      file: 'submission4-sample.pdf',
      authorId: author1.id,
      ConferenceId: conf2.id,
      status: 'under_review',
      version: 1
    });

    const sub5 = await Submission.create({
      title: 'Critica feministă în spațiul românesc',
      file: 'submission5-sample.pdf',
      authorId: author2.id,
      ConferenceId: conf2.id,
      status: 'accepted',
      version: 1
    });

    const sub6 = await Submission.create({
      title: 'Proza scurtă românească - tendințe',
      file: 'submission6-sample.pdf',
      authorId: author3.id,
      ConferenceId: conf2.id,
      status: 'needs_revision',
      version: 1
    });

    console.log("Lucrările au fost create cu succes");

    // Crearea recenziilor pentru lucrări
    await Review.create({
      score: 9,
      comment: 'Excelent structurată și foarte coerentă. Lucrare de calitate superioară.',
      reviewerId: reviewer1.id,
      SubmissionId: sub1.id,
      status: 'completed'
    });

    await Review.create({
      score: 8,
      comment: 'Interesantă abordare, poate fi extinsă cu mai multe exemple concrete.',
      reviewerId: reviewer2.id,
      SubmissionId: sub1.id,
      status: 'completed'
    });

    console.log("Recenziile au fost create cu succes");

    console.log("Populare finalizată cu succes!");
    console.log("\nUtilizatori test:");
    console.log("Organizer: andrei.popescu@conferencehub.ro / andrei2025");
    console.log("Author 1: mihai.ionescu@gmail.com / mihai2025");
    console.log("Author 2: elena.matei@gmail.com / elena2025");
    console.log("Author 3: gabriel.dumitru@gmail.com / gabriel2025");
    console.log("Reviewer 1: ana.pop@gmail.com / ana2025");
    console.log("Reviewer 2: ion.marinescu@gmail.com / ion2025");

    process.exit(0);
  } catch (err) {
    console.error("Eroare în timpul populării:", err);
    process.exit(1); 
  }
}

seed();
