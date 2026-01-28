// We gebruiken hier geen imports om runtime loading issues te voorkomen in de browser omgeving.
// De componenten die deze types gebruiken zorgen zelf voor de juiste rendering.

export interface Feature {
  title: string;
  description: string;
  icon: any; // Gebruik any om import conflicten te vermijden
}

export interface Step {
  number: string;
  title: string;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
}