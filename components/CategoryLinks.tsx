import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { categoryPages } from "../lib/categories";

// Links naar alle categoriepagina's (homepage en categoriepagina's zelf).
export function CategoryLinks({ current }: { current?: string }) {
  return (
    <section className="section category-links-section" aria-labelledby="category-links-title">
      <div className="site-container">
        <h2 id="category-links-title" className="section-title">
          {current ? "Andere categorieën" : "Kortingscodes per categorie"}
        </h2>
        <ul className="category-links">
          {categoryPages
            .filter((c) => c.slug !== current)
            .map((c) => (
              <li key={c.slug}>
                <Link to={`/kortingscodes/${c.slug}`}>
                  Kortingscodes {c.label.toLowerCase()}
                  <ArrowRight aria-hidden="true" />
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}
