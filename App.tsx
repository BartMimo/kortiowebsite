import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./components/LandingPage";
import { Login } from "./components/Login";
import Privacy from "./pages/Privacy";
import MerkToevoegen from "./pages/merk-toevoegen";
import MerkenPage from "./pages/merken";
import { RequireAuth } from "./components/RequireAuth";
import AdminDashboard from "./admin/AdminDashboard";

function App() {
  return (
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
    </Routes>
  );
}

export default App;