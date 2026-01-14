// Pagina pentru afișarea recenziilor alocate recenzorului
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function MyReviews() {

  // Stare pentru lista recenziilor
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  // Efect care încarcă recenziile recenzorului logat
  useEffect(() => {
    api
      .get("/reviews/my-reviews")
      .then((res) => {
        // Salvarea recenziilor primite de la backend
        setReviews(res.data);
      })
      .catch(() => {
        alert("Nu s-au putut încărca recenziile");
      });
  }, []);

  return (
    <div className="card">

      {/* Titlul paginii */}
      <h2>Recenziile mele</h2>

      {/* Mesaj afișat dacă nu există recenzii */}
      {reviews.length === 0 && (
        <p>Nu ai recenzii alocate</p>
      )}

      {/* Lista recenziilor */}
      <div className="list">
        {reviews.map((r) => (
          <div className="item" key={r.id}>

            {/* Titlul lucrării evaluate */}
            <strong>{r.submission?.title}</strong>

            {/* Numele autorului lucrării */}
            <p>
              Autor: {r.submission?.author?.name}
            </p>

            {/* Statusul recenziei */}
            <p>
              Status:{" "}
              {r.status === "completed" ? "Finalizată" : "În așteptare"}
            </p>

            {/* Scorul recenziei (dacă există) */}
            {r.score && <p>Scor: {r.score}</p>}

            <div className="actions">
              {/* Dacă recenzia nu este finalizată dă posibilitatea de a o evalua */}
              {r.status !== "completed" ? (
                <button
                  className="btn-primary"
                  onClick={() =>
                    navigate(`/reviews/${r.id}`)
                  }
                >
                  Evaluează
                </button>
              ) : (
                // Dacă recenzia este finalizată dă posibilitatea să o vizualizezi
                <button
                  className="btn-secondary"
                  onClick={() =>
                    navigate(`/reviews/${r.id}`)
                  }
                >
                  Vezi recenzia
                </button>
              )}

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
