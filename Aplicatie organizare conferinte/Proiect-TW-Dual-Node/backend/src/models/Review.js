// Model pentru stocarea recenziilor realizate de recenzori
// Fiecare recenzie aparține unei lucrări
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Review", {
    comment: {
      type: DataTypes.TEXT,       
      allowNull: true, // linie modificată și unele șterse
    },
    score: {
      type: DataTypes.INTEGER,    
      allowNull: true, // linie modificată       
      validate: {
        min: 1,                 
        max: 10                   
      }
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed'), 
      defaultValue: 'pending'                        
    }
  });
};
