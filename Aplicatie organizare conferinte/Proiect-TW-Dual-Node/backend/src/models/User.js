// Model pentru stocarea tuturor utilizatorilor
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 100] 
      }
    },
    role: {
      type: DataTypes.ENUM('organizer', 'author', 'reviewer'),
      allowNull: false,
      validate: {
        isIn: [['organizer', 'author', 'reviewer']]
      }
    }
  });
};
