import { Check, Heart, UserRound } from "lucide-react";
export function Trust() {
  return (
    <section className="trust-section">
      <div className="site-container">
        <div className="trust-panel">
          <div>
            <div className="section-label">Lekker eenvoudig</div>
            <h2 className="section-title">
              Een goede korting.
              <br />
              Geen groot gedoe.
            </h2>
            <p className="section-copy">
              Kortio verkoopt je geen spullen. We helpen je een kortingscode te
              vinden voor iets dat je al wilt kopen. Jij kiest het merk. Wij
              houden het overzichtelijk.
            </p>
          </div>
          <div className="trust-list">
            <div>
              <Check aria-hidden="true" />
              <span>
                <strong>Gratis te gebruiken</strong>
                <small>Geen abonnement nodig om codes te vinden.</small>
              </span>
            </div>
            <div>
              <UserRound aria-hidden="true" />
              <span>
                <strong>Geen registratie nodig</strong>
                <small>Open de app en begin meteen met zoeken.</small>
              </span>
            </div>
            <div>
              <Heart aria-hidden="true" />
              <span>
                <strong>Jij houdt de regie</strong>
                <small>
                  Bekijk de voorwaarden en bepaal zelf wat je koopt.
                </small>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
