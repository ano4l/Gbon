// Pillar C — Start & Grow: explainer cards, each linking out to the official page.
export const startGrow = [
  {
    id: 'register',
    institution: 'anpi',
    title: { fr: 'Créer et immatriculer son entreprise', en: 'Register your business' },
    text: {
      fr: 'Le guichet unique de l’ANPI-Gabon centralise l’immatriculation au RCCM, l’obtention du NIF et la déclaration CNSS. Compter 48 à 72 heures avec un dossier complet. Statuts, pièce d’identité et justificatif de domicile sont requis.',
      en: 'The ANPI-Gabon one-stop shop centralizes RCCM registration, NIF tax ID and CNSS declaration. Expect 48–72 hours with a complete file. Articles, ID and proof of address are required.',
    },
    steps: {
      fr: ['Choisir la forme juridique (EI, SARL, SA, SAS)', 'Déposer le dossier au guichet unique ou en ligne', 'Récupérer RCCM + NIF + attestation CNSS'],
      en: ['Choose legal form (EI, SARL, SA, SAS)', 'File at the one-stop shop or online', 'Collect RCCM + NIF + CNSS certificate'],
    },
  },
  {
    id: 'startup-label',
    institution: 'anpi',
    title: { fr: 'Le label startup (décret 2026)', en: 'The startup label (2026 decree)' },
    text: {
      fr: 'Le décret de labellisation des startups de 2026 crée un statut reconnu ouvrant l’accès à des avantages fiscaux, à des programmes d’accompagnement et à une visibilité auprès des acheteurs publics et privés. Il s’adresse aux jeunes entreprises innovantes immatriculées au Gabon.',
      en: 'The 2026 startup labellisation decree creates a recognized status opening access to tax benefits, support programs and visibility with public and private buyers. It targets young innovative companies registered in Gabon.',
    },
    steps: {
      fr: ['Être immatriculée depuis moins de 8 ans', 'Démontrer un caractère innovant', 'Déposer la demande auprès de l’ANPI-Gabon'],
      en: ['Registered for less than 8 years', 'Demonstrate innovation', 'Apply through ANPI-Gabon'],
    },
  },
  {
    id: 'tax-compliance',
    institution: 'dgi',
    title: { fr: 'Obtenir son attestation de régularité fiscale', en: 'Get your tax compliance certificate' },
    text: {
      fr: 'Pièce indispensable pour tout marché public et la plupart des financements. Délivrée par la DGI si vos déclarations et paiements sont à jour. Validité limitée : anticipez son renouvellement avant chaque soumission.',
      en: 'Essential for any public contract and most financing. Issued by the DGI when your filings and payments are up to date. Limited validity: renew before each bid.',
    },
    steps: {
      fr: ['Régulariser déclarations TVA / IS en retard', 'Demander l’attestation en ligne ou au centre des impôts', 'Vérifier la date de validité avant dépôt'],
      en: ['Regularize late VAT / corporate tax filings', 'Request the certificate online or at the tax office', 'Check validity date before filing'],
    },
  },
  {
    id: 'cnss',
    institution: 'cnss',
    title: { fr: 'Régularité sociale (CNSS)', en: 'Social compliance (CNSS)' },
    text: {
      fr: 'L’attestation CNSS certifie que vos cotisations sociales sont à jour. Elle est exigée dans les dossiers de soumission aux marchés publics et par de nombreux grands donneurs d’ordre privés.',
      en: 'The CNSS certificate confirms your social contributions are up to date. It is required in public tender files and by many large private buyers.',
    },
    steps: {
      fr: ['Déclarer tous vos salariés', 'Régler les cotisations trimestrielles', 'Demander l’attestation en agence'],
      en: ['Declare all employees', 'Pay quarterly contributions', 'Request the certificate at an agency'],
    },
  },
  {
    id: 'public-procurement-basics',
    institution: 'armp',
    title: { fr: 'Comprendre les marchés publics et le seuil PME', en: 'Understanding public procurement and the SME threshold' },
    text: {
      fr: 'Les marchés d’un montant inférieur à 150 millions FCFA sont réservés aux PME gabonaises. Pour y répondre : RCCM, attestations fiscale et CNSS à jour, et un dossier conforme au règlement de consultation. L’ARMP forme et traite les recours.',
      en: 'Contracts under 150 million FCFA are reserved for Gabonese SMEs. To bid: RCCM, valid tax and CNSS certificates, and a file compliant with the consultation rules. ARMP provides training and handles appeals.',
    },
    steps: {
      fr: ['Suivre les avis sur lejmp.com', 'Préparer un dossier administratif type', 'Répondre dans les délais indiqués dans l’avis'],
      en: ['Follow notices on lejmp.com', 'Prepare a standard administrative file', 'Respond within the deadline in the notice'],
    },
  },
  {
    id: 'kimba',
    institution: 'kimba',
    title: { fr: 'Se faire accompagner : Kimba Connect', en: 'Get support: Kimba Connect' },
    text: {
      fr: 'Programme d’accompagnement et de mise en réseau des entrepreneurs gabonais : ateliers, mentorat, mise en relation avec des financeurs. Un point d’entrée naturel pour structurer un projet avant de chercher un financement.',
      en: 'Support and networking program for Gabonese entrepreneurs: workshops, mentoring, investor introductions. A natural entry point to structure a project before seeking funding.',
    },
    steps: {
      fr: ['Créer un profil', 'Candidater à une cohorte', 'Participer aux ateliers et rencontres'],
      en: ['Create a profile', 'Apply to a cohort', 'Join workshops and meetups'],
    },
  },
  {
    id: 'diaspora',
    institution: 'anpi',
    title: { fr: 'Investir depuis la diaspora', en: 'Investing from the diaspora' },
    text: {
      fr: 'L’ANPI-Gabon accompagne les Gabonais de l’étranger souhaitant créer une entreprise au pays : immatriculation à distance via mandataire, orientation vers les incitations du Code des investissements, mise en relation avec les guichets sectoriels.',
      en: 'ANPI-Gabon supports Gabonese abroad wishing to start a business at home: remote registration via proxy, guidance on Investment Code incentives, connection to sector windows.',
    },
    steps: {
      fr: ['Désigner un mandataire au Gabon', 'Préparer statuts et pièces légalisées', 'Contacter le service diaspora de l’ANPI'],
      en: ['Appoint a proxy in Gabon', 'Prepare legalized articles and documents', 'Contact ANPI’s diaspora desk'],
    },
  },
]

