// Pagina pentru afișarea listei tuturor conferințelor disponibile
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Conferences() {

  // Stare pentru lista conferințelor
  const [conferences, setConferences] = useState([]);
  const navigate = useNavigate();

  // Efect care încarcă lista conferințelor la montarea componentei
  useEffect(() => {
    api.get("/conferences").then((res) => {
      // Salvarea listei de conferințe primite de la backend
      setConferences(res.data);
    });
  }, []);

  return (
    <div className="card">

      {/* Titlul paginii */}
      <h2>Conferințe disponibile</h2>

      {/* Lista conferințelor */}
      <div className="list">
        {conferences.map((c) => (
          <div className="item" key={c.id}>

            {/* Titlul conferinței */}
            <strong>{c.title}</strong>

            {/* Descriere */}
            <p>{c.description}</p>

            {/* Link către pagina de detalii a conferinței */}
            <Link to={`/conferences/${c.id}`}>
              Vezi detalii
            </Link>
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
