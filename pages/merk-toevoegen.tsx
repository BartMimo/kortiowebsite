import React, { useState, useRef, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';

export default function MerkToevoegen() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = e.currentTarget as HTMLFormElement;
    const fd = new FormData(form);

    // CC the submitter so they receive a copy (if provided)
    const email = fd.get('Email');
    if (email) fd.append('_cc', String(email));

    try {
        // send JSON to our serverless email API
        const payload: any = {};
        fd.forEach((v, k) => (payload[k] = v));

        const res = await fetch('/api/send-merk', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccess(true);
        form.reset();
      } else {
        const json = await res.json().catch(() => null);
        setError((json && json.message) || 'Er is iets misgegaan bij het verzenden.');
      }
    } catch (err: any) {
      setError(err?.message || 'Netwerkfout bij verzenden');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Merk toevoegen — Gratis kortingscode aanbieden via Kortio"
        description="Heb je een webshop? Voeg je merk en kortingscode gratis toe aan de Kortio app. Bereik duizenden gebruikers die actief op zoek zijn naar kortingscodes."
        canonical="/merk-toevoegen"
      />
      <Navbar />
      <main className="min-h-screen bg-slate-50 py-16">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto mt-8 md:mt-12 bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-2xl font-bold mb-2">Merk toevoegen aan Kortio</h1>
            <p className="text-slate-600 mb-6">
              Wil je jouw kortingscode aanbieden aan duizenden gebruikers die actief op zoek zijn naar aanbiedingen?
              Vul het formulier in en we voegen je merk gratis toe aan de Kortio app.
            </p>

            {success ? (
              <div className="rounded-md bg-green-50 border border-green-100 p-4">
                <strong className="block font-bold text-green-700">Verzonden</strong>
                <p className="text-sm text-slate-700">Bedankt — we hebben je aanvraag ontvangen. We sturen een kopie naar het opgegeven e-mailadres.</p>
              </div>
            ) : (
              <form className="space-y-4" ref={formRef} onSubmit={handleSubmit}>
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_subject" value="Nieuw merk aangemeld via Kortio.app" />

                <div>
                  <label className="block text-sm font-bold mb-1">Merknaam</label>
                  <input name="Merknaam" required className="w-full px-3 py-2 border rounded" />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1">Merkcode</label>
                  <input name="Merkcode" required className="w-full px-3 py-2 border rounded font-mono" />
                  <p className="text-xs text-slate-400 mt-1">Bijv. KORTIO10 (laat leeg als nog niet bekend)</p>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1">Omschrijving van de code</label>
                  <textarea
                    name="Omschrijving"
                    rows={2}
                    placeholder="Bijv. 20% Korting"
                    required
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1">Website</label>
                  <input
                    type="text"
                    name="Website"
                    placeholder="Bijv. www.test.nl"
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1">Periode van de code</label>
                  <input type="text" name="Periode" placeholder="Altijd geldig of bijv. 1 maart t/m 31 maart" className="w-full px-3 py-2 border rounded" />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1">Contact e-mail</label>
                  <input type="email" name="Email" placeholder="jouw@bedrijf.nl" required className="w-full px-3 py-2 border rounded" />
                  <p className="text-xs text-slate-400 mt-1">We gebruiken dit alleen om contact op te nemen over deze aanmelding.</p>
                </div>

                {error && <div className="text-sm text-red-600">{error}</div>}

                <div className="flex items-center justify-end gap-3">
                  <button type="reset" className="px-4 py-2 rounded border">Wis</button>
                  <button type="submit" disabled={submitting} className="px-4 py-2 rounded bg-blue-600 text-white">
                    {submitting ? 'Bezig...' : 'Versturen'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}