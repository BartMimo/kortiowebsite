import { ClipboardCopy, Search, ShoppingBag } from "lucide-react";
const steps = [
  {
    number: "01",
    icon: Search,
    title: "Vind je merk.",
    text: "Een nieuwe outfit, iets voor thuis of je dagelijkse boodschappen. Zoek het merk waar je wilt shoppen.",
  },
  {
    number: "02",
    icon: ClipboardCopy,
    title: "Pak je code.",
    text: "Bekijk de korting en kopieer de code met één tik. Geen ingewikkelde stappen of registratie.",
  },
  {
    number: "03",
    icon: ShoppingBag,
    title: "Shop met voordeel.",
    text: "Plak de code bij het afrekenen in de webshop. Check de voorwaarden en geniet van je korting.",
  },
];
export function HowItWorks() {
  return (
    <section id="how-it-works" className="section">
      <div className="site-container">
        <div className="section-heading">
          <div>
            <div className="section-label">Zo simpel is het</div>
            <h2 className="section-title">
              Van gevonden
              <br />
              naar goed gekocht.
            </h2>
          </div>
          <p className="section-copy">
            Drie kleine stappen.
            <br />
            Een fijn verschil bij het afrekenen.
          </p>
        </div>
        <div className="steps-grid">
          {steps.map(({ number, icon: Icon, title, text }) => (
            <article className="step-card" key={number}>
              <div className="step-top">
                <span className="step-number">{number}</span>
                <div className="step-icon">
                  <Icon size={22} aria-hidden="true" />
                </div>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
