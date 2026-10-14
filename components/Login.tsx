import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, LockKeyhole } from "lucide-react";
import { Logo } from "./ui/Logo";
import { SEO } from "./SEO";
import { supabase } from "../lib/supabase";
export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  async function login(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error || !data.user)
        setError(
          "Inloggen lukt niet. Controleer je e-mailadres en wachtwoord.",
        );
      else navigate("/admin");
    } catch {
      setError("Er is geen verbinding. Probeer het opnieuw.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <SEO
        title="Beheer — Kortio"
        description="Beveiligde toegang tot het beheer van Kortio."
        noindex
      />
      <main className="login-page">
        <div className="login-wrap">
          <Link
            to="/"
            className="wordmark"
            aria-label="Kortio — naar de startpagina"
          >
            <Logo />
            kortio
          </Link>
          <div className="form-card login-card">
            <div className="step-icon">
              <LockKeyhole aria-hidden="true" />
            </div>
            <h1>Welkom terug.</h1>
            <p className="form-card-subtitle">
              Log in om merken en kortingscodes te beheren.
            </p>
            <form onSubmit={login} aria-busy={loading}>
              <fieldset disabled={loading} className="form-fields">
                <div className="field field-full">
                  <label htmlFor="login-email">E-mailadres</label>
                  <input
                    id="login-email"
                    type="email"
                    autoComplete="username"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="field field-full">
                  <label htmlFor="login-password">Wachtwoord</label>
                  <input
                    id="login-password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </fieldset>
              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}
              <button
                className="button button-primary"
                disabled={loading}
                style={{ width: "100%", marginTop: 25 }}
                type="submit"
              >
                {loading ? "Bezig met inloggen…" : "Inloggen"}
                <ArrowRight aria-hidden="true" />
              </button>
            </form>
          </div>
          <Link to="/" className="text-link">
            <ArrowLeft size={15} aria-hidden="true" />
            Terug naar de website
          </Link>
        </div>
      </main>
    </>
  );
}
