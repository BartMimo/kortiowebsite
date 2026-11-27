// Unieke feiten per merk voor de merkpagina's (/m/<slug>), zodat Google ze niet als sjabloon met
// alleen een andere naam ziet. Alles komt van de eigen site van het merk, met bron. Onzekere of
// tegenstrijdige feiten zijn weggelaten. Opnieuw nalopen rond mei 2027: verzendkosten en
// retourregels veranderen. Key = slug van de merknaam (zie lib/slug.ts).

export type Fact = { text: string; source: string };
export type BrandContent = {
  about?: string;
  shipping?: Fact;
  returns?: Fact;
  savings?: Fact[];
  checked: string; // datum waarop de bronnen bekeken zijn
};

const checked = "2026-11-27";

export const brandContent: Record<string, BrandContent> = {
  "happy-size": {
    about:
      "Happy Size is een webshop voor dameskleding in grote maten. Je vindt er kleding voor elke gelegenheid, uit eigen collecties en van andere merken.",
    shipping: {
      text: "Artikelen die op voorraad zijn, worden binnen 3 tot 5 werkdagen geleverd.",
      source: "https://www.happy-size.nl/nl/leveringsvoorwaarden",
    },
    returns: {
      text: "Je hebt 14 dagen om te retourneren. Dat is gratis met het retourlabel dat in het pakket zit; je levert het pakket af bij een DHL-punt.",
      source: "https://www.happy-size.nl/nl/herroepingsrecht",
    },
    checked,
  },
  "xxl-nutrition": {
    about:
      "XXL Nutrition verkoopt sportvoeding en supplementen, zoals eiwitshakes en pre-workouts, voor krachtsporters en recreatieve sporters. De webshop levert in Nederland en België.",
    shipping: {
      text: "Verzenden kost €4,95; vanaf €60 is het gratis.",
      source: "https://xxlnutrition.com/nl/verzending",
    },
    savings: [
      {
        text: "Meld je aan voor de nieuwsbrief, dan krijg je een kortingscode van 10%.",
        source: "https://xxlnutrition.com/nl/xxl-nutrition-kortingscode",
      },
    ],
    checked,
  },
  "gina-tricot": {
    about:
      "Gina Tricot is een Zweeds modemerk uit Borås. Het verkoopt dameskleding zoals tops, breigoed, jeans, jassen en jurken, plus schoenen en accessoires, en heeft aparte lijnen voor tieners (Young) en petite.",
    shipping: {
      text: "Verzenden naar Nederland kost €4,90.",
      source: "https://www.ginatricot.com/nl/klantenservice/levering",
    },
    returns: {
      text: "Je kunt binnen 14 dagen retourneren. De retourkosten van €4,90 gaan van je terugbetaling af.",
      source: "https://www.ginatricot.com/nl/klantenservice/retourneren",
    },
    savings: [
      {
        text: "Nieuwe leden van de Gina Tricot club krijgen 10% korting op hun eerste aankoop. Die korting is 7 dagen geldig en geldt niet voor sieraden, collabs en cadeaubonnen.",
        source: "https://www.ginatricot.com/nl/member",
      },
      {
        text: "In de club spaar je stempels: na 5 aankopen krijg je een beloning. Leden krijgen ook verjaardagsaanbiedingen en eerder toegang tot de sale.",
        source: "https://www.ginatricot.com/nl/member",
      },
    ],
    checked,
  },
  aybl: {
    about:
      "AYBL is een sportkledingmerk voor vrouwen en mannen, met activewear en athleisure zoals leggings, sportbeha's, shorts, hoodies en joggers. Er zijn ook aparte collecties voor hardlopen en golf. Het merk verkoopt vooral online en via een eigen app.",
    shipping: {
      text: "Verzenden kost €6; vanaf €80 is het gratis. De levertijd is 1 tot 2 werkdagen.",
      source: "https://nl.aybl.com/pages/shipping",
    },
    returns: {
      text: "Retourneren kan binnen 30 dagen en is gratis in Nederland. Ruilen kan niet, en ondergoed en sokken zijn uitgesloten.",
      source: "https://nl.aybl.com/pages/returns",
    },
    savings: [
      {
        text: "Studenten krijgen 10% studentenkorting.",
        source: "https://nl.aybl.com/pages/student-discount",
      },
    ],
    checked,
  },
  "hang-eleven": {
    about:
      "Hang Eleven is een modemerk voor mannen met een eigen winkel aan de Haarlemmerdijk in Amsterdam. Het verkoopt onder meer truien, hoodies, jassen, overhemden, jeans en zwemkleding, plus accessoires zoals tassen en sokken.",
    shipping: {
      text: "Vanaf €150 is verzenden gratis. De levertijd is 1 tot 2 werkdagen.",
      source: "https://www.hang-eleven.com/policies/shipping-policy",
    },
    returns: {
      text: "Je kunt binnen 14 dagen retourneren. Ruilen is gratis; wil je je geld terug, dan betaal je de retourverzending. Retourneren in de winkel in Amsterdam is gratis.",
      source: "https://www.hang-eleven.com/policies/refund-policy",
    },
    savings: [
      {
        text: "Kies je bij een retour voor winkeltegoed, dan krijg je 115% van de aankoopwaarde terug.",
        source: "https://www.hang-eleven.com/policies/refund-policy",
      },
      {
        text: "Met een account spaar je mee in het loyaliteitsprogramma.",
        source: "https://www.hang-eleven.com/pages/rewards",
      },
    ],
    checked,
  },
  "mr-marvis": {
    about:
      "Mr Marvis is een Nederlands merk voor herenkleding dat vooral bekend is van zijn stretchbroeken en -shorts. Het verkoopt via de eigen webshop en eigen winkels, waaronder een in Amsterdam.",
    shipping: {
      text: "Verzenden is gratis. Bestel je voor 23:00, dan wordt je bestelling de volgende werkdag bezorgd.",
      source: "https://www.mrmarvis.com/shipment",
    },
    returns: {
      text: "Je hebt 100 dagen om gratis te ruilen of te retourneren (bezorging op het Nederlandse vasteland), zolang de labels er nog aan zitten.",
      source: "https://www.mrmarvis.com/pages/exchange-returns",
    },
    checked,
  },
  "smartphonehoesjes-nl": {
    about:
      "Smartphonehoesjes.nl is een Nederlandse webshop voor telefoonhoesjes en accessoires, ingedeeld per merk en toestel, zoals iPhone en Samsung Galaxy. Je kunt er ook een hoesje met je eigen foto laten maken.",
    shipping: {
      text: "Verzenden is gratis.",
      source: "https://www.smartphonehoesjes.nl/klantenservice/bestelling-levering/",
    },
    returns: {
      text: "Een retourlabel kost €2,50 als je je geld terug wilt en is gratis als je kiest voor een tegoedbon. Gepersonaliseerde hoesjes kun je niet retourneren.",
      source: "https://www.smartphonehoesjes.nl/klantenservice/retourneren-en-annuleringen/",
    },
    checked,
  },
  visiondirect: {
    about:
      "Visiondirect is een webwinkel voor contactlenzen. Je bestelt er dag-, maand- en andere lenzen, ook als voorraad voor een heel jaar.",
    shipping: {
      text: "Vanaf €49 is verzenden gratis.",
      source: "https://www.visiondirect.nl/info/waarom-visiondirect",
    },
    returns: {
      text: "Je hebt 365 dagen bedenktijd op ongeopende lenzen in de originele verpakking. Een gratis retourlabel vraag je aan via de klantenservice.",
      source: "https://www.visiondirect.nl/info/bedenktermijn",
    },
    checked,
  },
  loavies: {
    about:
      "Loavies is een modewebshop voor vrouwen met onder meer tops, breigoed, jeans, jassen, jurken en feestkleding, plus schoenen, accessoires en zwemkleding.",
    shipping: {
      text: "Verzenden kost €4,99; vanaf €75 is het gratis. Bestel je op een werkdag voor 23:00, dan wordt het de volgende werkdag bezorgd.",
      source: "https://www.loavies.com/nl/bezorgingen/",
    },
    returns: {
      text: "Je kunt binnen 14 dagen retourneren. De retourkosten gaan van je terugbetaling af: €2,99 voor de eerste drie artikelen en €0,99 per extra artikel (via een ServicePoint).",
      source: "https://www.loavies.com/nl/retouren/",
    },
    checked,
  },
  "ulla-popken": {
    about:
      "Ulla Popken is een modemerk voor vrouwen in grote maten, met onder meer tops, vesten, jassen en andere dameskleding. Het merk verkoopt online en in eigen winkels in Nederland.",
    shipping: {
      text: "Je kunt je bestelling gratis laten leveren in een Ulla Popken-winkel.",
      source: "https://www.ullapopken.nl/nl/winkellevering",
    },
    returns: {
      text: "Je hebt 14 dagen om te retourneren, zonder extra kosten via PostNL of in een winkel. Ruilen geldt als een nieuwe bestelling, met €4,95 verzendkosten.",
      source: "https://www.ullapopken.nl/nl/storno",
    },
    savings: [
      {
        text: "Met een Top Member-lidmaatschap (€19,99 per jaar) betaal je geen verzendkosten.",
        source: "https://www.ullapopken.nl/nl/topmember",
      },
    ],
    checked,
  },
  blakely: {
    about:
      "Blakely is een kledingmerk met een eigen Europese webshop. Het verkoopt dames- en herenkleding zoals hoodies, truien, jassen, jeans en sportkleding, plus kinderkleding onder de naam Mini Blakely.",
    shipping: {
      text: "Vanaf €99 is verzenden gratis.",
      source: "https://eu.blakelyclothing.com/",
    },
    savings: [
      {
        text: "Met het gratis spaarprogramma myBlakely verdien je punten op je aankopen.",
        source: "https://eu.blakelyclothing.com/pages/loyalty-rewards",
      },
    ],
    checked,
  },
  bamigo: {
    about:
      "Bamigo verkoopt herenkleding van bamboe, zoals ondergoed, sokken, shirts en nacht- en loungewear. Het merk staat vooral bekend om bamboe als materiaal.",
    returns: {
      text: "Je kunt binnen 30 dagen retourneren, onbeschadigd, schoon, ongewassen en in de originele verpakking. De retourkosten betaal je zelf, behalve bij een defect product.",
      source: "https://bamigo.com/nl/returns",
    },
    checked,
  },
  "vedder-vedder": {
    about:
      "Vedder & Vedder is een Amsterdams merk voor gepersonaliseerde sieraden, zoals kettingen, armbanden, ringen en oorbellen met een naam, letter of vingerafdruk. Het merk werd in 2016 opgericht door de tweelingzussen Anne en Esther Vedder.",
    shipping: {
      text: "Binnen de Benelux is de levertijd 1 tot 2 werkdagen; vanaf €150 is verzenden gratis.",
      source: "https://www.vedder-vedder.com/betaling-en-leveringsvoorwaarden",
    },
    returns: {
      text: "Niet-gepersonaliseerde sieraden met het label 'Retourneerbaar' kun je binnen 14 dagen na ontvangst ongedragen retourneren. Gepersonaliseerde sieraden kun je niet retourneren.",
      source: "https://www.vedder-vedder.com/retourneren",
    },
    checked,
  },
  "hippe-geboortekaartjes": {
    about:
      "Hippe Geboortekaartjes is een Nederlandse webshop voor geboortekaartjes, die ook in België levert. Daarnaast vind je er geboorteborden, enveloppen, stickers, traktaties, kraamcadeaus en zwangerschapsaankondigingen, veel daarvan op maat gemaakt.",
    shipping: {
      text: "Bestel je de definitieve kaartjes op een werkdag voor 18:00, dan worden ze binnen 1 tot 4 werkdagen geleverd. Andere producten duren meestal 3 tot 5 werkdagen.",
      source: "https://hippe-geboortekaartjes.nl/bezorging",
    },
    returns: {
      text: "Voor standaardproducten heb je 14 dagen herroepingsrecht. De meeste producten zijn maatwerk; die kun je niet retourneren.",
      source: "https://hippe-geboortekaartjes.nl/herroepingsrecht",
    },
    savings: [
      {
        text: "Je eerste proefdruk is gratis met de code GRATISPROEF.",
        source: "https://hippe-geboortekaartjes.nl/proefdruk",
      },
    ],
    checked,
  },
  lampen24: {
    about:
      "Lampen24 is een Nederlandse webshop voor verlichting voor binnen en buiten, van lampen en lichtbronnen tot slimme verlichting, kerstverlichting en plafondventilatoren. Er is ook een aparte afdeling voor zakelijke klanten.",
    shipping: {
      text: "Verzenden kost €2,95.",
      source: "https://www.lampen24.nl/verzendkosten",
    },
    returns: {
      text: "Je kunt binnen 30 dagen retourneren. Een retour kost €3,99 per aanmelding (€39,90 voor extra grote artikelen).",
      source: "https://www.lampen24.nl/service/retourneren",
    },
    savings: [
      {
        text: "Via de nieuwsbrief krijg je 10% korting op je eerste bestelling vanaf €99 (sommige merken zijn uitgesloten).",
        source: "https://www.lampen24.nl/",
      },
      {
        text: "Afgeprijsde lampen vind je in de sale en de outlet.",
        source: "https://www.lampen24.nl/c/outlet",
      },
    ],
    checked,
  },
  doonails: {
    about:
      "Doonails verkoopt nagelproducten voor thuis, zoals soft gel press-ons en UV-gelstrips, ook voor je teennagels, plus accessoires en nagelverzorging.",
    shipping: {
      text: "Verzenden kost €6,95 (€9,95 bij bestellingen tot €19,99); vanaf €59 is het gratis. De levertijd is 3 tot 5 werkdagen.",
      source: "https://nl.doonails.com/policies/shipping-policy",
    },
    returns: {
      text: "Doonails geeft 30 dagen geld-terug-garantie, ook op gebruikte producten. De retourzending betaal je zelf. Voor outlet-artikelen geldt alleen het wettelijke herroepingsrecht van 14 dagen.",
      source: "https://nl.doonails.com/pages/garantie",
    },
    savings: [
      {
        text: "In de gratis Doonails Club krijg je 100 punten bij aanmelding; 100 punten is €5 korting.",
        source: "https://nl.doonails.com/pages/doonails-club",
      },
      {
        text: "Breng je een vriend aan, dan krijgen jullie allebei €15 korting op een bestelling vanaf €60.",
        source: "https://nl.doonails.com/pages/doonails-club",
      },
    ],
    checked,
  },
  "tess-v": {
    about:
      "Tess V is een Nederlandse modewebshop met eigen winkels in onder meer Nijmegen, Utrecht, Breda, Groningen, Den Bosch en Eindhoven. Het verkoopt dameskleding, schoenen, accessoires en sieraden, en een eigen jeanslijn: Friday Denim.",
    shipping: {
      text: "Verzenden kost €3,99; vanaf €50 is het gratis. Bestel je op een werkdag voor 17:00, dan heb je het de volgende dag.",
      source: "https://www.tessv.nl/service/verzending/",
    },
    returns: {
      text: "Je kunt binnen 14 dagen retourneren; de retourkosten (vanaf €4,99 via DHL) betaal je zelf. Ruilen kan zonder verzendkosten voor de nieuwe bestelling.",
      source: "https://www.tessv.nl/service/ruilen-retourneren",
    },
    savings: [
      {
        text: "Op je eerste bestelling krijg je €5 korting.",
        source: "https://www.tessv.nl/service/veelgestelde-vragen/",
      },
    ],
    checked,
  },
  dreame: {
    about:
      "Dreame verkoopt huishoudelijke apparaten, vooral robotstofzuigers, dweilrobots, draadloze stofzuigers en tapijtreinigers. Daarnaast zijn er robotgrasmaaiers, luchtreinigers en haarverzorging zoals föhns, en in de Nederlandse webshop ook refurbished producten.",
    savings: [
      {
        text: "Met het inruilaanbod ruil je je oude apparaat in; de verzendkosten betaalt Dreame.",
        source: "https://nl.dreametech.com/pages/dreame-inruilaanbod",
      },
    ],
    checked,
  },
  "pink-gellac": {
    about:
      "Pink Gellac verkoopt producten voor gelnagels thuis, zoals gel-nagellak, gel-nagelstickers en press-on nagels, plus UV-lampen, nagelverzorging en startersets.",
    shipping: {
      text: "Thuisbezorgen kost €4,90 (€4,95 naar een afhaalpunt); vanaf €49 is verzenden gratis.",
      source: "https://pinkgellac.com/policies/shipping-policy",
    },
    returns: {
      text: "Je kunt binnen 30 dagen retourneren; de retourzending betaal je zelf.",
      source: "https://pinkgellac.com/policies/refund-policy",
    },
    savings: [
      {
        text: "Meld je aan bij Join the club, dan krijg je 10% korting.",
        source: "https://www.pinkgellac.com",
      },
      {
        text: "Met het Pink Premium Club-programma spaar je voor beloningen.",
        source: "https://pinkgellac.com/pages/rewards",
      },
    ],
    checked,
  },
  "air-up": {
    about:
      "Air up verkoopt drinkflessen die met geurpods werken: terwijl je water drinkt, ruik je een aroma, waardoor het water naar smaak lijkt. Je koopt er flessen, losse pods en accessoires. Het merk komt uit Duitsland.",
    returns: {
      text: "Je kunt binnen 14 dagen retourneren, ook een geopende fles. Een retourlabel vraag je aan op de retourpagina met je bestelnummer en e-mailadres.",
      source: "https://shop.air-up.com/nl/en/how-do-i-return-my-order",
    },
    checked,
  },
  "mim-amsterdam": {
    about:
      "MIM Amsterdam verkoopt hoesjes en accessoires voor telefoons, tablets en laptops, zoals hoesjes voor iPhone en Samsung, AirPods-hoesjes, laptopsleeves, screenprotectors, kabels en powerbanks.",
    shipping: {
      text: "Verzenden met track & trace kost €4,95; zonder track & trace is het gratis vanaf €29. Bestel je voor 14:00, dan gaat je pakket dezelfde werkdag de deur uit.",
      source: "https://www.mimamsterdam.com/nl/service/shipping-returns/",
    },
    returns: {
      text: "Je kunt binnen 14 dagen na ontvangst retourneren; de retourkosten betaal je zelf.",
      source: "https://www.mimamsterdam.com/nl/service/shipping-returns/",
    },
    checked,
  },
  "kapten-son": {
    about:
      "Kapten & Son is een Duits merk voor rugzakken, tassen, horloges en zonnebrillen, met een casual, stedelijke stijl. Het verkoopt vooral via de eigen webshop.",
    checked,
  },
  karwei: {
    about:
      "Karwei is een Nederlandse bouwmarktketen voor klussen, verbouwen, tuin en wonen, met winkels door het hele land en een webshop met gereedschap, verf, bouwmaterialen en tuinartikelen. Karwei hoort net als Gamma bij Intergamma.",
    checked,
  },
  "emma-sleep": {
    about:
      "Emma Sleep is een Duits merk dat online matrassen, boxsprings, bedden, toppers en kussens verkoopt, rechtstreeks aan consumenten. Je kunt een matras eerst thuis uitproberen tijdens een proefslaapperiode.",
    checked,
  },
  undiemeister: {
    about:
      "Undiemeister verkoopt herenondergoed, zoals boxershorts en boxer briefs, los en in multipacks. Het merk richt zich op mannen die hun ondergoed in vaste sets willen kopen.",
    shipping: {
      text: "Verzenden kost €4,99; vanaf €45 is het gratis. Bestel je op een werkdag voor 22:00, dan gaat het dezelfde dag de deur uit.",
      source: "https://undiemeister.com/pages/shipping",
    },
    returns: {
      text: "Je kunt binnen 30 dagen retourneren; de retourkosten betaal je zelf. Stuur je één artikel terug, dan kan dat als brievenbuspakket.",
      source: "https://undiemeister.com/pages/retouren",
    },
    savings: [
      {
        text: "Na aanmelding voor de nieuwsbrief (de Meisterbrief) krijg je gratis verzending.",
        source: "https://undiemeister.com/pages/shipping",
      },
      {
        text: "Multipacks geven tot 20% voordeel.",
        source: "https://undiemeister.com/pages/shipping",
      },
    ],
    checked,
  },
  rituals: {
    about:
      "Rituals is een Nederlands merk uit Amsterdam voor huis- en lichaamsverzorging, zoals douchegel, geurkaarsen, huisparfum en huidverzorging. Het is bekend om zijn eigen winkels en cadeausets.",
    shipping: {
      text: "Vanaf €35 is verzenden gratis.",
      source: "https://www.rituals.com/nl-nl/faq-overview",
    },
    checked,
  },
  pockies: {
    about:
      "Pockies verkoopt herenondergoed, zoals boxershorts zonder zakje, en daarnaast nachtkleding, hoodies, T-shirts, sokken en zwemkleding.",
    shipping: {
      text: "Verzenden kost €3,95 met Budbee of €4,95 met DHL of PostNL; vanaf €50 is het gratis. Bestel je voor 23:30, dan wordt het de volgende dag bezorgd.",
      source: "https://nl.pockies.com/pages/shipping",
    },
    savings: [
      {
        text: "Pockies heeft een eigen spaarprogramma: Pocket Points.",
        source: "https://nl.pockies.com/",
      },
    ],
    checked,
  },
  surfshark: {
    about:
      "Surfshark is een VPN-dienst die je internetverkeer versleutelt en je IP-adres verbergt. Je kiest uit drie pakketten (Starter, One en One+) en gebruikt de dienst via apps en browserextensies.",
    returns: {
      text: "Op alle pakketten geldt een geld-terug-garantie van 30 dagen.",
      source: "https://surfshark.com/nl/student-discount",
    },
    savings: [
      {
        text: "Studenten krijgen korting via Student Beans: je bevestigt je studentenstatus en vult de code in bij het afrekenen.",
        source: "https://surfshark.com/nl/student-discount",
      },
    ],
    checked,
  },
  "space-nk": {
    about:
      "Space NK is een Britse beautywinkel, begonnen in Londen, met winkels en een webshop. Je vindt er huidverzorging, make-up, haarverzorging en parfum van onafhankelijke en bekende merken.",
    checked,
  },
  "body-fit": {
    about:
      "Body & Fit is een webshop voor sportvoeding, zoals eiwitshakes, repen en supplementen, en voor sportkleding en accessoires. Er zijn producten van het eigen merk en van andere merken.",
    shipping: {
      text: "Vanaf €49 is verzenden gratis.",
      source: "https://www.bodyandfit.com/nl-nl/customer-service",
    },
    savings: [
      {
        text: "Body & Fit heeft een eigen klantenprogramma: de Body&Fit Club.",
        source: "https://www.bodyandfit.com/nl-nl/customer-service",
      },
    ],
    checked,
  },
  "fashion-musthaves": {
    about:
      "Fashion Musthaves is een Nederlandse webshop voor dameskleding, schoenen en accessoires, van jurken en tops tot sneakers en handtassen.",
    shipping: {
      text: "Voorraadartikelen die je voor 23:30 bestelt, worden dezelfde dag verzonden.",
      source: "https://www.fashionmusthaves.nl",
    },
    returns: {
      text: "Je kunt binnen 14 dagen retourneren. De retourkosten van €5,75 betaal je vooraf via iDEAL; het artikelbedrag krijg je volledig terug.",
      source: "https://www.fashionmusthaves.nl/retouren",
    },
    savings: [
      {
        text: "Meld je aan voor de nieuwsbrief, dan krijg je direct een code voor 10% korting.",
        source: "https://www.fashionmusthaves.nl",
      },
    ],
    checked,
  },
  halara: {
    about:
      "Halara is een online merk voor damesmode die is geïnspireerd op sportkleding en bedoeld is voor dagelijks gebruik, zoals leggings, jurken, tops en yogakleding. De Europese webshop levert ook in Nederland.",
    returns: {
      text: "Je kunt binnen 30 dagen retourneren, ongedragen en met het label er nog aan; de retourkosten betaal je zelf.",
      source: "https://eur.halara.com/pages/return-exchange",
    },
    checked,
  },
  superdry: {
    about:
      "Superdry is een Brits kledingmerk dat bekendstaat om jassen, hoodies en T-shirts met Japans geïnspireerde prints en logo's. Het verkoopt heren- en damesmode, schoenen en accessoires, in eigen winkels en via de webshop.",
    savings: [
      {
        text: "Meld je aan voor Superdry & Co Insider, dan krijg je 15% korting op je eerste bestelling.",
        source: "https://www.superdry.nl/",
      },
      {
        text: "Studenten krijgen korting via UNiDAYS.",
        source: "https://www.superdry.nl/",
      },
    ],
    checked,
  },
  all4running: {
    about:
      "All4running is een Nederlandse webshop voor hardlopers, met hardloopschoenen (ook voor trail en wedstrijden), hardloopkleding, accessoires en sportvoeding van merken als ASICS, adidas, HOKA, Nike en Saucony.",
    shipping: {
      text: "Verzenden kost €3,95; vanaf €50 is het gratis. Bestel je op een werkdag voor 23:00, dan gaat het dezelfde dag de deur uit en heb je het meestal de volgende dag.",
      source: "https://all4running.nl/klantenservice/bezorgen",
    },
    returns: {
      text: "Je kunt binnen 60 dagen retourneren. Een retour kost €3,95 als je hem online aanmeldt; bij ruilen of een verkeerd of kapot geleverd product betaal je niets.",
      source: "https://all4running.nl/retourneren",
    },
    savings: [
      {
        text: "In de uitverkoop vind je hardloopschoenen en -kleding met korting.",
        source: "https://all4running.nl/",
      },
    ],
    checked,
  },
  parfumdreams: {
    about:
      "Parfumdreams is een online parfumerie met parfum, make-up, gezichts- en lichaamsverzorging, haarverzorging en herenproducten, en ook natuurcosmetica en cadeausets.",
    shipping: {
      text: "Een bestelling wordt meestal binnen 3 tot 4 werkdagen bezorgd via PostNL.",
      source: "https://www.parfumdreams.nl/verzendkosten",
    },
    returns: {
      text: "Ongebruikte, ongeopende artikelen in de originele verpakking kun je binnen 180 dagen retourneren.",
      source: "https://www.parfumdreams.nl/180-dagen-recht-van-teruggave",
    },
    checked,
  },
  "kosso-nutrition": {
    about:
      "Kosso Nutrition is een Nederlandse webshop voor sportsupplementen, zoals pre-workout, proteïne, creatine, vitamines en mass gainers, aangevuld met voeding, drinken en kleding. Op de site staat ook een gratis generator voor een voedings- en trainingsplan.",
    shipping: {
      text: "Verzenden kost €5,95; vanaf €70 is het gratis. Bestel je voor 23:30, dan heb je het binnen 1 tot 2 werkdagen (DHL).",
      source: "https://kossonutrition.nl/pages/shipping-policy",
    },
    returns: {
      text: "Een retour meld je binnen 14 dagen na ontvangst aan; daarna heb je 14 dagen om het pakket terug te sturen.",
      source: "https://kossonutrition.nl/pages/shipping-policy",
    },
    savings: [
      {
        text: "Vraag je per e-mail een persoonlijk supplementenplan aan, dan krijg je 10% korting op je eerste bestelling.",
        source: "https://kossonutrition.nl/",
      },
      {
        text: "Met het gratis spaarprogramma krijg je 3 punten per euro; 100 punten is €1 korting en punten verlopen niet.",
        source: "https://kossonutrition.nl/pages/loyalty",
      },
    ],
    checked,
  },
  "ideal-of-sweden": {
    about:
      "IDEAL of Sweden is een Zweeds merk voor telefoonaccessoires, met hoesjes voor iPhone en Samsung Galaxy, screenprotectors, MagSafe-accessoires, AirPods-hoesjes, opladers en powerbanks, en horlogebandjes voor onder meer Apple Watch.",
    savings: [
      {
        text: "Word lid van Club IDEAL, dan krijg je 10% korting op je eerste aankoop en 100 punten als welkomstcadeau.",
        source: "https://idealofsweden.nl/",
      },
      {
        text: "In de outlet vind je afgeprijsde artikelen.",
        source: "https://idealofsweden.nl/",
      },
    ],
    checked,
  },
  orangebag: {
    about:
      "Orangebag is een Nederlandse online modeboetiek voor dames en heren, met kleding, schoenen, accessoires, lingerie, badmode en cosmetica van meer dan 130 merken.",
    shipping: {
      text: "Verzenden kost €4,95. Bestel je op een werkdag voor 21:45, dan gaat het dezelfde dag de deur uit.",
      source: "https://www.orangebag.nl/nl/veelgestelde-vragen/verzenden",
    },
    returns: {
      text: "Je kunt binnen 30 dagen retourneren; €4,95 retourkosten gaan van je terugbetaling af. Ruilen is gratis.",
      source: "https://www.orangebag.nl/nl/veelgestelde-vragen/retourneren",
    },
    savings: [
      {
        text: "In de Orange Club krijg je 5% bonus op de nieuwe collectie, die je kunt omzetten in een voucher.",
        source: "https://www.orangebag.nl/nl/veelgestelde-vragen/loyalty-programma",
      },
    ],
    checked,
  },
  "levi-s": {
    about:
      "Levi's is een Amerikaans kledingmerk uit San Francisco, bekend van de 501-jeans. Het verkoopt jeans, jassen, T-shirts en accessoires voor heren, dames en kinderen.",
    shipping: {
      text: "Standaard verzenden met PostNL kost €5,99 en duurt 2 tot 3 werkdagen; express met UPS kost €9,99.",
      source: "https://www.levi.com/NL/nl_NL/info/shipping",
    },
    returns: {
      text: "Je kunt binnen 28 dagen na bezorging gratis retourneren.",
      source: "https://www.levi.com/NL/nl_NL/legal/terms-and-conditions",
    },
    savings: [
      {
        text: "Studenten krijgen 20% korting op artikelen voor de volle prijs; dat is niet te combineren met andere acties.",
        source: "https://www.studentbeans.com/student-discount/nl/levi-s",
      },
      {
        text: "Nieuwe abonnees op de nieuwsbrief krijgen 10% korting.",
        source: "https://www.levi.com/NL/nl_NL/legal/terms-and-conditions",
      },
    ],
    checked,
  },
  nike: {
    about:
      "Nike is een Amerikaans sportmerk uit Oregon dat schoenen, kleding en accessoires maakt voor hardlopen, voetbal, basketbal, training en vrije tijd, met bekende lijnen als Air Max, Air Force 1 en Jordan.",
    shipping: {
      text: "Verzenden kost €5 en duurt 2 tot 6 werkdagen. Voor Nike Members is verzenden gratis vanaf €50, voor gasten vanaf €99.",
      source: "https://www.nike.com/nl/help/a/verzending-levering",
    },
    returns: {
      text: "Je kunt binnen 30 dagen gratis retourneren. Nike By You-producten kun je niet retourneren.",
      source: "https://www.nike.com/nl/help/a/retourbeleid",
    },
    savings: [
      {
        text: "Met een gratis Nike Membership krijg je gratis verzending vanaf €50, ledenacties en eerder toegang tot nieuwe releases.",
        source: "https://www.nike.com/nl/help/a/voordelen-voor-members",
      },
      {
        text: "Studenten krijgen korting nadat ze hun studentenstatus hebben bevestigd.",
        source: "https://www.nike.com/nl/help/a/voordelen-voor-members",
      },
    ],
    checked,
  },
  donnay: {
    about:
      "Donnay is een sport- en vrijetijdsmerk dat in 1910 begon met houten tennisrackets. Tegenwoordig verkoopt het basics zoals joggingpakken, shirts en shorts voor dames, heren en kinderen.",
    shipping: {
      text: "Verzenden binnen Nederland en België is gratis vanaf €50. Daaronder betaal je €6,95 (Nederland) of €7,95 (België). Bestel je op een werkdag voor 13:00, dan is het de volgende werkdag in huis.",
      source: "https://www.donnay.nl/service/shipping-returns/",
    },
    returns: {
      text: "Je hebt 14 dagen om te retourneren. Retourneren kost €1,99 per retour, de eerste omruiling is gratis.",
      source: "https://www.donnay.nl/service/shipping-returns/",
    },
    checked,
  },
  dryze: {
    about:
      "Dryze is een Nederlands merk uit Oosterhout dat haarstylingapparaten voor vrouwen verkoopt, zoals een airstyler en stijltangen, plus haarverzorging.",
    shipping: {
      text: "Verzenden binnen Nederland en België is gratis vanaf €50, altijd met track & trace. Bestel je op een werkdag voor 23:00, dan wordt het de volgende dag geleverd.",
      source: "https://dryze.nl/policies/shipping-policy",
    },
    returns: {
      text: "Je kunt 30 dagen risicovrij testen en gratis retourneren met een retourlabel. Op de apparaten zit 2 jaar garantie.",
      source: "https://dryze.nl/policies/refund-policy",
    },
    checked,
  },
  cheapfixit: {
    about:
      "Cheapfixit verkoopt refurbished zakelijke laptops van onder meer HP, Dell, Lenovo en Microsoft. Elke laptop wordt getest en gereinigd. Het bedrijf begon als reparatiewerkplaats en heeft een winkel in Werkendam.",
    shipping: {
      text: "Verzenden is gratis door heel Nederland. Bestel je voor 17:00 en is het op voorraad, dan wordt het dezelfde dag verzonden.",
      source: "https://www.cheapfixit.nl/pages/verzending",
    },
    returns: {
      text: "Je hebt 30 dagen bedenktijd en 24 maanden garantie. Het geld staat binnen 5 werkdagen na ontvangst van de retour terug.",
      source: "https://www.cheapfixit.nl/pages/retourneren",
    },
    checked,
  },
  "the-jeweller": {
    about:
      "The Jeweller is een online juwelier die in 1993 begon als familiebedrijf met twee winkels. Je koopt er gouden en zilveren sieraden, trouwringen en horloges, ook met gravure.",
    shipping: {
      text: "Verzenden binnen Nederland kost €5,90; vanaf €100 is het gratis. Bestel je op een werkdag voor 14:00, dan gaat het dezelfde dag op de post (artikelen die direct leverbaar zijn).",
      source: "https://www.thejewellershop.com/nl/informatie/verzending-en-levering",
    },
    returns: {
      text: "Je hebt 14 dagen om te retourneren. Sieraden met gravure of op maat gemaakt kun je niet terugsturen.",
      source: "https://www.thejewellershop.com/nl/service/retouren",
    },
    checked,
  },
  parfumbella: {
    about:
      "Parfumbella is een webshop met originele merkparfums voor dames en heren, plus make-up, nichegeuren en Arabische geuren.",
    shipping: {
      text: "Verzenden is gratis vanaf €50.",
      source: "https://www.parfumbella.nl/",
    },
    returns: {
      text: "Je kunt binnen 30 dagen retourneren als het product ongebruikt is, in de originele verpakking zit en de zegel nog heel is. De retourzending betaal je zelf.",
      source: "https://www.parfumbella.nl/retourneren/",
    },
    checked,
  },
  vevor: {
    about:
      "Vevor verkoopt gereedschap, machines en producten voor huis, tuin en werkplaats, zoals trolleys, ladders en opritten, tegen lage prijzen.",
    shipping: {
      text: "Bezorging is gratis.",
      source: "https://www.vevor.nl/cart",
    },
    returns: {
      text: "Je kunt binnen 30 dagen retourneren en je krijgt 12 maanden garantie.",
      source: "https://www.vevor.nl/cart",
    },
    checked,
  },
  kidzincolor: {
    about:
      "Kidzincolor is een Nederlandse webshop in Lemmer met kinderproducten met naam of opdruk, zoals knuffels, shoppers, mutsen, treintjes en etuis.",
    shipping: {
      text: "Verzenden is gratis vanaf €60 in Nederland en vanaf €75 in België. Normale levering duurt 2 tot 3 werkdagen.",
      source: "https://kidzincolor.com/klantenservice/",
    },
    returns: {
      text: "Je hebt 14 dagen om te annuleren en daarna nog 14 dagen om te retourneren. De retourkosten (circa €7,25 per pakket) betaal je zelf. Gepersonaliseerde items kun je niet retourneren.",
      source: "https://kidzincolor.com/retour-beleid-klachtenregeling/",
    },
    checked,
  },
};
