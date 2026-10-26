import { AppStoreButton, PlayStoreButton } from "./ui/AppStoreButton";
export function CTA() {
  return (
    <section className="download-section" id="download">
      <div className="site-container">
        <div className="download-panel">
          <div>
            <h2>
              Je volgende korting.
              <br />
              Binnen handbereik.
            </h2>
            <p>Download Kortio en vind je favoriete merken met voordeel.</p>
          </div>
          <div>
            <div className="download-buttons">
              <AppStoreButton theme="light" />
              <PlayStoreButton />
            </div>
            <p className="download-caption">
              Gratis voor iPhone en Android
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
