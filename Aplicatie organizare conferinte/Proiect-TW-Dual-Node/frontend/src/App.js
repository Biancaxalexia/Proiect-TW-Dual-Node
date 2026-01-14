import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import "./App.css";

// Importul paginilor aplicației
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateConference from "./pages/CreateConference";
import Conferences from "./pages/Conferences";
import ConferenceDetails from "./pages/ConferenceDetails";
import EditConference from "./pages/EditConference";
import MySubmissions from "./pages/MySubmissions";
import SubmissionDetails from "./pages/SubmissionDetails";
import SubmitArticle from "./pages/SubmitArticle";
import MyReviews from "./pages/MyReviews";
import ReviewDetails from "./pages/ReviewDetails";

// Componenta Header afișată în partea de sus a aplicației
// Butonul de logout este afișat doar dacă există un utilizator logat
function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="app-header">
      <h1>ConferenceApp</h1>

      {user && (
        <button className="btn-secondary" onClick={logout}>
          Logout
        </button>
      )}
    </div>
  );
}

// Componentă utilizată pentru protejarea rutelor ce necesită autentificare
// Dacă utilizatorul nu este logat, este redirecționat către pagina de login
function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Dacă utilizatorul este autentificat, se afișează componenta cerută
  return children;
}

// Componenta care cuprinde conținutul aplicației
function AppContent() {
  return (
    <>
      {/* Header-ul este afișat pe toate paginile */}
      <Header />

      {/* Container principal pentru conținut */}
      <div className="app-container">
        <Routes>

          {/* Rutele publice, respectiv pagina de logare și înregistrare*/}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Conferințe */}
          <Route
            path="/conferences"
            element={
              <ProtectedRoute>
                <Conferences />
              </ProtectedRoute>
            }
          />

          {/* Detalii conferință */}
          <Route
            path="/conferences/:id"
            element={
              <ProtectedRoute>
                <ConferenceDetails />
              </ProtectedRoute>
            }
          />

          {/* Creare conferință */}
          <Route
            path="/create-conference"
            element={
              <ProtectedRoute>
                <CreateConference />
              </ProtectedRoute>
            }
          />

          {/* Editare conferință */}
          <Route
            path="/conferences/:id/edit"
            element={
              <ProtectedRoute>
                <EditConference />
              </ProtectedRoute>
            }
          />

          {/* Autor */}
          {/* Lista lucrărilor autorului */}
          <Route
            path="/my-submissions"
            element={
              <ProtectedRoute>
                <MySubmissions />
              </ProtectedRoute>
            }
          />

          {/* Recenzor */}
          {/* Lista recenziilor recenzorului */}
          <Route
            path="/my-reviews"
            element={
              <ProtectedRoute>
                <MyReviews />
              </ProtectedRoute>
            }
          />

          {/* Detalii recenzie */}
          <Route
            path="/reviews/:id"
            element={
              <ProtectedRoute>
                <ReviewDetails />
              </ProtectedRoute>
            }
          />

          {/* Lucrări */}
          {/* Detalii lucrare */}
          <Route
            path="/submissions/:id"
            element={
              <ProtectedRoute>
                <SubmissionDetails />
              </ProtectedRoute>
            }
          />

          {/* Orice rută inexistentă redirecționează către dashboard */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}
