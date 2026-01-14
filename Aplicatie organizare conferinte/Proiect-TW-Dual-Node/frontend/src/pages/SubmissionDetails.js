// Pagina pentru afișarea detaliilor unei lucrări trimise
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function SubmissionDetails() {

  // Preluarea ID-ului lucrării din URL
  const { id } = useParams();
  const navigate = useNavigate();

  // Stare pentru datele lucrării
  const [submission, setSubmission] = useState(null);

  // Stare pentru controlul încărcării
  const [loading, setLoading] = useState(true);

  // La montarea componentei se încarcă detaliile lucrării
  useEffect(() => {
    api
      .get(`/submissions/${id}`)
      .then((res) => {
        // Salvarea datelor lucrării primite de la backend
        setSubmission(res.data);
      })
      .catch(() => {
        // În caz de eroare, se revine la lista lucrărilor
        alert("Eroare la încărcarea lucrării");
        navigate("/my-submissions");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, navigate]);

  // Funcție utilizată pentru descărcarea fișierului cu token JWT
  const downloadFile = async () => {
    try {
      const response = await api.get(
        `/submissions/${submission.id}/download`,
        {
          responseType: "blob", 
        }
      );

      // Crearea unui URL temporar pentru fișier
      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      // Crearea unui link temporar
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", submission.file);

      document.body.appendChild(link);
      link.click();
      
      link.remove();
      window.URL.revokeObjectURL(url);

    } catch (err) {
      console.error("Eroare la descărcare:", err);
      alert("Nu s-a putut descărca fișierul");
    }
  };

  // Mesaj afișat în timpul încărcării
  if (loading) return <p>Se încarcă...</p>;

  // Dacă lucrarea nu există
  if (!submission) return null;

  return (
    <div className="card">

      {/* Titlul lucrării */}
      <h2>{submission.title}</h2>

      {/* Statusul lucrării */}
      <p>
        <strong>Status:</strong> {submission.status}
      </p>

      {/* Conferința asociată */}
      <p>
        <strong>Conferință:</strong>{" "}
        {submission.conference?.title}
      </p>

      {/* Fișierul lucrării */}
      <p>
        <strong>Fișier:</strong>{" "}
        <button
          className="btn-link"
          onClick={downloadFile}
        >
          Descarcă
        </button>
      </p>

      <div className="actions">

        {/* Buton pentru revenirea la lista lucrărilor */}
        <button
          className="btn-secondary"
          onClick={() => navigate("/my-submissions")}
        >
          Înapoi
        </button>

      </div>
    </div>
  );
}