// Pillar C — Funding programs
export const fundingPrograms = [
  {
    id: 'sgg-guarantee',
    institution: 'sgg',
    title: { fr: 'Garantie SGG sur crédit bancaire PME', en: 'SGG guarantee on SME bank loans' },
    amount: { fr: 'Jusqu’à 50–70 % du crédit garanti', en: 'Up to 50–70% of the loan guaranteed' },
    eligibility: {
      fr: 'PME immatriculées, en activité, avec états financiers et régularité fiscale. Le dossier est porté par la banque prêteuse.',
      en: 'Registered, operating SMEs with financial statements and tax compliance. The file is submitted by the lending bank.',
    },
    text: {
      fr: 'La SGG partage le risque avec la banque pour débloquer des crédits d’investissement ou de trésorerie que les PME n’obtiendraient pas seules. Demande à faire via votre banque.',
      en: 'SGG shares risk with the bank to unlock investment or working-capital loans SMEs would not obtain alone. Apply through your bank.',
    },
  },
  {
    id: 'anpi-window',
    institution: 'anpi',
    title: { fr: 'Guichets de financement ANPI-Gabon', en: 'ANPI-Gabon funding windows' },
    amount: { fr: 'Variable selon guichet (5 – 100 M FCFA)', en: 'Varies by window (5 – 100M FCFA)' },
    eligibility: {
      fr: 'Entreprises immatriculées portant un projet dans un secteur prioritaire (agro-industrie, numérique, tourisme, transformation locale).',
      en: 'Registered businesses with a project in a priority sector (agri-business, digital, tourism, local processing).',
    },
    text: {
      fr: 'L’ANPI oriente vers les fenêtres de financement ouvertes et accompagne le montage du dossier. Les appels à projets sont publiés périodiquement.',
      en: 'ANPI directs businesses to open funding windows and supports file preparation. Calls for projects are published periodically.',
    },
  },
  {
    id: 'bceg-loan',
    institution: 'bceg',
    title: { fr: 'Crédit PME — BCEG', en: 'SME loan — BCEG' },
    amount: { fr: '2 – 150 M FCFA', en: '2 – 150M FCFA' },
    eligibility: {
      fr: 'TPE et PME immatriculées avec au moins un exercice d’activité ; jeunes et femmes entrepreneurs prioritaires.',
      en: 'Registered micro and small businesses with at least one year of activity; youth and women entrepreneurs prioritized.',
    },
    text: {
      fr: 'Banque publique dédiée à l’entrepreneuriat. Crédits d’équipement et de trésorerie avec accompagnement, souvent combinés à une garantie SGG.',
      en: 'Public bank dedicated to entrepreneurship. Equipment and working-capital loans with support, often combined with an SGG guarantee.',
    },
  },
  {
    id: 'kimba-cohort',
    institution: 'kimba',
    title: { fr: 'Cohorte d’accompagnement Kimba Connect', en: 'Kimba Connect support cohort' },
    amount: { fr: 'Accompagnement + accès financeurs', en: 'Support + investor access' },
    eligibility: {
      fr: 'Entrepreneurs au stade idée à opérationnel, tous secteurs.',
      en: 'Entrepreneurs from idea to operating stage, all sectors.',
    },
    text: {
      fr: 'Programme structuré sur plusieurs mois : ateliers, mentorat, préparation à la levée de fonds et rencontres avec financeurs.',
      en: 'Multi-month structured program: workshops, mentoring, fundraising preparation and investor meetings.',
    },
  },
  {
    id: 'scholarship',
    institution: 'anpi',
    title: { fr: 'Bourses & subventions à la formation entrepreneuriale', en: 'Entrepreneurship training grants & scholarships' },
    amount: { fr: 'Frais de formation pris en charge', en: 'Training fees covered' },
    eligibility: {
      fr: 'Jeunes entrepreneurs de 18 à 35 ans, porteurs de projet ou dirigeants de TPE.',
      en: 'Young entrepreneurs aged 18–35, project holders or micro-business managers.',
    },
    text: {
      fr: 'Programmes de formation en gestion, comptabilité et réponse aux appels d’offres proposés par des partenaires publics et des bailleurs. Fiche illustrative.',
      en: 'Training programs in management, accounting and tender response offered by public partners and donors. Illustrative card.',
    },
  },
]

