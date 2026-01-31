import BrandCard from "./BrandCard";

const BrandGrid = ({ brands, onEdit }: any) => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
    {brands.map((b: any) => (
      <BrandCard key={b.id} brand={b} onEdit={onEdit} />
    ))}
  </div>
);

export default BrandGrid;