// Model pentru stocarea lucrărilor trimise de autori
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Submission", {
    title: {
      type: DataTypes.STRING,     
      allowNull: false,           
      validate: {
        notEmpty: true            
      }
    },
    file: {
      type: DataTypes.STRING,     
      allowNull: false           
    },
    status: {
      type: DataTypes.ENUM(
        'pending',        
        'under_review',   
        'accepted',       
        'rejected',       
        'needs_revision'  
      ),
      defaultValue: 'pending',   
      allowNull: false
    },
    version: {
      type: DataTypes.INTEGER,   
      defaultValue: 1           
    }
  });
};
