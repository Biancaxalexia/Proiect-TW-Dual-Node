// Pagina pentru afișarea lucrărilor trimise de autor
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function MySubmissions() {

  // Stare pentru lista lucrărilor
  const [submissions, setSubmissions] = useState([]);
  const navigate = useNavigate();

  // Efect care încarcă lucrările autorului logat
  useEffect(() => {
    api
      .get("/submissions/my-submissions")
      .then((res) => {
        // Salvarea lucrărilor primite de la backend
        setSubmissions(res.data);
      })
      .catch(() => {
        alert("Nu s-au putut încărca lucrările");
      });
  }, []);

  return (
    <div className="card">

      {/* Titlul paginii */}
      <h2>Lucrările mele</h2>

      {/* Mesaj afișat dacă nu există lucrări */}
      {submissions.length === 0 && (
        <p>Nu ai trimis nicio lucrare.</p>
      )}

      {/* Lista lucrărilor */}
      <div className="list">
        {submissions.map((s) => (
          <div className="item" key={s.id}>

            {/* Titlul lucrării */}
            <strong>{s.title}</strong>

            {/* Statusul lucrării */}
            <p>Status: {s.status}</p>

            {/* Buton pentru revizuirea lucrării */ }
            {s.status === "needs_revision" && (
              <button
              className="btn-primary"
              onClick={() => navigate(`/revision/${s.id}`)}
               >
                Trimite revizie
               </button>
              )}

            <div className="actions">

              {/* Buton pentru vizualizarea detaliilor lucrării */}
              <button
                className="btn-secondary"
                onClick={() => navigate(`/submissions/${s.id}`)}
              >
                Vezi detalii
              </button>

            </div>
          </div>
        ))}
      </div>

      <div className="actions">

        {/* Buton pentru revenirea la dashboard */}
        <button
          className="btn-secondary"
          onClick={() => navigate("/")}
        >
          Înapoi
        </button>

      </div>
    </div>
  );
}
