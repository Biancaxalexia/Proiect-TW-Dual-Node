// Pagina de înregistrare a utilizatorilor
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

// Funcție utilitară care permite doar litere și caractere specifice limbii române
const onlyLetters = (value) =>
  value.replace(/[^a-zA-ZăâîșțĂÂÎȘȚ\s-]/g, "");

export default function Register() {
  const navigate = useNavigate();

  // Stări pentru câmpurile formularului
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Stare pentru rolul utilizatorului
  const [role, setRole] = useState("author");

  // Stare pentru afișarea sau ascunderea parolei
  const [showPassword, setShowPassword] = useState(false);

  // Stare pentru mesajele de eroare
  const [error, setError] = useState("");

  // Funcție apelată la trimiterea formularului
  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Trimiterea datelor către backend pentru crearea contului
      await api.post("/auth/register", {
        name: `${firstName} ${lastName}`,
        email,
        password,
        role,
      });

      // Redirecționare către pagina de autentificare după înregistrare
      navigate("/login");
    } catch {
      setError("Eroare la crearea contului");
    }
  };

  return (
    <div className="card">

      {/* Titlul paginii */}
      <h2>Înregistrare</h2>

      {/* Formular de înregistrare */}
      <form onSubmit={submit}>

        {/* Prenume */}
        <input
          placeholder="Prenume"
          value={firstName}
          onChange={(e) => {
            setFirstName(onlyLetters(e.target.value));
            setError("");
          }}
          required
        />

        {/* Nume */}
        <input
          placeholder="Nume"
          value={lastName}
          onChange={(e) => {
            setLastName(onlyLetters(e.target.value));
            setError("");
          }}
          required
        />

        {/* Email */}
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          required
        />

        {/* Parolă (text sau password) */}
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Parolă"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          required
        />

        {/* Checkbox pentru afișarea parolei */}
        <label className="checkbox">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          Afișează parola
        </label>

        {/* Selectarea rolului utilizatorului */}
        <select
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
            setError("");
          }}
        >
          <option value="author">Autor</option>
          <option value="reviewer">Recenzor</option>
          <option value="organizer">Organizator</option>
        </select>

        {/* Mesaj de eroare */}
        {error && <div className="error">{error}</div>}

        {/* Buton pentru crearea contului */}
        <button className="btn-primary">
          Creează cont
        </button>

      </form>

      {/* Link către pagina de autentificare */}
      <p className="muted">
        Ai deja cont? <Link to="/login">Autentificare</Link>
      </p>

    </div>
  );
}
