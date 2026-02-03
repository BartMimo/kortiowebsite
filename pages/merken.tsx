import React, { useEffect, useState, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import { Search, ExternalLink, Tag, Sparkles, ArrowRight } from 'lucide-react';

type Brand = {
  id: string;
  name: string;
  discount_text: string;
  code?: string | null;
  website_url?: string | null;
  category_name?: string | null;
};

const MerkenPage: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const { data } = await supabase.from('admin_brands_overview').select('*').order('name', { ascending: true });
        if (!mounted) return;
        setBrands((data ?? []) as Brand[]);
      } catch (err) {
        console.error('Failed to load brands', err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const filteredBrands = useMemo(() => {
    if (!search) return brands;
    return brands.filter(b =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.discount_text.toLowerCase().includes(search.toLowerCase()) ||
      (b.category_name && b.category_name.toLowerCase().includes(search.toLowerCase()))
    );
  }, [brands, search]);

  const gradients = [
    'from-blue-500 to-purple-600',
    'from-green-500 to-teal-600',
    'from-pink-500 to-rose-600',
    'from-indigo-500 to-cyan-600',
    'from-orange-500 to-red-600',
    'from-emerald-500 to-green-600',
    'from-violet-500 to-purple-600',
    'from-cyan-500 to-blue-600',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-6 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium">Ontdek geweldige deals</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white to-pink-100 bg-clip-text text-transparent">
              Alle Merken
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Vind je favoriete merken en profiteer van de beste kortingscodes en aanbiedingen
            </p>
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Zoek een merk of categorie..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Brands Grid */}
      <section className="relative -mt-12 pb-24">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="bg-white rounded-3xl p-8 shadow-xl animate-pulse">
                  <div className="h-6 bg-slate-200 rounded mb-4"></div>
                  <div className="h-4 bg-slate-200 rounded mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <p className="text-slate-600 text-lg">
                  {filteredBrands.length} merk{filteredBrands.length !== 1 ? 'en' : ''} gevonden
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBrands.map((brand, index) => (
                  <article
                    key={brand.id}
                    className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100 overflow-hidden relative"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                          {brand.name.charAt(0)}
                        </div>
                        {brand.category_name && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
                            <Tag className="w-3 h-3" />
                            {brand.category_name}
                          </span>
                        )}
                      </div>

                      <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                        {brand.name}
                      </h2>

                      <p className="text-slate-600 mb-4 leading-relaxed">
                        {brand.discount_text}
                      </p>

                      {brand.code && (
                        <div className="mb-4">
                          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 px-4 py-2 rounded-xl font-mono text-sm font-semibold border border-indigo-100">
                            <span>{brand.code}</span>
                            <button
                              onClick={() => navigator.clipboard.writeText(brand.code!)}
                              className="hover:text-indigo-800 transition-colors"
                              title="Kopieer code"
                            >
                              📋
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        {brand.website_url ? (
                          <a
                            href={brand.website_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors duration-300 group-hover:translate-x-1 transform"
                          >
                            Bezoek website
                            <ArrowRight className="w-4 h-4" />
                          </a>
                        ) : (
                          <span></span>
                        )}
                        <div className="text-slate-400 text-sm">
                          Actief
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default MerkenPage;
