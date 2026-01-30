import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export default function MerkToevoegen() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 py-16">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto mt-8 md:mt-12 bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-2xl font-bold mb-2">Merk toevoegen aan Kortio</h1>
            <p className="text-slate-600 mb-6">
              Wil je jouw merk onder de aandacht brengen via Kortio? Vul het
              korte formulier hieronder in en we nemen contact met je op.
            </p>

            <form
              action="https://formsubmit.co/info@kortio.app"
              method="POST"
              className="space-y-4"
            >
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_subject" value="Nieuw merk aangemeld via Kortio.app" />
              <input type="hidden" name="_next" value="https://www.kortio.app/bedankt" />

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
                <input type="url" name="Website" className="w-full px-3 py-2 border rounded" />
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

              <div className="flex items-center justify-end gap-3">
                <button type="reset" className="px-4 py-2 rounded border">Wis</button>
                <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">Versturen</button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}