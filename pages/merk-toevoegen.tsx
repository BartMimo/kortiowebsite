export default function MerkToevoegen() {
  return (
    <main className="container">
      <section className="form-wrapper">
        <h1>Merk toevoegen aan Kortio</h1>
        <p>
          Wil je jouw merk onder de aandacht brengen via Kortio?
          Vul het formulier hieronder in en wij nemen contact met je op.
        </p>

        <form
          action="https://formsubmit.co/info@kortio.app"
          method="POST"
        >
          {/* Anti-spam */}
          <input type="hidden" name="_captcha" value="false" />

          {/* Onderwerp e-mail */}
          <input
            type="hidden"
            name="_subject"
            value="Nieuw merk aangemeld via Kortio.app"
          />

          {/* Redirect na verzenden */}
          <input
            type="hidden"
            name="_next"
            value="https://www.kortio.app/bedankt"
          />

          <label>
            Merknaam
            <input type="text" name="Merknaam" required />
          </label>

          <label>
            Merkcode
            <input type="text" name="Merkcode" required />
          </label>

          <label>
            Omschrijving van de code
            <textarea name="Omschrijving" rows="4" required />
          </label>

          <label>
            Website
            <input type="url" name="Website" required />
          </label>

          <label>
            Periode van de code
            <input type="text" name="Periode" placeholder="Bijv. 1 maart t/m 31 maart" required />
          </label>

          <button type="submit">Versturen</button>
        </form>
      </section>
    </main>
  );
}