// Categoriepagina's op /kortingscodes/<slug>. De slug is slugify(categorienaam in Supabase).
// Alleen categorieën met genoeg merken staan hier; voor de rest (Kinderen, Reizen) maken we
// geen pagina, anders wordt het een dunne pagina die Google niet wil tonen.

export type CategoryPage = {
  slug: string;
  dbName: string; // naam in de tabel categories
  label: string; // korte naam in links en kruimelpad
  heading: string; // H1
  titleTerm: string; // begin van de <title>, zoals mensen zoeken
  intro: string;
  tip: string;
  faq: { q: string; a: string }[];
  // Bekende merken (slugs) die als voorbeeld in de beschrijving komen, als ze actief zijn.
  // Gekozen op vertoningen in Search Console (okt-nov 2026).
  popular: string[];
};

export const categoryPages: CategoryPage[] = [
  {
    slug: "mode",
    popular: ["mr-marvis", "loavies", "gina-tricot", "hang-eleven", "ulla-popken", "bamigo"],
    dbName: "Mode",
    label: "Mode",
    heading: "Kortingscodes voor kleding en mode",
    titleTerm: "Kortingscodes kleding & mode",
    intro:
      "Kortingscodes voor kledingwinkels en modemerken, van basics en ondergoed tot jassen, jeans en accessoires. Tik op een code om hem te zien en te kopiëren, en plak hem bij het afrekenen in de webshop.",
    tip: "Let bij mode vooral op uitgesloten artikelen: veel codes gelden niet voor de sale, en sommige pas vanaf een minimum bestelbedrag.",
    faq: [
      {
        q: "Werken kortingscodes voor kleding ook op sale-artikelen?",
        a: "Dat verschilt per webshop. Veel modemerken sluiten afgeprijsde artikelen uit; andere geven juist extra korting op de sale. Of je code geldt, zie je in de winkelwagen nadat je hem hebt ingevuld.",
      },
      {
        q: "Kan ik twee kortingscodes tegelijk gebruiken?",
        a: "Meestal niet. De meeste webshops accepteren één code per bestelling. Kies dan de code die voor jouw winkelwagen de meeste korting geeft.",
      },
    ],
  },
  {
    slug: "sport",
    popular: ["halara", "all4running", "nike", "just-padel"],
    dbName: "Sport",
    label: "Sport",
    heading: "Kortingscodes voor sportkleding en sportartikelen",
    titleTerm: "Kortingscodes sportkleding & sport",
    intro:
      "Kortingscodes voor sportkleding, hardloopschoenen, padel- en tennisspullen en fitnessartikelen. Tik op een code om hem te zien en te kopiëren, en plak hem bij het afrekenen.",
    tip: "Sportwinkels sluiten soms bepaalde merken of nieuwe collecties uit. Staat er 'op geselecteerde artikelen', controleer dan in de winkelwagen of de korting wordt verrekend.",
    faq: [
      {
        q: "Geldt een kortingscode ook voor sportschoenen van grote merken?",
        a: "Niet altijd. Sommige webshops sluiten bepaalde merken of nieuwe collecties uit. De voorwaarden staan bij de actie in de webshop; in de winkelwagen zie je of de korting wordt toegepast.",
      },
      {
        q: "Krijg ik als student extra korting op sportkleding?",
        a: "Bij een deel van de sportmerken wel, vaak via Student Beans of UNiDAYS. Als we het hebben gevonden, staat het op de merkpagina in Kortio.",
      },
    ],
  },
  {
    slug: "wonen",
    popular: ["emma-sleep", "karwei", "lampen24", "geurwolkje"],
    dbName: "Wonen",
    label: "Wonen",
    heading: "Kortingscodes voor wonen en interieur",
    titleTerm: "Kortingscodes wonen & interieur",
    intro:
      "Kortingscodes voor verlichting, matrassen, klussen en woonaccessoires. Tik op een code om hem te zien en te kopiëren, en plak hem bij het afrekenen in de webshop.",
    tip: "Bij grote aankopen zoals een matras of lamp loont het om het minimum bestelbedrag te checken: veel woonwinkels geven pas korting vanaf een bepaald bedrag.",
    faq: [
      {
        q: "Gelden kortingscodes voor wonen ook voor grote artikelen?",
        a: "Meestal wel, maar bekijk de voorwaarden: sommige webshops sluiten meubels, aanbiedingen of bepaalde merken uit, of rekenen extra bezorgkosten voor grote artikelen.",
      },
      {
        q: "Wanneer zijn er de meeste kortingscodes voor wonen?",
        a: "Rond Black Friday, in de januari-uitverkoop en bij de wissel van seizoen geven woonwinkels vaak extra korting. Kortio werkt dit overzicht bij zodra er nieuwe codes zijn.",
      },
    ],
  },
  {
    slug: "beauty",
    popular: ["rituals", "visiondirect", "pink-gellac", "doonails", "space-nk"],
    dbName: "Beauty",
    label: "Beauty",
    heading: "Kortingscodes voor beauty en verzorging",
    titleTerm: "Kortingscodes beauty & verzorging",
    intro:
      "Kortingscodes voor huidverzorging, make-up, parfum, nagelproducten en contactlenzen. Tik op een code om hem te zien en te kopiëren, en plak hem bij het afrekenen.",
    tip: "Bij beautywinkels gelden codes soms niet voor bepaalde merken of voor cadeausets. In de winkelwagen zie je meteen of de korting wordt verrekend.",
    faq: [
      {
        q: "Werken kortingscodes voor beauty ook op parfum?",
        a: "Dat hangt af van de webshop. Parfum en luxe merken zijn vaker uitgesloten van acties. Lees de voorwaarden bij de code en controleer de korting in je winkelwagen.",
      },
      {
        q: "Krijg ik extra korting als ik me aanmeld voor de nieuwsbrief?",
        a: "Veel beautymerken geven een welkomstkorting bij aanmelding. Die kun je meestal niet combineren met een andere kortingscode.",
      },
    ],
  },
  {
    slug: "elektronica",
    popular: ["dreame", "smartphonehoesjes-nl", "ideal-of-sweden", "surfshark"],
    dbName: "Elektronica",
    label: "Elektronica",
    heading: "Kortingscodes voor elektronica en accessoires",
    titleTerm: "Kortingscodes elektronica & accessoires",
    intro:
      "Kortingscodes voor telefoonhoesjes, huishoudelijke apparaten, accessoires en digitale diensten zoals een VPN. Tik op een code om hem te zien en te kopiëren, en plak hem bij het afrekenen.",
    tip: "Bij elektronica gelden codes vaak alleen voor accessoires of voor bepaalde modellen. Controleer daarom voordat je betaalt of de korting op jouw product wordt verrekend.",
    faq: [
      {
        q: "Gelden kortingscodes voor elektronica ook voor nieuwe modellen?",
        a: "Niet altijd. Nieuwe modellen en aanbiedingen zijn vaak uitgesloten, en sommige codes gelden alleen voor accessoires. De voorwaarden staan bij de actie in de webshop.",
      },
      {
        q: "Hoe werkt een kortingscode voor een abonnement, zoals een VPN?",
        a: "Je vult de code in bij het afrekenen van het abonnement. De korting geldt vaak alleen voor de eerste periode; daarna betaal je het normale tarief.",
      },
    ],
  },
  {
    slug: "sportsupplementen",
    popular: ["body-fit", "kosso-nutrition", "upfront", "more-nutrition"],
    dbName: "Sportsupplementen",
    label: "Sportvoeding",
    heading: "Kortingscodes voor sportvoeding en supplementen",
    titleTerm: "Kortingscodes sportvoeding & supplementen",
    intro:
      "Kortingscodes voor eiwitpoeder, repen, creatine, vitamines en andere sportvoeding. Tik op een code om hem te zien en te kopiëren, en plak hem bij het afrekenen.",
    tip: "Sportvoeding koop je vaak in grotere hoeveelheden. Vergelijk daarom de prijs per kilo of per portie, ook nadat de korting is verrekend.",
    faq: [
      {
        q: "Gelden kortingscodes voor sportvoeding ook voor bundels?",
        a: "Dat verschilt per webshop. Bundels en aanbiedingen zijn soms uitgesloten. In de winkelwagen zie je of de korting wordt verrekend.",
      },
      {
        q: "Kan ik een kortingscode gebruiken voor een abonnement op sportvoeding?",
        a: "Soms wel, maar niet altijd. Een code geldt vaak alleen voor losse bestellingen of alleen voor de eerste levering.",
      },
    ],
  },
  {
    slug: "eten-drinken",
    popular: ["xxl-nutrition", "air-up", "picnic", "new-york-pizza"],
    dbName: "Eten & drinken",
    label: "Eten & drinken",
    heading: "Kortingscodes voor eten en drinken",
    titleTerm: "Kortingscodes eten & drinken",
    intro:
      "Kortingscodes voor boodschappen, maaltijden, koffie, drinkflessen en meer. Tik op een code om hem te zien en te kopiëren, en plak hem bij het afrekenen.",
    tip: "Bij eten en boodschappen gelden welkomstcodes vaak alleen voor je eerste bestelling, soms met een minimum bestelbedrag.",
    faq: [
      {
        q: "Gelden kortingscodes voor eten ook bij een tweede bestelling?",
        a: "Welkomstcodes zijn meestal alleen voor je eerste bestelling. Andere codes kun je vaker gebruiken; dat staat in de voorwaarden van de actie.",
      },
      {
        q: "Werken kortingscodes ook als ik bestel via de app van de winkel?",
        a: "Vaak wel: je vult de code in bij het afrekenen in de app of op de website. Sommige acties gelden alleen in de app of alleen online.",
      },
    ],
  },
];

export function categoryPageFor(categoryName: string | null | undefined) {
  if (!categoryName) return null;
  return categoryPages.find((c) => c.dbName === categoryName) ?? null;
}
