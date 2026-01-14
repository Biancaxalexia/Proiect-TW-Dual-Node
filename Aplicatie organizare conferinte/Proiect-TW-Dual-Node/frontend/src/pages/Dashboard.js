// Pagina principală (Dashboard) afișată după autentificare
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Dashboard() {

  // Preluarea utilizatorului logat din contextul de autentificare
  const { user } = useContext(AuthContext);

  // Dacă utilizatorul nu este încărcat, nu se afișează nimic
  if (!user) return null;

  return (
    <div className="card dashboard">

      {/* Mesaj de întâmpinare */}
      <h2>Bun venit, {user.name} 👋</h2>

      {/* Subtitlu */}
      <p className="subtitle">
        Alege ce vrei să faci în continuare
      </p>

      <div className="dashboard-actions">
        {/* Opțiuni disponibile doar pentru utilizatorii cu rol de organizator */}
        {user.role === "organizer" && (
          <>
            <Link className="dashboard-btn" to="/create-conference">
              Creează conferință
            </Link>

            <Link className="dashboard-btn" to="/conferences">
              Conferințele mele
            </Link>
          </>
        )}

        {/* Opțiuni disponibile doar pentru utilizatorii cu rol de autor */}
        {user.role === "author" && (
          <>
            <Link className="dashboard-btn" to="/conferences">
              Conferințe disponibile
            </Link>

            <Link className="dashboard-btn" to="/my-submissions">
              Lucrările mele
            </Link>
          </>
        )}

        {/* Opțiuni disponibile doar pentru utilizatorii cu rol de recenzor */}
        {user.role === "reviewer" && (
          <Link className="dashboard-btn" to="/my-reviews">
            Recenziile mele
          </Link>
        )}

      </div>
    </div>
  );
}
