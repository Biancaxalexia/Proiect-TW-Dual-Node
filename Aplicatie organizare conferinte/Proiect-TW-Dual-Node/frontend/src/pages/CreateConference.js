// Pagina pentru crearea unei conferințe noi
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function CreateConference() {
  const navigate = useNavigate();

  // Stare pentru câmpurile formularului
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    meetingLink: "",
    date: "",
    submissionDeadline: ""
  });

  // Stare pentru mesajele de eroare
  const [error, setError] = useState("");

  // Funcție pentru actualizarea câmpurilor formularului
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Funcție apelată la trimiterea formularului
  const submit = async (e) => {
    e.preventDefault();
    setError("");

    // Validare simplă: verifică dacă toate câmpurile obligatorii sunt completate
    if (!form.title || !form.description || !form.location || !form.date || !form.submissionDeadline) {
      setError("Toate câmpurile obligatorii trebuie completate");
      return;
    }

    try {
      // Trimiterea datelor către backend pentru crearea conferinței
      await api.post("/conferences", form);

      // Redirecționare către lista conferințelor după succes
      navigate("/conferences");
    } catch (err) {
      setError("Eroare la crearea conferinței");
    }
  };

  return (
    <div className="card">

      {/* Titlul paginii */}
      <h2>Creează conferință</h2>

      {/* Formular pentru introducerea datelor conferinței */}
      <form onSubmit={submit}>

        {/* Titlu conferință */}
        <input
          name="title"
          placeholder="Titlu conferință"
          value={form.title}
          onChange={handleChange}
        />

        {/* Descriere conferință */}
        <textarea
          name="description"
          placeholder="Descriere"
          rows="4"
          value={form.description}
          onChange={handleChange}
        />

        {/* Locația conferinței */}
        <input
          name="location"
          placeholder="Locație (ex: București / Online)"
          value={form.location}
          onChange={handleChange}
        />

        {/* Link pentru conferință online (opțional) */}
        <input
          name="meetingLink"
          placeholder="Link conferință online (opțional)"
          value={form.meetingLink}
          onChange={handleChange}
        />

        {/* Data desfășurării conferinței */}
        <label>
          Data conferinței
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
        </label>

        {/* Deadline pentru trimiterea articolelor */}
        <label>
          Deadline articole
          <input
            type="date"
            name="submissionDeadline"
            value={form.submissionDeadline}
            onChange={handleChange}
          />
        </label>

        {/* Mesaj de eroare afișat la validare sau eroare backend */}
        {error && <div className="error">{error}</div>}

        <div className="actions">

          {/* Buton pentru salvarea conferinței */}
          <button type="submit" className="btn-primary">
            Salvează
          </button>

          {/* Buton pentru anularea operației */}
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate(-1)}
          >
            Anulează
          </button>

        </div>
      </form>
    </div>
  );
}
