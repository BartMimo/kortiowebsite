import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MerkenPage from "./pages/merken";
import { ScrollManager } from "./components/ScrollManager";
import { RequireAuth } from "./components/RequireAuth";

const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() =>
  import("./components/Login").then((m) => ({ default: m.Login })),
);
const Privacy = lazy(() => import("./pages/Privacy"));
const Voorwaarden = lazy(() => import("./pages/Voorwaarden"));
const MerkToevoegen = lazy(() => import("./pages/merk-toevoegen"));
const LandingPage = lazy(() =>
  import("./components/LandingPage").then((m) => ({ default: m.LandingPage })),
);
const CodeGuide = lazy(() => import("./pages/CodeGuide"));
const MerkLink = lazy(() => import("./pages/MerkLink"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const OverKortio = lazy(() => import("./pages/OverKortio"));
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
          <Route path="/" element={<MerkenPage />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/voorwaarden" element={<Voorwaarden />} />
          <Route path="/merk-toevoegen" element={<MerkToevoegen />} />
          <Route path="/merken" element={<Navigate to="/" replace />} />
          <Route path="/kortingscode-gebruiken" element={<CodeGuide />} />
          <Route path="/m/:slug" element={<MerkLink />} />
          <Route path="/kortingscodes/:slug" element={<CategoryPage />} />
          <Route path="/over-kortio" element={<OverKortio />} />
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
