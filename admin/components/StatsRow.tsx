import { Heart, Clipboard, Share2, AlertTriangle, Tag } from "lucide-react";

const Stat = ({ label, value, icon: Icon }: any) => (
  <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
    <Icon className="text-blue-400 mb-3" />
    <div className="text-3xl font-black">{value}</div>
    <div className="text-slate-400 text-sm">{label}</div>
  </div>
);

const StatsRow = ({ totals }: any) => (
  <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
    <Stat label="Merken" value={totals.brands} icon={Tag} />
    <Stat label="Favorieten" value={totals.favorites} icon={Heart} />
    <Stat label="Gekopieerd" value={totals.copied} icon={Clipboard} />
    <Stat label="Gedeeld" value={totals.shared} icon={Share2} />
    <Stat label="Gerapporteerd" value={totals.reported} icon={AlertTriangle} />
  </div>
);

export default StatsRow;