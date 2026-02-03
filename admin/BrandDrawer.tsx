import { Category } from "./types";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (e: React.FormEvent) => void;
  form: any;
  setForm: (fn: any) => void;
  categories: Category[];
  editing: boolean;
};

export default function BrandDrawer({
  open,
  onClose,
  onSave,
  form,
  setForm,
  categories,
  editing,
}: Props) {
  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />

      <div className="fixed right-0 top-0 h-full w-[440px] bg-white z-50 shadow-xl flex flex-col">
        <div className="px-6 py-5 border-b font-semibold text-lg">
          {editing ? "Merk bewerken" : "Nieuw merk"}
        </div>

        <form
          onSubmit={onSave}
          className="flex-1 overflow-y-auto px-6 py-4 space-y-4"
        >
          <Input
            label="Naam"
            value={form.name}
            onChange={v => setForm((f:any)=>({...f,name:v}))}
          />

          <Select
            label="Categorie"
            value={form.primary_category_id}
            options={categories.map(c => ({ value: c.id, label: c.name }))}
            onChange={v => setForm((f:any)=>({...f,primary_category_id:v}))}
          />

          <Input
            label="Website"
            value={form.website_url}
            onChange={v => setForm((f:any)=>({...f,website_url:v}))}
          />

          <Input
            label="Code"
            value={form.code}
            onChange={v => setForm((f:any)=>({...f,code:v}))}
          />

          <Textarea
            label="Code uitleg"
            value={form.discount_text}
            onChange={v => setForm((f:any)=>({...f,discount_text:v}))}
          />

          <Toggle
            label="Tijdelijke actie"
            checked={form.is_temporary}
            onChange={v => setForm((f:any)=>({...f,is_temporary:v}))}
          />

          {form.is_temporary && (
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="date"
                label="Van"
                value={form.valid_from}
                onChange={v => setForm((f:any)=>({...f,valid_from:v}))}
              />
              <Input
                type="date"
                label="Tot"
                value={form.valid_until}
                onChange={v => setForm((f:any)=>({...f,valid_until:v}))}
              />
            </div>
          )}

          <Toggle
            label="Uitgelicht"
            checked={form.is_featured}
            onChange={v => setForm((f:any)=>({...f,is_featured:v}))}
          />

          <Toggle
            label="Actief"
            checked={form.is_active}
            onChange={v => setForm((f:any)=>({...f,is_active:v}))}
          />
        </form>

        <div className="px-6 py-4 border-t flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-slate-600"
          >
            Annuleren
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white"
          >
            Opslaan
          </button>
        </div>
      </div>
    </>
  );
}

/* ───── small inputs ───── */

function Input({ label, value, onChange, type="text" }: any) {
  return (
    <div>
      <label className="text-xs text-slate-500">{label}</label>
      <input
        type={type}
        value={value ?? ""}
        onChange={e => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
      />
    </div>
  );
}

function Textarea({ label, value, onChange }: any) {
  return (
    <div>
      <label className="text-xs text-slate-500">{label}</label>
      <textarea
        value={value ?? ""}
        onChange={e => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border px-3 py-2 text-sm h-24"
      />
    </div>
  );
}

function Select({ label, value, options, onChange }: any) {
  return (
    <div>
      <label className="text-xs text-slate-500">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
      >
        <option value="">Kies…</option>
        {options.map((o:any)=>(
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

function Toggle({ label, checked, onChange }: any) {
  return (
    <label className="flex items-center gap-3 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={e=>onChange(e.target.checked)}
      />
      {label}
    </label>
  );
}