// Fișier utilizat pentru gestionarea autentificării utilizatorului
import { createContext, useState } from "react";
import api from "../api/api";

// Crearea contextului de autentificare
export const AuthContext = createContext();

// Componentă utilizată pentru trimiterea datelor de autentificare tuturor componentelor copil
export function AuthProvider({ children }) {

  // Starea utilizatorului inițializată din localStorage pentru a păstra sesiunea activă la refresh-ul paginii
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // Funcție pentru autentificarea utilizatorului
  // Trimite datele de login către backend și salvează token-ul și utilizatorul
  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });

    // Salvarea token-ului JWT pentru accesul la rutele protejate
    localStorage.setItem("token", res.data.token);

    // Salvarea informațiilor utilizatorului autentificat
    localStorage.setItem("user", JSON.stringify(res.data.user));

    // Actualizarea stării globale a utilizatorului
    setUser(res.data.user);
  };

  // Funcție pentru delogarea utilizatorului
  // Șterge datele de autentificare și resetează starea
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  // Furnizarea contextului către componentele copil
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
