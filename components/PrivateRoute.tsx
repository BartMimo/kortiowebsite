// src/components/PrivateRoute.tsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const [status, setStatus] = useState<'loading' | 'authed' | 'guest'>('loading');

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setStatus(data.user ? 'authed' : 'guest');
    });
  }, []);

  if (status === 'loading') {
    return <div className="p-8">Controleren…</div>;
  }

  if (status === 'guest') {
    return <Navigate to="/login" replace />;
  }

  return children;
}