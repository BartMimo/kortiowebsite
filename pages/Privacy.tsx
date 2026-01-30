import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export default function Privacy() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 pt-28 pb-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto mt-8 md:mt-12 bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Privacybeleid</h1>

            <p className="text-slate-500 mb-6">Laatst bijgewerkt: 30 januari 2026</p>

            <p className="text-slate-700 leading-relaxed">Kortio hecht veel waarde aan jouw privacy. In dit privacybeleid leggen we uit welke gegevens wij verzamelen, waarom we dat doen en hoe we daarmee omgaan.</p>

            <h2 className="mt-8 text-lg font-semibold">1. Welke gegevens verzamelen wij?</h2>

            <p className="text-slate-700">Kortio verzamelt uitsluitend gegevens die nodig zijn om de app goed te laten functioneren.</p>

            <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-700">
              <li>
                <strong>Gebruiksgegevens</strong>
                <div className="text-slate-600">Interacties binnen de app, zoals het bekijken van merken en het markeren van favorieten.</div>
              </li>
              <li>
                <strong>Apparaatgegevens</strong>
                <div className="text-slate-600">Basisinformatie zoals apparaattype en iOS-versie (geanonimiseerd).</div>
              </li>
            </ul>

            <p className="mt-4 text-slate-700">Kortio verzamelt <strong>geen</strong> persoonsgegevens zoals:</p>

            <ul className="list-disc pl-6 mt-3 space-y-1 text-slate-700">
              <li>Naam, adres of e-mailadres</li>
              <li>Betaal- of bankgegevens</li>
              <li>Precieze locatiegegevens</li>
            </ul>

            <h2 className="mt-8 text-lg font-semibold">2. Waarvoor gebruiken wij deze gegevens?</h2>

            <p className="text-slate-700">De verzamelde gegevens worden gebruikt om:</p>

            <ul className="list-disc pl-6 mt-3 space-y-1 text-slate-700">
              <li>De app correct te laten functioneren</li>
              <li>Favorieten en voorkeuren op te slaan</li>
              <li>Inzicht te krijgen in het gebruik van de app</li>
              <li>De app verder te verbeteren</li>
            </ul>

            <h2 className="mt-8 text-lg font-semibold">3. Delen van gegevens</h2>

            <p className="text-slate-700">Kortio verkoopt of verhuurt geen gegevens aan derden en deelt geen persoonsgegevens voor commerciële doeleinden.</p>

            <p className="text-slate-700">Voor de technische werking van de app maken wij gebruik van infrastructuurdiensten, waaronder:</p>

            <ul className="list-disc pl-6 mt-3 space-y-1 text-slate-700">
              <li>
                <strong>Supabase</strong> – voor database- en backendfunctionaliteit
              </li>
            </ul>

            <p className="mt-4 text-slate-700">Deze partijen verwerken gegevens uitsluitend in opdracht van Kortio en conform geldende privacywetgeving.</p>

            <h2 className="mt-8 text-lg font-semibold">4. Bewaartermijn</h2>

            <p className="text-slate-700">Gegevens worden niet langer bewaard dan noodzakelijk voor het functioneren van de app. Lokale gegevens kunnen op elk moment worden verwijderd door de app te verwijderen.</p>

            <h2 className="mt-8 text-lg font-semibold">5. Beveiliging</h2>

            <p className="text-slate-700">Wij nemen passende technische en organisatorische maatregelen om gegevens te beschermen tegen verlies, misbruik of onbevoegde toegang.</p>

            <h2 className="mt-8 text-lg font-semibold">6. Jouw rechten</h2>

            <p className="text-slate-700">Je hebt het recht om:</p>

            <ul className="list-disc pl-6 mt-3 space-y-1 text-slate-700">
              <li>Inzage te krijgen in de gegevens die wij verwerken</li>
              <li>Lokale appgegevens te verwijderen door de app te verwijderen</li>
            </ul>

            <h2 className="mt-8 text-lg font-semibold">7. Wijzigingen</h2>

            <p className="text-slate-700">Dit privacybeleid kan worden aangepast wanneer de app of wetgeving verandert. De meest actuele versie is altijd beschikbaar via deze pagina.</p>

            <h2 className="mt-8 text-lg font-semibold">8. Contact</h2>

            <p className="text-slate-700">Heb je vragen over dit privacybeleid? Neem dan contact met ons op via:</p>

            <p className="mt-2 text-slate-700"><strong>E-mail:</strong> <a className="text-blue-600 hover:underline" href="mailto:info@kortio.app">info@kortio.app</a></p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}