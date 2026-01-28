import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getUser();
      setAuthed(!!data.user);
      setLoading(false);
    };
    check();
  }, []);

  if (loading) return <div className="p-8">Controleren...</div>;
  if (!authed) return <Navigate to="/login" replace />;
  return children;
};
