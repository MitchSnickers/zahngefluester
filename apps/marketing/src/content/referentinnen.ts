/** Referentinnen und Referenten.
 *
 *  HERKUNFT: Slugs, Funktionsbezeichnungen und Biografien am 01.09.2026 aus den
 *  Einzelseiten von www.zahngefluester.com uebernommen (WordPress-REST-API).
 *  Die Texte sind WORTGLEICH uebernommen und nicht umformuliert - es sind
 *  fremde Selbstbeschreibungen, und die umzuschreiben ist nicht unsere
 *  Entscheidung.
 *
 *  BEFUND ZUR QUELLE: Die 15 Seiten auf .com sind keine Personenseiten, sondern
 *  Ankuendigungen einzelner Webinare - die meisten mit Terminen aus 2025, also
 *  laengst vorbei. Nur sieben enthalten ueberhaupt Text ueber die Person; bei
 *  den uebrigen acht steht dort ausschliesslich, worum es im jeweiligen Webinar
 *  ging.
 *
 *  Die Biografien von Jasmin und Lina lagen an einer dritten Stelle: auf
 *  /about-us/, nicht auf ihren eigenen Referentinnenseiten. Damit sind neun von
 *  fuenfzehn da; sechs fehlen und muessen von den beiden kommen.
 *
 *  ZWEI OFFENE ENTSCHEIDUNGEN, bewusst nicht selbst getroffen:
 *  1. Uneinheitliche Erzaehlform. Gassmann, Kersting, Bejta und Wittling
 *     schreiben in der Ich-Form, Steinert und Schaale werden in der dritten
 *     Person beschrieben. Fuer eine Uebersichtsseite ist eine einheitliche Form
 *     besser - aber jemandes selbstgeschriebenen Text umzuschreiben aendert
 *     seine Stimme. Das entscheiden die Kundinnen.
 *  2. Spaeter kommt das aus der instructors-Tabelle in Supabase. Bis dahin ist
 *     diese Datei die Quelle.
 */
export type Referentin = {
  slug: string;
  name: string;
  role: string;
  /** "PLATZHALTER" heisst: fehlt noch. Sobald echter Text hier steht, zeigt ihn
   *  die Einzelseite und der Platzhalterkasten verschwindet von selbst. */
  bio: string;
  /** Gruenderin von Zahngefluester - fuer die Sortierung und die Auszeichnung. */
  founder?: boolean;
  /** Anrede-Kurzform. Explizit statt aus dem Namen geraten: bei "Dr. Lina Dinse"
   *  liegt der Vorname in der Mitte, bei anderen woanders. Die Altseite schreibt
   *  selbst "Über Jasmin." und "Über Lina.". */
  shortName?: string;
  /** Mitgliedschaften, Auszeichnungen, Veroeffentlichungen. Wortgleich von der
   *  Live-Seite /about-us/ uebernommen. */
  credentials?: { label: string; text: string }[];
  /** Anmerkung fuer uns, nicht fuer die Website. */
  hinweis?: string;
};

