// Pagina pentru afișarea detaliilor unei conferințe
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/api";

export default function ConferenceDetails() {

  // Preluarea utilizatorului logat din context
  const { user } = useContext(AuthContext);

  // Preluarea ID-ului conferinței din URL
  const { id } = useParams();
  const navigate = useNavigate();

  // Stare pentru datele conferinței
  const [conference, setConference] = useState(null);

  // Stare pentru controlul încărcării datelor
  const [loading, setLoading] = useState(true);

  // Efect care încarcă detaliile conferinței la montarea componentei sau când se schimbă ID-ul din URL
  useEffect(() => {
    api
      .get(`/conferences/${id}`)
      .then((res) => {
        // Salvarea datelor conferinței primite de la backend
        setConference(res.data);
      })
      .catch(() => {
        alert("Eroare la încărcarea conferinței");
        navigate("/conferences");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, navigate]);

  // Mesaj afișat în timpul încărcării
  if (loading) return <p>Se încarcă...</p>;

  // Dacă nu există date despre conferință, nu se afișează nimic
  if (!conference) return null;

  return (
    <div className="card">

      {/* Titlul conferinței */}
      <h2>{conference.title}</h2>

      {/* Descrierea conferinței */}
      <p>{conference.description}</p>

      <hr />

      {/* Locația conferinței */}
      <p>
        <strong>Locație:</strong> {conference.location}
      </p>

      {/* Link-ul pentru conferințele online (dacă există) */}
      {conference.meetingLink && (
        <p>
           <strong>Link conferință online:</strong>{" "}
          <a
            href={conference.meetingLink}
            target="_blank"
            rel="noreferrer"
          >
            {conference.meetingLink}
          </a>
        </p>
      )}

      {/* Data desfășurării conferinței */}
      <p>
        <strong>Data conferinței:</strong>{" "}
        {new Date(conference.date).toLocaleDateString()}
      </p>

      {/* Deadline pentru trimiterea articolelor */}
      <p>
        <strong>Deadline articole:</strong>{" "}
        {new Date(conference.submissionDeadline).toLocaleDateString()}
      </p>

      {/* Statusul conferinței */}
      <p>
        <strong>Status:</strong>{" "}
        {conference.status === "open" ? "🟢 Deschisă" : "🔴 Închisă"}
      </p>

      {/* Informații despre organizator */}
      <p>
        <strong>Organizator:</strong>{" "}
        {conference.organizer?.name} ({conference.organizer?.email})
      </p>

      <div className="actions">
        {/* Buton pentru revenirea la lista de conferințe */}
        <button
          className="btn-secondary"
          onClick={() => navigate("/conferences")}
        >
          Înapoi
        </button>

        {/* Buton destinat autorului pentru a trimite un articol dacă conferința este deschisă */}
        {user?.role === "author" && conference.status === "open" && (
          <button
            className="btn-primary"
            onClick={() => navigate(`/submit/${conference.id}`)}
          >
            Trimite articol
          </button>
        )}

        {/* Buton destinat organizatorului pentru a edita o conferință deja creată*/}
        {user?.role === "organizer" && (
          <button
            className="btn-primary"
            onClick={() => navigate(`/conferences/${conference.id}/edit`)}
          >
            Editează conferința
          </button>
        )}
      </div>
    </div>
  );
}
