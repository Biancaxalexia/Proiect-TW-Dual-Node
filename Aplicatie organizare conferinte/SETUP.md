CERINȚE DE SISTEM:
- Node.js 
- MariaDB 
- npm sau yarn

- INSTALARE DEPENDENȚE
cd backend
npm install

- BAZĂ DE DATE
Creează baza de date MariaDB:
CREATE DATABASE conference_app; 

Fișierul .env
Creează un fișier .env în backend:

DB_HOST=127.0.0.1 
DB_PORT=3306
DB_USER=admin (by default root)
DB_PASSWORD=parola_ta
DB_NAME=conference_app

PORT=3000

JWT_SECRET=schimbă_cu_o_cheie_puternică

Note: 
- Fișierul .env nu trebuie urcat în Git. Asigură-te că acesta se află în .gitignore.
- Este recomandat în momentul conectării la baza de date create prin intermediul serviciului HeidiSQL să se creeze un utilizator unic din Manager utilizator.
- Pentru generarea parolei utilizată în JWT_SECRET scrie comanda care urmează în terminal. Aceasta îți va genera o parolă puternică pe care o poți utiliza pentru a asigurarea securității.
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

- FIȘIERUL SEED
Creează un script simplu seed.js ca să poți observa dacă backend-ul funcționează corespunzător:

const { User } = require('./src/models');
const bcrypt = require('bcryptjs');

(async () => {
  const hashedPassword = await bcrypt.hash('andrei2025', 10);
  await User.create({ name: 'Andrei Popescu', email: 'andrei@conf.ro', password: hashedPassword, role: 'organizer' });
  console.log('Cont test creat!');
  process.exit();
})();

Rulare:
node seed.js

- PORNIRE SERVER
Mod dezvoltare (auto-reload):
npm run dev

Mod producție:
npm start

Test server:
curl http://localhost:3000/api/health
# {"status":"OK","message":"Serverul este pornit"}

- ENDPOINT-URI PRINCIPALE
Autentificare:
POST /api/auth/register → Înregistrare utilizator
POST /api/auth/login → Logare și obținere token JWT

Conferințe:
GET /api/conferences → Lista conferințe (public)
POST /api/conferences → Creează conferință (doar organizator)

Lucrări:
POST /api/submissions → Trimite lucrare (autor, upload fișier)
POST /api/submissions/:id/revision → Trimite versiune revizuită

Recenzii:
GET /api/reviews/my-reviews → Recenzii alocate (recenzor)
PUT /api/reviews/:id/submit → Trimitere recenzie (recenzor)