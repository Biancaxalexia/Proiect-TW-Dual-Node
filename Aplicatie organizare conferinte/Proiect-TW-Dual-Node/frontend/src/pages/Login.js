// Pagina de autentificare a utilizatorului
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {

  // Preluarea funcției de login din contextul de autentificare
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Stări pentru câmpurile formularului
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Stare pentru afișarea sau ascunderea parolei
  const [showPassword, setShowPassword] = useState(false);

  // Stare pentru mesajele de eroare
  const [error, setError] = useState("");

  // Funcție apelată la trimiterea formularului
  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Apelarea funcției de login
      await login(email, password);

      // Redirecționare către dashboard după autentificare
      navigate("/");
    } catch {
      setError("Email sau parolă incorectă");
    }
  };

  return (
    <div className="card">

      {/* Titlul paginii */}
      <h2>Autentificare</h2>

      {/* Formular de autentificare */}
      <form onSubmit={submit}>

        {/* Câmp pentru email */}
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          required
        />

        {/* Câmp pentru parolă (text sau password) */}
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

        {/* Mesaj de eroare */}
        {error && <div className="error">{error}</div>}

        {/* Buton de login */}
        <button className="btn-primary">
          Login
        </button>

      </form>

      {/* Link către pagina de înregistrare */}
      <p className="muted">
        Nu ai cont? <Link to="/register">Înregistrare</Link>
      </p>

    </div>
  );
}
