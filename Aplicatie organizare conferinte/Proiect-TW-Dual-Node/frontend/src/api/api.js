// Fișier utilizat pentru configurarea apelurilor către API-ul backend-ului
import axios from "axios";

// Crearea unei instanțe axios cu o configurație comună pentru API
const api = axios.create({
  baseURL: "http://localhost:3001/api", // reprezintă adresa de bază a backend-ului
});

// Interceptor pentru cererile trimise către server
// Se execută înainte ca fiecare request să fie trimis
api.interceptors.request.use((config) => {

  // Preluarea token-ului JWT salvat în localStorage după autentificare
  const token = localStorage.getItem("token");

  // Dacă token-ul există este atașat în header-ul Authorization sub forma "Bearer <token>"
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Returnarea configurației modificate a cererii
  return config;
});

export default api;
