export const sectors = [
  { id: 'btp', label: { fr: 'BTP / Construction', en: 'Construction (BTP)' } },
  { id: 'hospitality', label: { fr: 'Hôtellerie & Restauration', en: 'Hospitality' } },
  { id: 'logistics', label: { fr: 'Transport & Logistique', en: 'Transport & Logistics' } },
  { id: 'agri', label: { fr: 'Agriculture & Agro-industrie', en: 'Agriculture & Agri-business' } },
  { id: 'retail', label: { fr: 'Commerce & Distribution', en: 'Retail & Distribution' } },
  { id: 'services', label: { fr: 'Services professionnels', en: 'Professional services' } },
  { id: 'tech', label: { fr: 'Numérique & Tech', en: 'Digital & Tech' } },
]

export const stages = [
  { id: 'idea', label: { fr: 'Idée / projet', en: 'Idea / project' }, hint: { fr: 'Pas encore immatriculée', en: 'Not yet registered' } },
  { id: 'registered', label: { fr: 'Immatriculée', en: 'Registered' }, hint: { fr: 'RCCM obtenu, peu ou pas d’activité', en: 'RCCM obtained, little or no activity' } },
  { id: 'operating', label: { fr: 'En activité', en: 'Operating' }, hint: { fr: 'Clients et chiffre d’affaires réguliers', en: 'Regular clients and revenue' } },
  { id: 'established', label: { fr: 'Établie', en: 'Established' }, hint: { fr: '3 ans et plus, équipe stable', en: '3+ years, stable team' } },
]

export const sizes = [
  { id: 'solo', label: { fr: 'Seul(e) ou 1–4 personnes', en: 'Solo or 1–4 people' }, hint: { fr: '< 30 M FCFA / an', en: '< 30M FCFA / yr' } },
  { id: 'small', label: { fr: '5–19 personnes', en: '5–19 people' }, hint: { fr: '30 – 250 M FCFA / an', en: '30 – 250M FCFA / yr' } },
  { id: 'medium', label: { fr: '20–99 personnes', en: '20–99 people' }, hint: { fr: '250 M – 2 Mds FCFA / an', en: '250M – 2bn FCFA / yr' } },
  { id: 'large', label: { fr: '100 personnes et plus', en: '100+ people' }, hint: { fr: '> 2 Mds FCFA / an', en: '> 2bn FCFA / yr' } },
]

export const locations = [
  { id: 'libreville', label: { fr: 'Libreville / Estuaire', en: 'Libreville / Estuaire' } },
  { id: 'portgentil', label: { fr: 'Port-Gentil / Ogooué-Maritime', en: 'Port-Gentil / Ogooué-Maritime' } },
  { id: 'franceville', label: { fr: 'Franceville / Haut-Ogooué', en: 'Franceville / Haut-Ogooué' } },
  { id: 'lambarene', label: { fr: 'Lambaréné / Moyen-Ogooué', en: 'Lambaréné / Moyen-Ogooué' } },
  { id: 'other', label: { fr: 'Autre province', en: 'Other province' } },
  { id: 'diaspora', label: { fr: 'Diaspora (projet au Gabon)', en: 'Diaspora (project in Gabon)' } },
]

export const needs = [
  { id: 'funding', label: { fr: 'Financement', en: 'Funding' } },
  { id: 'contracts', label: { fr: 'Contrats / marchés', en: 'Contracts / tenders' } },
  { id: 'partners', label: { fr: 'Partenaires', en: 'Partners' } },
  { id: 'mentorship', label: { fr: 'Mentorat', en: 'Mentorship' } },
  { id: 'skills', label: { fr: 'Compétences / formation', en: 'Skills / training' } },
]

export const complianceItems = [
  { id: 'rccm', label: { fr: 'Immatriculation RCCM', en: 'RCCM business registration' } },
  { id: 'nif', label: { fr: 'Numéro d’identification fiscale (NIF)', en: 'Tax ID number (NIF)' } },
  { id: 'tax', label: { fr: 'Attestation de régularité fiscale', en: 'Tax compliance certificate' } },
  { id: 'cnss', label: { fr: 'Attestation CNSS', en: 'CNSS certificate' } },
  { id: 'bank', label: { fr: 'Compte bancaire professionnel', en: 'Business bank account' } },
  { id: 'accounts', label: { fr: 'États financiers du dernier exercice', en: 'Last year’s financial statements' } },
]

export const seeking = [
  { id: 'funding', label: { fr: 'Financement', en: 'Funding' } },
  { id: 'clients', label: { fr: 'Clients', en: 'Clients' } },
  { id: 'cofounder', label: { fr: 'Co-fondateur', en: 'Co-founder' } },
  { id: 'mentor', label: { fr: 'Mentor', en: 'Mentor' } },
  { id: 'jointbid', label: { fr: 'Partenaire pour groupement', en: 'Joint-bid partner' } },
  { id: 'suppliers', label: { fr: 'Fournisseurs locaux', en: 'Local suppliers' } },
]

export const labelOf = (list, id, lang) => list.find((x) => x.id === id)?.label?.[lang] ?? id
