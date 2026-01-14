// Pagina pentru editarea unei conferințe existente
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function EditConference() {

  // Preluarea ID-ului conferinței din URL
  const { id } = useParams();
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

  // Stare pentru controlul încărcării datelor
  const [loading, setLoading] = useState(true);

  // Stare pentru mesajele de eroare
  const [error, setError] = useState("");

  // La montarea componentei se încarcă datele conferinței
  useEffect(() => {
    api
      .get(`/conferences/${id}`)
      .then(res => {
        // Completarea formularului cu datele existente ale conferinței
        setForm({
          title: res.data.title,
          description: res.data.description,
          location: res.data.location,
          meetingLink: res.data.meetingLink || "",
          date: res.data.date.slice(0, 10),
          submissionDeadline: res.data.submissionDeadline.slice(0, 10)
        });
      })
      .catch(() => {
        alert("Eroare la încărcarea conferinței");
        navigate(-1);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, navigate]);

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

    try {
      // Trimiterea modificărilor către backend
      await api.put(`/conferences/${id}`, form);

      // Redirecționare către pagina de detalii a conferinței
      navigate(`/conferences/${id}`);
    } catch {
      setError("Eroare la salvarea modificărilor");
    }
  };

  // Afișare mesaj în timpul încărcării datelor
  if (loading) return <p>Se încarcă...</p>;

  return (
    <div className="card">

      {/* Titlul paginii */}
      <h2>Editează conferința</h2>

      {/* Formular pentru editarea conferinței */}
      <form onSubmit={submit}>

        {/* Titlu conferință */}
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Titlu"
        />

        {/* Descriere conferință */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="4"
          placeholder="Descriere"
        />

        {/* Locație conferință */}
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Locație"
        />

        {/* Link pentru conferința online (opțional) */}
        <input
          name="meetingLink"
          value={form.meetingLink}
          onChange={handleChange}
          placeholder="Link conferință online (opțional)"
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

        {/* Mesaj de eroare */}
        {error && <div className="error">{error}</div>}

        <div className="actions">

          {/* Buton pentru salvarea modificărilor */}
          <button className="btn-primary">
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
