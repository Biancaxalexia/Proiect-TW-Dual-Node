// Pagina pentru vizualizarea și completarea unei recenzii
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function ReviewDetails() {

  // Preluarea ID-ului recenziei din URL
  const { id } = useParams();
  const navigate = useNavigate();

  // Stare pentru datele recenziei
  const [review, setReview] = useState(null);

  // Stare pentru controlul încărcării
  const [loading, setLoading] = useState(true);

  // Stări pentru completarea recenziei
  const [score, setScore] = useState("");
  const [comment, setComment] = useState("");
  
  // Stare pentru decizia recenzorului - linie nouă de cod
  const [decision, setDecision] = useState("accept");

  // Stare pentru mesajele de eroare
  const [error, setError] = useState("");

  // La montarea componentei se încarcă detaliile recenziei
  useEffect(() => {
    api
      .get(`/reviews/${id}`)
      .then((res) => {
        // Salvarea recenziei primite de la backend
        setReview(res.data);

        // Inițializarea câmpurilor formularului (dacă există valori)
        setScore(res.data.score || "");
        setComment(res.data.comment || "");
      })
      .catch(() => {
        // În caz de eroare, se revine la lista recenziilor
        alert("Eroare la încărcarea recenziei");
        navigate("/my-reviews");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, navigate]);

  // Funcție apelată la trimiterea formularului de evaluare
  const submitReview = async (e) => {
    e.preventDefault();
    setError("");

    // Validare scor între 1 și 10
    if (!score || score < 1 || score > 10) {
      setError("Scorul trebuie să fie între 1 și 10");
      return;
    }

    try {
      // Trimiterea recenziei și deciziei către backend
      await api.put(`/reviews/${id}/submit`, {
        score,
        comment,
        decision
      });

      // Redirecționare către lista recenziilor
      navigate("/my-reviews");
    } catch {
      setError("Eroare la trimiterea recenziei");
    }
  };

  // Mesaj afișat în timpul încărcării
  if (loading) return <p>Se încarcă...</p>;

  // Dacă recenzia nu există
  if (!review) return null;

  return (
    <div className="card">

      {/* Titlul paginii */}
      <h2>Evaluare articol</h2>

      {/* Informații despre lucrare */}
      <p><strong>Titlu articol:</strong> {review.submission?.title}</p>
      <p><strong>Autor:</strong> {review.submission?.author?.name}</p>
      <p><strong>Conferință:</strong> {review.submission?.conference?.title}</p>

      <hr />

      {/* Recenzie finalizată */}
      {review.status === "completed" && (
        <>
          <p><strong>Scor:</strong> {review.score}</p>
          <p><strong>Comentariu:</strong></p>
          <p>{review.comment}</p>
        </>
      )}

      {/* Recenzie de completat*/}
      {review.status !== "completed" && (
        <form onSubmit={submitReview}>

          {/* Introducerea scorului */}
          <label>
            Scor (1–10)
            <input
              type="number"
              min="1"
              max="10"
              value={score}
              onChange={(e) => setScore(e.target.value)}
            />
          </label>

          {/* Introducerea comentariului */}
          <label>
            Comentariu
            <textarea
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </label>

          {/*Alegerea deciciei*/}
          <label>
            Decizie
            <select
              value={decision}
              onChange={(e) => setDecision(e.target.value)}
            >
              <option value="accept">Accept</option>
              <option value="needs_revision">Revise (cerere modificări)</option>
            </select>
          </label>

          {/* Mesaj de eroare */}
          {error && <div className="error">{error}</div>}

          <div className="actions">

            {/* Trimiterea recenziei */}
            <button className="btn-primary">
              Trimite recenzia
            </button>

            {/* Anulare și revenire */}
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate("/my-reviews")}
            >
              Anulează
            </button>

          </div>
        </form>
      )}

      {review.status === "completed" && (
        <div className="actions">
          <button
            className="btn-secondary"
            onClick={() => navigate("/my-reviews")}
          >
            Înapoi
          </button>
        </div>
      )}

    </div>
  );
}