export const referentinnen: Referentin[] = [
  {
    slug: "jasmin-matthes",
    name: "Jasmin Matthes",
    shortName: "Jasmin",
    role: "Dentalhygienikerin",
    founder: true,
    bio:
      "Ich bin Jasmin, Dentalhygienikerin seit 2011. Die Zahnmedizin ist bunt und voller Themen, " +
      "die in der regulären Ausbildung meistens zu kurz kommen. Mein Traum ist es, diese vielen " +
      "Themen zum Leben zu erwecken. Ich habe schon früh gemerkt, dass es immer wieder Patienten " +
      "gibt, bei denen der Therapieerfolg ausbleibt, obwohl beide Seiten ihr Bestes gegeben haben. " +
      "Die Weiterbildung zur ganzheitlichen Prophylaxeexpertin hat meinen Blick erweitert. Manche " +
      "„Baustellen“ liegen nicht in der 6-mm-Tasche, und nicht alles lässt sich durch die " +
      "Schulmedizin lösen. Mein Antrieb ist es, den Menschen zu helfen. Es gibt für mich kein " +
      "schöneres Gefühl; es bereitet mir einfach jeden Tag Freude. Die Parodontitistherapie ist " +
      "ein langer, teils lebenslanger Prozess, in dem man Menschen begleiten darf, sieht, wie sie " +
      "sich verändern und wachsen. Ihnen Impulse für ihre eigene Gesundheit geben zu können, ist " +
      "ein tolles Gefühl.",
    credentials: [
      { label: "Mitgliedschaft", text: "Anerkannte Fachexpertin im Berufsverband der deutschen Dentalhygienikerinnen" },
      { label: "Erfahrung", text: "Seit 2010 als ZMP (eazf), seit 2011 als DH (eazf) tätig" },
      { label: "Ganzheitlich", text: "Fokus auf umfassende Prophylaxe" },
      { label: "Ausgezeichnet", text: "Unter den Top drei Auszubildenden in Bayern, gefördert durch ein Stipendium" },
    ],
    hinweis: "Biografie und Qualifikationen stammen von /about-us/, nicht von der eigenen " +
             "Referentinnenseite - dort bricht die Funktionsbezeichnung mit einem Komma ab " +
             "(„Dentalhygienikerin,“). Auf der Altseite korrigieren lassen.",
  },
  {
    slug: "dr-lina-dinse",
    name: "Dr. Lina Dinse",
    shortName: "Lina",
    role: "Zahnärztin",
    founder: true,
    bio:
      "Ich bin Dr. Lina Dinse, und ich wollte schon immer Zahnärztin werden. Als Kind war ich " +
      "fasziniert von einer 60-jährigen Zahnärztin, die zur Gruppenprophylaxe in der Grundschule " +
      "war und die „Geheimnisse der Karies“ gelüftet hat. Da ist mein zahnmedizinisches Feuer " +
      "entbrannt. Es gibt kein Thema und keinen Bereich, der mich nicht interessiert, egal ob " +
      "klassisch schulmedizinisch oder über den Tellerrand hinaus – meine Begeisterung bleibt " +
      "stets bestehen. Wenn am Ende der Patient dann mit einem lachenden Gesicht die Praxis " +
      "verlässt, hat sich jeder Moment ausgezahlt.",
    credentials: [
      { label: "Mitgliedschaft", text: "Teil der renommierten Fachgesellschaft DG Paro" },
      { label: "Curriculum", text: "Aktuelle Fortbildung bei der DG Paro, Erweiterung ihrer Fachkompetenz" },
      { label: "Ausgezeichnet", text: "Gewinnerin des Prof. Schlegel Dissertationspreises" },
      { label: "Publikationen", text: "Veröffentlichungen zum Thema Dentalkeramik in den Fachzeitschriften Quintessenz Zahntechnik und Dental Materials" },
    ],
    hinweis: "Biografie und Qualifikationen stammen von /about-us/. " +
             "Auf der Live-Seite ist der Webinartext beschaedigt: die Ueberschrift " +
             "„Einfluss von Stress auf die Mundgesundheit“ ist mitten in den Absatz " +
             "gerutscht („Einfluss von S“ + Text + „tress auf die Mundgesundheit“). " +
             "Betrifft die Altseite, nicht den Neubau - aber jemand sollte es dort richten.",
  },
  {
    slug: "professor-dr-georg-gassmann",
    name: "Prof. Dr. Georg Gassmann",
    role: "Zahnarzt, Studiengangsleitung Dentalhygiene an der EUFH und Parodontologe",
    bio:
      "Herzlich Willkommen! Nach meiner Zahntechnikerlehre studierte ich in Köln Zahnmedizin " +
      "und arbeitete danach vier Jahre in einer Zahnarztpraxis in Köln/Rodenkirchen. Es folgte " +
      "ab 1998 die Weiterbildung zum DG PARO-Spezialist und Fachzahnarzt für Parodontologie " +
      "sowie die Promotion an der Universität Witten/Herdecke. Ich engagierte mich in " +
      "grundlagenorientierter und klinischer Forschung und in zahnärztlicher Fort- und " +
      "Weiterbildung als nationaler und internationaler Referent. Nach beruflichen Aufenthalten " +
      "in der Schweiz 2012–2013 an der interdisziplinären Äskulapklinik in Brunnen und in " +
      "Österreich 2014 an der Danube Private University in Krems, an der ich ein undergraduate " +
      "Curriculum für Alterszahnmedizin entwickelte und lehrte, übernahm ich 2014 die Leitung " +
      "des Studiengangs Dentalhygiene und Präventionsmanagement an der Praxishochschule. Doch " +
      "seit 2019 führe ich an der EUFH Hochschule für Gesundheit | Soziales | Pädagogik die " +
      "Studiengangsleitung fort.",
  },
  {
    slug: "pd-dr-dr-matthias-troeltzsch",
    name: "PD Dr. Dr. Matthias Tröltzsch",
    role: "Facharzt für Mund-, Kiefer- und Gesichtschirurgie",
    bio: "PLATZHALTER",
  },
  {
    slug: "dr-marion-kauderer",
    name: "Dr. Marion Kauderer",
    role: "Diplompsychologin, Gesundheitscoach",
    bio: "PLATZHALTER",
  },
  {
    slug: "katrin-kersting",
    name: "Katrin Kersting",
    role: "Referentin und Ökotrophologin",
    bio:
      "Moin, ich bin Katrin und darf meine Leidenschaft für die Ernährungsmedizin in der " +
      "dentalen Welt ausleben. Als ich mich mit 26 Jahren selbstständig gemacht habe, habe ich " +
      "direkt gemerkt, dass Vitamin D für viele Praxen der Einstieg in meine Welt der " +
      "Mikronährstoffe ist und habe darüber ein Buch geschrieben. Ich bin überzeugt davon, dass " +
      "(m)ein Leben für Abenteuer da ist, deswegen liegt mein privater Fokus auf meiner Freude " +
      "am Reisen, Backen, Handwerken und so viel mehr, dass ich mich immer gar nicht entscheiden " +
      "kann, was ich als erstes machen will.",
  },
  {
    slug: "tatjana-bejta",
    name: "Tatjana Bejta",
    role: "Dentalhygienikerin, Referentin und Aromatherapeutin",
    bio:
      "Herzlich willkommen! Ich bin Tatjana Bejta, Dentalhygienikerin und Referentin mit über " +
      "zwölf Jahren Erfahrung in der Branche. Meine Leidenschaft liegt im Bereich der " +
      "biologischen Mundhygiene, in dem ich mich spezialisiert habe, um die bestmögliche Pflege " +
      "zu bieten. Zusätzlich bin ich als Aromafachberaterin tätig. Darüber hinaus biete ich auch " +
      "Beratung im Bereich Ayurveda-Ernährung an, um die ganzheitliche Gesundheit zu unterstützen.",
  },
  {
    slug: "sanella-blatt",
    name: "Sanella Blatt",
    role: "Dentalhygienikerin, Referentin und Aromafachtherapeutin",
    bio: "PLATZHALTER",
  },
  {
    slug: "thea-wittling",
    name: "Thea Wittling",
    role: "Zahnmedizinische Prophylaxeangestellte, selbstständig in eigenem Dentalkosmetikstudio",
    bio:
      "Gelernte ZFA, danach fortgebildete ZMP. Seit 2008 habe ich mein eigenes " +
      "Dentalkosmetikstudio. Mir war es immer wichtig zusätzliche Fortbildungen im " +
      "zahnmedizinischen Bereich zu absolvieren. Ich liebe ganzheitliche Kinder- und " +
      "Erwachsenenprophylaxe. Ich habe eine Weiterbildung „Vitamin D in der Zahnarztpraxis“ " +
      "absolviert, bin Gesundheitsberaterin mit dem Schwerpunkt Zellgesundheit. Momentan mache " +
      "ich ein Fernstudium zur Nahrungsergänzungsmittel-Beraterin und eine Ausbildung zur " +
      "Fitnesstrainerin habe ich auch noch zwischendurch gemacht.",
    hinweis: "Der Text beginnt auf der Live-Seite mitten im Satz („gelernte ZFA, danach…“) - " +
             "die Einleitung stand dort offenbar in einer Ueberschrift. Erster Buchstabe " +
             "grossgeschrieben, ein Emoji am Ende weggelassen. Sonst wortgleich.",
  },
  {
    slug: "sonja-steinert",
    name: "Sonja Steinert",
    role: "Dentalhygienikerin, Darmtrainerin und Heilpraktikerin",
    bio:
      "Sonja ist Dentalhygienikerin, Heilpraktikerin A und Therapeutin für Frauengesundheit mit " +
      "einem ganzheitlichen Ansatz. Als zertifizierte Darm-, Detox- und Stress-Burnout-Trainerin " +
      "bringt sie umfassendes Wissen zu Themen wie Ernährung und Stressmanagement ein. In der " +
      "Dental Diversity Masterclass 2.0 teilt sie ihre langjährige Praxiserfahrung und fundierte " +
      "Expertise auf praxisnahe und wertschätzende Weise.",
  },
  {
    slug: "martina-schaale",
    name: "Martina Schaale",
    role: "Dentalhygienikerin, Ernährungsberaterin und Vitalstoffexpertin",
    bio:
      "Martina Schaale ist Dentalhygienikerin, Ernährungsberaterin und Vitalstoffexpertin mit " +
      "einem besonderen Fokus auf die Unterstützung von Krebspatienten in der zahnmedizinischen " +
      "Praxis. Mit ihrem Wissen zu Ernährung und Mikronährstoffen begleitet sie Patient:innen " +
      "während und nach onkologischen Behandlungen. In der Dental Diversity Masterclass 2.0 " +
      "teilt sie praxisorientierte Ansätze zur Verbesserung der Mundgesundheit und Lebensqualität.",
  },
  {
    slug: "katja-piecuch",
    name: "Katja Piecuch",
    role: "Dentalhygienikerin und Expertin für minimalinvasive Parodontaltherapie",
    bio: "PLATZHALTER",
  },
  {
    slug: "nicole-graw",
    name: "Nicole Graw",
    role: "Dentalhygienikerin und Spezialistin für Alterszahnmedizin",
    bio:
      "Nach dem Prinzip „Zahnarzt auf Rädern“ betreuen Nicole und Dr. Christian Graw seit Jahren " +
      "erfolgreich Pflegeeinrichtungen. Ihr Schwerpunkt ist die aufsuchende Zahnmedizin: wie sich " +
      "der Praxisalltag mit der Betreuung von Pflegeeinrichtungen verbinden lässt und wie " +
      "Patientinnen und Patienten dort individuell betreut werden können.",
    hinweis: "Der Ursprungstext beschreibt einen Vortrag („geben in dieser Präsentation…“). " +
             "Auf den biografischen Kern gekuerzt, ohne Umformulierung des Inhalts. " +
             "Von Nicole Graw freigeben lassen.",
  },
  {
    slug: "ann-kathrin-giglberger",
    name: "Ann-Kathrin Giglberger",
    role: "Dentalhygienikerin und Spezialistin für Periimplantitis",
    bio: "PLATZHALTER",
  },
  {
    slug: "claudia-bastian",
    name: "Claudia Bastian",
    role: "Dentalhygienikerin und Expertin für antientzündliche Ernährung",
    bio: "PLATZHALTER",
  },
];

export function referentinBySlug(slug: string) {
  return referentinnen.find((r) => r.slug === slug);
}
