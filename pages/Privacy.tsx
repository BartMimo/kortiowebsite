export default function Privacy() {
  return (
    <main
      style={{
        maxWidth: 800,
        margin: "0 auto",
        padding: "3rem 1.5rem",
        lineHeight: 1.6,
        color: "#111827",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
        Privacybeleid
      </h1>

      <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
        Laatst bijgewerkt: 30 januari 2026
      </p>

      <p>
        Kortio (“wij”, “ons” of “onze”) hecht veel waarde aan jouw privacy. In dit
        privacybeleid leggen we uit welke gegevens wij verzamelen, waarom we dat
        doen en hoe we daarmee omgaan.
      </p>

      <h2 style={{ marginTop: "2.5rem" }}>1. Welke gegevens verzamelen wij?</h2>

      <p>
        Kortio verzamelt uitsluitend gegevens die nodig zijn om de app goed te
        laten functioneren.
      </p>

      <ul>
        <li>
          <strong>Gebruiksgegevens</strong>
          <br />
          Interacties binnen de app, zoals het bekijken van merken en het
          markeren van favorieten.
        </li>
        <li>
          <strong>Apparaatgegevens</strong>
          <br />
          Basisinformatie zoals apparaattype en iOS-versie (geanonimiseerd).
        </li>
      </ul>

      <p>
        Kortio verzamelt <strong>geen</strong> persoonsgegevens zoals:
      </p>

      <ul>
        <li>Naam, adres of e-mailadres</li>
        <li>Betaal- of bankgegevens</li>
        <li>Precieze locatiegegevens</li>
      </ul>

      <h2 style={{ marginTop: "2.5rem" }}>
        2. Waarvoor gebruiken wij deze gegevens?
      </h2>

      <p>De verzamelde gegevens worden gebruikt om:</p>

      <ul>
        <li>De app correct te laten functioneren</li>
        <li>Favorieten en voorkeuren op te slaan</li>
        <li>Inzicht te krijgen in het gebruik van de app</li>
        <li>De app verder te verbeteren</li>
      </ul>

      <h2 style={{ marginTop: "2.5rem" }}>3. Delen van gegevens</h2>

      <p>
        Kortio verkoopt of verhuurt geen gegevens aan derden en deelt geen
        persoonsgegevens voor commerciële doeleinden.
      </p>

      <p>
        Voor de technische werking van de app maken wij gebruik van
        infrastructuurdiensten, waaronder:
      </p>

      <ul>
        <li>
          <strong>Supabase</strong> – voor database- en backendfunctionaliteit
        </li>
      </ul>

      <p>
        Deze partijen verwerken gegevens uitsluitend in opdracht van Kortio en
        conform geldende privacywetgeving.
      </p>

      <h2 style={{ marginTop: "2.5rem" }}>4. Bewaartermijn</h2>

      <p>
        Gegevens worden niet langer bewaard dan noodzakelijk voor het
        functioneren van de app. Lokale gegevens kunnen op elk moment worden
        verwijderd door de app te verwijderen.
      </p>

      <h2 style={{ marginTop: "2.5rem" }}>5. Beveiliging</h2>

      <p>
        Wij nemen passende technische en organisatorische maatregelen om
        gegevens te beschermen tegen verlies, misbruik of onbevoegde toegang.
      </p>

      <h2 style={{ marginTop: "2.5rem" }}>6. Jouw rechten</h2>

      <p>Je hebt het recht om:</p>

      <ul>
        <li>Inzage te krijgen in de gegevens die wij verwerken</li>
        <li>Lokale appgegevens te verwijderen door de app te verwijderen</li>
      </ul>

      <h2 style={{ marginTop: "2.5rem" }}>7. Wijzigingen</h2>

      <p>
        Dit privacybeleid kan worden aangepast wanneer de app of wetgeving
        verandert. De meest actuele versie is altijd beschikbaar via deze pagina.
      </p>

      <h2 style={{ marginTop: "2.5rem" }}>8. Contact</h2>

      <p>
        Heb je vragen over dit privacybeleid? Neem dan contact met ons op via:
      </p>

      <p>
        <strong>E-mail:</strong>{" "}
        <a href="mailto:info@kortio.app">info@kortio.app</a>
      </p>
    </main>
  );
}