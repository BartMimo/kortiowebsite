import { Star, Clock, MoreVertical } from "lucide-react";

const BrandCard = ({ brand, onEdit }: any) => (
  <div
    className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-5
               hover:border-blue-500/40 transition relative group"
  >
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-lg font-semibold">{brand.name}</h3>
        <p className="text-sm text-slate-400">{brand.category_name}</p>
      </div>

      <button
        onClick={() => onEdit(brand)}
        className="opacity-0 group-hover:opacity-100 transition"
      >
        <MoreVertical />
      </button>
    </div>

    <p className="mt-3 text-sm text-slate-300 line-clamp-2">
      {brand.discount_text}
    </p>

    <div className="mt-4 flex flex-wrap gap-2">
      {brand.is_featured && (
        <Badge color="yellow" icon={<Star size={14} />}>
          Featured
        </Badge>
      )}
      {brand.is_temporary && (
        <Badge color="orange" icon={<Clock size={14} />}>
          Tijdelijk
        </Badge>
      )}
    </div>

    <div className="mt-4 grid grid-cols-4 text-sm text-slate-400">
      <Metric label="❤️" value={brand.favorites} />
      <Metric label="📋" value={brand.copied} />
      <Metric label="🔗" value={brand.shared} />
      <Metric label="⚠️" value={brand.reported} />
    </div>
  </div>
);
export default BrandCard;
const Metric = ({ label, value }: any) => (
  <div className="text-center">
    <div className="font-bold text-slate-200">{value}</div>
    <div className="text-xs">{label}</div>
  </div>
);

const Badge = ({ children, color, icon }: any) => {
  const colors: any = {
    yellow: "bg-yellow-400/20 text-yellow-300",
    orange: "bg-orange-400/20 text-orange-300",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${colors[color]}`}
    >
      {icon}
      {children}
    </span>
  );
};