// Pillar C — Public-sector digest (illustrative summaries; always link to lejmp.com)
export const publicDigest = [
  {
    id: 'pd-1',
    ref: 'AOO N° 014/2026/MEN/DGMP',
    buyer: { fr: 'Ministère de l’Éducation nationale', en: 'Ministry of National Education' },
    title: {
      fr: 'Réhabilitation de 3 écoles primaires — Libreville (Nzeng-Ayong, PK8, Akébé)',
      en: 'Rehabilitation of 3 primary schools — Libreville (Nzeng-Ayong, PK8, Akébé)',
    },
    sector: 'btp',
    budget: '128 500 000 FCFA',
    smeReserved: true,
    deadline: '2026-10-14',
    summary: {
      fr: 'Travaux de toiture, peinture, électricité et sanitaires. Dossier : RCCM, attestations fiscale et CNSS, références de 2 chantiers similaires.',
      en: 'Roofing, painting, electrical and sanitary works. File: RCCM, tax and CNSS certificates, references for 2 similar sites.',
    },
  },
  {
    id: 'pd-2',
    ref: 'DC N° 087/2026/CHUL',
    buyer: { fr: 'Centre Hospitalier Universitaire de Libreville', en: 'Libreville University Hospital' },
    title: {
      fr: 'Fourniture de produits alimentaires frais pour la restauration hospitalière',
      en: 'Supply of fresh food products for hospital catering',
    },
    sector: 'agri',
    budget: '64 200 000 FCFA',
    smeReserved: true,
    deadline: '2026-09-30',
    summary: {
      fr: 'Marché annuel de livraison hebdomadaire de légumes, fruits et tubercules. Priorité aux producteurs locaux. Attestation sanitaire exigée.',
      en: 'Annual contract for weekly delivery of vegetables, fruit and tubers. Local producers prioritized. Health certificate required.',
    },
  },
  {
    id: 'pd-3',
    ref: 'AOO N° 022/2026/MTL',
    buyer: { fr: 'Ministère des Transports', en: 'Ministry of Transport' },
    title: {
      fr: 'Transport et manutention de matériel entre Owendo et Franceville',
      en: 'Transport and handling of equipment between Owendo and Franceville',
    },
    sector: 'logistics',
    budget: '96 750 000 FCFA',
    smeReserved: true,
    deadline: '2026-10-21',
    summary: {
      fr: 'Prestations de transport routier et ferroviaire sur 12 mois. Exigence : agrément transporteur et assurance marchandises.',
      en: '12-month road and rail transport services. Requirement: carrier licence and goods insurance.',
    },
  },
  {
    id: 'pd-4',
    ref: 'AOO N° 031/2026/MENUM',
    buyer: { fr: 'Ministère de l’Économie numérique', en: 'Ministry of Digital Economy' },
    title: {
      fr: 'Développement d’un portail de services aux usagers pour une administration déconcentrée',
      en: 'Development of a citizen services portal for a decentralized administration',
    },
    sector: 'tech',
    budget: '142 000 000 FCFA',
    smeReserved: true,
    deadline: '2026-11-05',
    summary: {
      fr: 'Conception, développement et maintenance 24 mois. Groupement autorisé. Références en développement web exigées.',
      en: 'Design, development and 24-month maintenance. Consortium bids allowed. Web development references required.',
    },
  },
  {
    id: 'pd-5',
    ref: 'AOO N° 009/2026/MTP',
    buyer: { fr: 'Ministère des Travaux publics', en: 'Ministry of Public Works' },
    title: {
      fr: 'Aménagement de voiries urbaines — Port-Gentil (quartier Grand-Village)',
      en: 'Urban road development — Port-Gentil (Grand-Village district)',
    },
    sector: 'btp',
    budget: '485 000 000 FCFA',
    smeReserved: false,
    deadline: '2026-10-28',
    summary: {
      fr: 'Marché supérieur au seuil PME — soumission en groupement recommandée pour les PME. Capacité financière et matériel lourd exigés.',
      en: 'Above the SME threshold — consortium bidding recommended for SMEs. Financial capacity and heavy equipment required.',
    },
  },
]

