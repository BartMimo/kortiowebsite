import { Heart, Layers, Zap } from "lucide-react";
const features = [
  {
    icon: Zap,
    title: "Snel naar je korting.",
    text: "Geen eindeloos rondklikken. Zoek je merk, bekijk de korting en kopieer de code.",
  },
  {
    icon: Heart,
    title: "Jouw merken, bij elkaar.",
    text: "Sla je favorieten op. Dan hoef je ze de volgende keer niet opnieuw te zoeken.",
  },
  {
    icon: Layers,
    title: "Ook voor je eigen codes.",
    text: "Zelf een code gevonden? Bewaar ’m privé in de app, zodat je ’m altijd bij de hand hebt.",
  },
];
export function Features() {
  return (
    <section id="features" className="section">
      <div className="site-container">
        <div className="section-heading">
          <div>
            <div className="section-label">Gemaakt voor makkelijk</div>
            <h2 className="section-title">Precies wat je nodig hebt.</h2>
          </div>
        </div>
        <div className="features-grid">
          {features.map(({ icon: Icon, title, text }) => (
            <article className="feature-card" key={title}>
              <Icon aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
