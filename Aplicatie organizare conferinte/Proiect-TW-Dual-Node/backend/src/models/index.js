// Definirea relațiilor între modele(tabele)
const { DataTypes } = require('sequelize');      
const sequelize = require('../config/db');    

const User = require('./User')(sequelize, DataTypes);
const Conference = require('./Conference')(sequelize, DataTypes);
const Submission = require('./Submission')(sequelize, DataTypes);
const Review = require('./Review')(sequelize, DataTypes);

//Relațiile pentru utilizator
User.hasMany(Conference, { foreignKey: "organizerId", as: "organizedConferences" }); // Un organizator poate crea mai multe conferințe
Conference.belongsTo(User, { foreignKey: "organizerId", as: "organizer" }); // Fiecare conferință aparține unui singur organizator
User.hasMany(Submission, { foreignKey: "authorId", as: "submissions" }); // Un autor poate trimite mai multe lucrări
Submission.belongsTo(User, { foreignKey: "authorId", as: "author" }); // Fiecare lucrare aparține unui singur autor
User.hasMany(Review, { foreignKey: "reviewerId", as: "reviews" }); // Un recenzor poate scrie mai multe recenzii
Review.belongsTo(User, { foreignKey: "reviewerId", as: "reviewer" }); // Fiecare recenzie aparține unui singur recenzor

//Relații pentru conferință
Conference.hasMany(Submission, { foreignKey: "ConferenceId", as: "submissions" }); // O conferință poate avea mai multe lucrări
Submission.belongsTo(Conference, { foreignKey: "ConferenceId", as: "conference" }); // Fiecare lucrare aparține unei conferințe

//Relații pentru lucrare
Submission.hasMany(Review, { foreignKey: "SubmissionId", as: "reviews" }); // O lucrare poate avea mai multe recenzii (cel puțin 2 recenzori per lucrare)
Review.belongsTo(Submission, { foreignKey: "SubmissionId", as: "submission" }); // Fiecare recenzie aparține unei lucrări

module.exports = { User, Conference, Submission, Review };
