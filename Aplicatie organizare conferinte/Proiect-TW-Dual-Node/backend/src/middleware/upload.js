const multer = require("multer");
const path = require("path");   
const fs = require("fs");         

//Definirea folderului unde vor fi salvate fișierele încărcate
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configurarea modului de stocare al fișierelor, adică unde vor fi salvate și denumite
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  // Păstrarea numelui original al fișierului încărcat și adaugă sufix numeric dacă există deja fișierul
  filename: function (req, file, cb) {
    const originalName = file.originalname; 
    let finalName = originalName;
    let counter = 1;
    while (fs.existsSync(path.join(uploadDir, finalName))) {
      const ext = path.extname(originalName);         
      const nameWithoutExt = path.basename(originalName, ext); 
      finalName = `${nameWithoutExt}(${counter})${ext}`;    
      counter++;
    }

    cb(null, finalName); 
  }
});


// Setarea restricțiilor fișierelor ce vor fi încărcate 
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 //limita din punct de vedere a dimensiunii fișierului
  },
  fileFilter: (req, file, cb) => {
    // limitele din punct de vedere al tipurilor de fișiere acceptate
    if (
      file.mimetype === 'application/pdf' || 
      file.mimetype === 'application/msword' || 
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      cb(null, true); 
    } else {
      cb(new Error('Sunt permise doar documentele PDF și Word'));
    }
  }
});

module.exports = upload;
