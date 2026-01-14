// Model pentru stocararea datelor despre conferințele create de organizatori
// Fiecare conferință este creată de un organizator (user)
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Conference", {
    title: {
      type: DataTypes.STRING,     
      allowNull: false,           
      validate: {
        notEmpty: true            
      }
    },
    description: {
      type: DataTypes.TEXT,      
      allowNull: false           
    },
    date: {
      type: DataTypes.DATE,       
      allowNull: false            
    },
    submissionDeadline: {
      type: DataTypes.DATE,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    meetingLink: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true
      }
    }, 
    status: {
      type: DataTypes.ENUM("open", "closed"),
      defaultValue: "open"
    },
    // Legarea conferiței de utilizatorul care a creat-o - cheie primară
    organizerId: {
      type: DataTypes.INTEGER,    
      allowNull: false,           
      references: {
        model: 'Users',           
        key: 'id'                 
      }
    }
  });
};
