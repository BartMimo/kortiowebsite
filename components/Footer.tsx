import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "./ui/Logo";
export function Footer() {
  return (
    <footer className="footer">
      <div className="site-container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link
              className="wordmark"
              to="/"
              aria-label="Kortio — naar de startpagina"
            >
              <Logo />
              kortio
            </Link>
            <p>
              Een beetje slimmer shoppen.
              <br />
              Vind, bewaar en gebruik kortingscodes van je favoriete merken.
            </p>
          </div>
          <nav aria-label="De app">
            <h2>De app</h2>
            <ul>
              <li>
                <Link to="/home#how-it-works">Hoe het werkt</Link>
              </li>
              <li>
                <Link to="/home#screenshots">Bekijk de app</Link>
              </li>
              <li>
                <Link to="/home#download">Download Kortio</Link>
              </li>
            </ul>
          </nav>
          <nav aria-label="Ontdekken">
            <h2>Ontdekken</h2>
            <ul>
              <li>
                <Link to="/merken">Alle merken</Link>
              </li>
              <li>
                <Link to="/merk-toevoegen">Merk aanmelden</Link>
              </li>
              <li>
                <Link to="/home#faq">Veelgestelde vragen</Link>
              </li>
            </ul>
          </nav>
          <nav aria-label="Contact en informatie">
            <h2>Goed om te weten</h2>
            <ul>
              <li>
                <Link to="/privacy">Privacybeleid</Link>
              </li>
              <li>
                <a href="mailto:info@kortio.app">Contact</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Kortio. Alle rechten voorbehouden.</p>
          <p className="footer-signature">
            Gemaakt voor een fijn voordeel.
            <Heart aria-hidden="true" />
          </p>
        </div>
      </div>
    </footer>
  );
}