// Pillar C — Corporate/private supplier opportunities (sample listings)
export const corporateOpportunities = [
  {
    id: 'co-1',
    company: { fr: 'Opérateur pétrolier — Port-Gentil (exemple)', en: 'Oil operator — Port-Gentil (sample)' },
    title: {
      fr: 'Appel à fournisseurs locaux : restauration de base-vie et blanchisserie',
      en: 'Local supplier call: camp catering and laundry',
    },
    sector: 'hospitality',
    value: '35 – 60 M FCFA / an',
    location: 'portgentil',
    deadline: '2026-10-10',
    summary: {
      fr: 'Contrat-cadre 24 mois. Exigences : attestation sanitaire, CNSS à jour, capacité de 150 repas / jour.',
      en: '24-month framework contract. Requirements: health certificate, CNSS up to date, 150 meals / day capacity.',
    },
  },
  {
    id: 'co-2',
    company: { fr: 'Groupe de distribution — Libreville (exemple)', en: 'Retail group — Libreville (sample)' },
    title: {
      fr: 'Référencement de producteurs agricoles gabonais',
      en: 'Onboarding of Gabonese agricultural producers',
    },
    sector: 'agri',
    value: '8 – 25 M FCFA / an par producteur',
    location: 'libreville',
    deadline: '2026-12-15',
    summary: {
      fr: 'Programme « produit au Gabon » : fruits, légumes, œufs, produits transformés. Livraison hebdomadaire, paiement à 30 jours.',
      en: '“Made in Gabon” program: fruit, vegetables, eggs, processed goods. Weekly delivery, 30-day payment.',
    },
  },
  {
    id: 'co-3',
    company: { fr: 'Opérateur télécom (exemple)', en: 'Telecom operator (sample)' },
    title: {
      fr: 'Sous-traitance de maintenance de sites techniques — Haut-Ogooué',
      en: 'Subcontracted maintenance of technical sites — Haut-Ogooué',
    },
    sector: 'services',
    value: '42 M FCFA / an',
    location: 'franceville',
    deadline: '2026-09-25',
    summary: {
      fr: 'Entretien préventif, groupes électrogènes, sécurité de 18 sites. Équipe technique locale exigée.',
      en: 'Preventive maintenance, generators, security of 18 sites. Local technical team required.',
    },
  },
  {
    id: 'co-4',
    company: { fr: 'Banque commerciale (exemple)', en: 'Commercial bank (sample)' },
    title: {
      fr: 'Développement d’une application de collecte pour agents mobiles',
      en: 'Development of a field-agent collection app',
    },
    sector: 'tech',
    value: '28 M FCFA',
    location: 'libreville',
    deadline: '2026-10-31',
    summary: {
      fr: 'Application Android hors-ligne, synchronisation sécurisée. Ouvert aux startups labellisées.',
      en: 'Offline Android app with secure sync. Open to labelled startups.',
    },
  },
]

