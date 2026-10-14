import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./components/LandingPage";
import { ScrollManager } from "./components/ScrollManager";
import { RequireAuth } from "./components/RequireAuth";

const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() =>
  import("./components/Login").then((m) => ({ default: m.Login })),
);
const Privacy = lazy(() => import("./pages/Privacy"));
const MerkToevoegen = lazy(() => import("./pages/merk-toevoegen"));
const MerkenPage = lazy(() => import("./pages/merken"));
const AdminDashboard = lazy(() => import("./admin/AdminDashboard"));

function App() {
  return (
    <>
      <ScrollManager />
      <Suspense
        fallback={
          <div className="route-loading" role="status">
            Een momentje…
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/merk-toevoegen" element={<MerkToevoegen />} />
          <Route path="/merken" element={<MerkenPage />} />
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <AdminDashboard />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
