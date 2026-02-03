import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const [status, setStatus] = useState<"loading" | "authed" | "guest">("loading");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setStatus(data.user ? "authed" : "guest");
    });
  }, []);

  if (status === "loading") {
    return <div style={{ padding: 40 }}>Controleren…</div>;
  }

  if (status === "guest") {
    return <Navigate to="/login" replace />;
  }

  return children;
}