// Pillar C — Mindset & Capability
export const stories = [
  {
    id: 'story-1',
    name: 'Pélagie Mbadinga',
    role: { fr: 'Fondatrice, Ferme Ngounié Agro — Lambaréné', en: 'Founder, Ferme Ngounié Agro — Lambaréné' },
    title: {
      fr: '« Le premier contrat, je l’ai perdu pour une attestation. Le deuxième, je l’ai gagné. »',
      en: '“I lost the first contract over a certificate. I won the second one.”',
    },
    excerpt: {
      fr: 'Comment une productrice de Lambaréné est passée du marché de quartier à trois supermarchés de Libreville — et ce que la régularité fiscale a changé.',
      en: 'How a Lambaréné grower went from the local market to three Libreville supermarkets — and what tax compliance changed.',
    },
    readTime: 6,
    tone: 'gold',
  },
  {
    id: 'story-2',
    name: 'Jean-Baptiste Ondo',
    role: { fr: 'Gérant, Mbolo BTP Services — Libreville', en: 'Manager, Mbolo BTP Services — Libreville' },
    title: {
      fr: '« Seul, je plafonne à 120 millions. En groupement, on vise 400. »',
      en: '“Alone I cap out at 120 million. As a consortium, we aim for 400.”',
    },
    excerpt: {
      fr: 'Pourquoi un entrepreneur du BTP cherche un partenaire plutôt qu’un concurrent — et comment structurer un groupement crédible.',
      en: 'Why a construction entrepreneur looks for a partner rather than a competitor — and how to structure a credible consortium.',
    },
    readTime: 8,
    tone: 'forest',
  },
  {
    id: 'story-3',
    name: 'Aïcha Nziengui',
    role: { fr: 'Co-fondatrice, Akanda Digital — Libreville', en: 'Co-founder, Akanda Digital — Libreville' },
    title: {
      fr: '« Le label startup n’est pas une médaille, c’est une porte. »',
      en: '“The startup label isn’t a medal, it’s a door.”',
    },
    excerpt: {
      fr: 'Trois ingénieurs de l’INPTIC, un premier client institutionnel, et un dossier de labellisation préparé en trois semaines.',
      en: 'Three INPTIC engineers, a first institutional client, and a label application prepared in three weeks.',
    },
    readTime: 5,
    tone: 'ocean',
  },
]

export const media = [
  {
    id: 'm-1',
    type: 'podcast',
    title: { fr: 'Entreprendre au Gabon — série d’entretiens', en: 'Entrepreneurship in Gabon — interview series' },
    by: { fr: 'Podcast indépendant, Libreville', en: 'Independent podcast, Libreville' },
    text: {
      fr: 'Conversations longues avec des dirigeants de PME gabonaises sur le financement, les marchés publics et la résilience.',
      en: 'Long-form conversations with Gabonese SME leaders on funding, public procurement and resilience.',
    },
  },
  {
    id: 'm-2',
    type: 'video',
    title: { fr: 'Comment lire un avis d’appel d’offres en 10 minutes', en: 'How to read a tender notice in 10 minutes' },
    by: { fr: 'Atelier vidéo OSA Connect', en: 'OSA Connect video workshop' },
    text: {
      fr: 'Décryptage pas à pas d’un avis publié sur lejmp.com : pièces exigées, critères, délais.',
      en: 'Step-by-step breakdown of a lejmp.com notice: required documents, criteria, deadlines.',
    },
  },
  {
    id: 'm-3',
    type: 'podcast',
    title: { fr: 'Bâtir en Afrique francophone', en: 'Building in francophone Africa' },
    by: { fr: 'Sélection panafricaine', en: 'Pan-African selection' },
    text: {
      fr: 'Récits de fondateurs à Abidjan, Douala, Dakar et Libreville sur la croissance en contexte de marché étroit.',
      en: 'Founder stories from Abidjan, Douala, Dakar and Libreville on growing in small-market conditions.',
    },
  },
]

export const articles = [
  {
    id: 'a-1',
    title: { fr: 'La discipline avant le capital : 5 habitudes des PME qui durent', en: 'Discipline before capital: 5 habits of SMEs that last' },
    readTime: 4,
  },
  {
    id: 'a-2',
    title: { fr: 'Pourquoi le groupement est la voie d’accès aux grands marchés', en: 'Why consortium bidding is the path to large contracts' },
    readTime: 5,
  },
  {
    id: 'a-3',
    title: { fr: 'Refus de crédit : ce que la banque ne vous dit pas, et comment y répondre', en: 'Loan refused: what the bank doesn’t tell you, and how to respond' },
    readTime: 6,
  },
  {
    id: 'a-4',
    title: { fr: 'Tenir sa comptabilité quand on est seul : le minimum viable', en: 'Keeping accounts when you’re solo: the viable minimum' },
    readTime: 3,
  },
]
