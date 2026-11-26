// Andere schrijfwijzen waarop mensen een merk in Google zoeken. Key = slug van de merknaam.
// Alleen toevoegen als de zoekterm echt anders is dan de naam in Kortio (bijv. "1608" voor "16/08"):
// de slug en dus de URL blijven gelijk.
const aliases: Record<string, string> = {
  "16-08": "1608",
  "holland-barret": "Holland & Barrett",
  "your-suprise": "YourSurprise",
  "my-protein-nl": "Myprotein",
  "ninja-kitchen": "SharkNinja",
  "athletic-bee": "Athletic Bees",
  "lampen-licht": "Lampenlicht",
};

export function brandAlias(slug: string): string | null {
  return aliases[slug] ?? null;
}

// "16/08 (1608)" als er een andere zoeknaam is, anders gewoon de naam.
export function nameWithAlias(name: string, slug: string): string {
  const alias = brandAlias(slug);
  return alias ? `${name} (${alias})` : name;
}
