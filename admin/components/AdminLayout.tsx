import { ReactNode } from "react";
import { LayoutDashboard, LogOut } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../components/ui/Logo";

export const AdminLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/10 bg-slate-900/70 hidden lg:flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <Logo className="w-9 h-9" />
          <div>
            <div className="font-extrabold text-lg">Kortio</div>
            <div className="text-xs text-slate-400">Admin</div>
          </div>
        </div>

        <nav className="px-4 mt-6">
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold">
            <LayoutDashboard size={18} /> Dashboard
          </div>
        </nav>

        <div className="mt-auto p-4">
          <button
            onClick={() => supabase.auth.signOut().then(() => navigate("/login"))}
            className="w-full px-4 py-3 rounded-xl bg-red-600 text-white flex gap-3 items-center justify-center shadow-md"
          >
            <LogOut size={18} /> Uitloggen
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 bg-transparent">{children}</main>
    </div>
  );
};