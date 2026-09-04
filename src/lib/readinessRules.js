// Simple, defensible client-side rule logic for the Readiness Check.
// Each rule returns { status: 'eligible' | 'almost' | 'notyet' | null, gaps: [...] , ... }
// status null = rule not relevant to this profile and hidden.

const hasAll = (answers, ids) => ids.every((id) => answers.compliance.includes(id))
const missing = (answers, ids) => ids.filter((id) => !answers.compliance.includes(id))

const gapText = {
  rccm: {
    fr: 'Immatriculer l’entreprise (RCCM) au guichet unique ANPI-Gabon',
    en: 'Register the business (RCCM) at the ANPI-Gabon one-stop shop',
    action: { type: 'resource', target: 'register' },
  },
  nif: {
    fr: 'Obtenir votre numéro d’identification fiscale (NIF)',
    en: 'Obtain your tax ID number (NIF)',
    action: { type: 'resource', target: 'register' },
  },
  tax: {
    fr: 'Obtenir une attestation de régularité fiscale à jour (DGI)',
    en: 'Obtain a valid tax compliance certificate (DGI)',
    action: { type: 'resource', target: 'tax-compliance' },
  },
  cnss: {
    fr: 'Obtenir une attestation de régularité CNSS',
    en: 'Obtain a CNSS compliance certificate',
    action: { type: 'resource', target: 'cnss' },
  },
  bank: {
    fr: 'Ouvrir un compte bancaire professionnel',
    en: 'Open a business bank account',
    action: { type: 'official', target: 'bceg' },
  },
  accounts: {
    fr: 'Produire les états financiers du dernier exercice',
    en: 'Produce last year’s financial statements',
    action: { type: 'network', target: 'services' },
  },
}

const statusFromGaps = (gaps, hardBlock = false) => {
  if (hardBlock) return 'notyet'
  if (gaps.length === 0) return 'eligible'
  return gaps.length <= 2 ? 'almost' : 'notyet'
}

export const rules = [
  {
    id: 'sme-contracts',
    title: {
      fr: 'Marchés publics réservés aux PME (< 150 M FCFA)',
      en: 'SME-reserved public contracts (< 150M FCFA)',
    },
    summary: {
      fr: 'Les marchés de moins de 150 millions FCFA sont réservés aux PME gabonaises immatriculées et en règle. Les avis sont publiés sur lejmp.com (DGMP).',
      en: 'Contracts under 150 million FCFA are reserved for registered, compliant Gabonese SMEs. Notices are published on lejmp.com (DGMP).',
    },
    official: 'lejmp',
    evaluate: (a) => {
      if (a.size === 'large') return null
      const relevant = a.needs.includes('contracts') || a.stage !== 'idea'
      if (!relevant) return null
      const req = ['rccm', 'nif', 'tax', 'cnss']
      const gaps = missing(a, req)
      const hard = a.stage === 'idea'
      return { status: statusFromGaps(gaps, hard), gaps, note: hard ? { fr: 'Une entreprise non immatriculée ne peut pas soumissionner.', en: 'An unregistered business cannot bid.' } : null }
    },
  },
  {
    id: 'sgg-guarantee',
    title: { fr: 'Garantie SGG sur un crédit bancaire', en: 'SGG guarantee on a bank loan' },
    summary: {
      fr: 'La Société Gabonaise de Garantie couvre une partie du risque de la banque pour débloquer un crédit d’investissement ou de trésorerie. La demande passe par votre banque.',
      en: 'The Société Gabonaise de Garantie covers part of the bank’s risk to unlock an investment or working-capital loan. Apply through your bank.',
    },
    official: 'sgg',
    evaluate: (a) => {
      if (!a.needs.includes('funding')) return null
      if (a.size === 'large') return null
      const req = ['rccm', 'nif', 'tax', 'bank', 'accounts']
      const gaps = missing(a, req)
      const hard = a.stage === 'idea' || a.stage === 'registered'
      return {
        status: statusFromGaps(gaps, hard),
        gaps,
        note: hard
          ? { fr: 'La SGG garantit des entreprises en activité avec un historique financier.', en: 'SGG guarantees operating businesses with a financial track record.' }
          : null,
      }
    },
  },
  {
    id: 'bceg-loan',
    title: { fr: 'Crédit PME auprès de la BCEG', en: 'SME loan from BCEG' },
    summary: {
      fr: 'La Banque pour le Commerce et l’Entrepreneuriat du Gabon finance TPE et PME immatriculées (2 à 150 M FCFA), avec accompagnement.',
      en: 'The Banque pour le Commerce et l’Entrepreneuriat du Gabon funds registered micro and small businesses (2 – 150M FCFA), with support.',
    },
    official: 'bceg',
    evaluate: (a) => {
      if (!a.needs.includes('funding')) return null
      if (a.size === 'large' || a.size === 'medium') return null
      const req = ['rccm', 'nif', 'bank']
      const gaps = missing(a, req)
      const hard = a.stage === 'idea'
      return { status: statusFromGaps(gaps, hard), gaps, note: null }
    },
  },
  {
    id: 'startup-label',
    title: { fr: 'Label startup (décret 2026)', en: 'Startup label (2026 decree)' },
    summary: {
      fr: 'Statut reconnu pour les jeunes entreprises innovantes immatriculées au Gabon, ouvrant l’accès à des avantages fiscaux et à des programmes dédiés. Demande auprès de l’ANPI-Gabon.',
      en: 'Recognized status for young innovative companies registered in Gabon, opening tax benefits and dedicated programs. Apply via ANPI-Gabon.',
    },
    official: 'anpi',
    evaluate: (a) => {
      const innovative = a.sector === 'tech' || a.sector === 'services' || a.sector === 'agri'
      if (!innovative) return null
      if (a.stage === 'established' && a.size !== 'solo' && a.size !== 'small') return null
      const gaps = missing(a, ['rccm', 'nif'])
      return { status: statusFromGaps(gaps, false), gaps, note: null }
    },
  },
  {
    id: 'anpi-window',
    title: { fr: 'Guichets de financement ANPI-Gabon', en: 'ANPI-Gabon funding windows' },
    summary: {
      fr: 'Fenêtres de financement et appels à projets pour les secteurs prioritaires (agro-industrie, numérique, tourisme, transformation locale).',
      en: 'Funding windows and calls for projects in priority sectors (agri-business, digital, tourism, local processing).',
    },
    official: 'anpi',
    evaluate: (a) => {
      if (!a.needs.includes('funding')) return null
      const priority = ['agri', 'tech', 'hospitality'].includes(a.sector)
      if (!priority) return null
      const gaps = missing(a, ['rccm', 'nif'])
      return { status: statusFromGaps(gaps, false), gaps, note: null }
    },
  },
  {
    id: 'kimba',
    title: { fr: 'Accompagnement Kimba Connect', en: 'Kimba Connect support program' },
    summary: {
      fr: 'Programme d’accompagnement et de mise en réseau : ateliers, mentorat, rencontres avec des financeurs. Ouvert dès le stade idée.',
      en: 'Support and networking program: workshops, mentoring, investor meetings. Open from the idea stage.',
    },
    official: 'kimba',
    evaluate: (a) => {
      const relevant = a.needs.includes('mentorship') || a.needs.includes('skills') || a.stage === 'idea' || a.stage === 'registered'
      if (!relevant) return null
      return { status: 'eligible', gaps: [], note: null }
    },
  },
  {
    id: 'register-first',
    title: { fr: 'Créer votre entreprise au guichet unique ANPI', en: 'Register your business at the ANPI one-stop shop' },
    summary: {
      fr: 'Tout commence ici : RCCM, NIF et déclaration CNSS en un seul dépôt. Compter 48 à 72 heures avec un dossier complet.',
      en: 'Everything starts here: RCCM, NIF and CNSS declaration in one filing. Expect 48–72 hours with a complete file.',
    },
    official: 'anpi',
    evaluate: (a) => {
      if (a.compliance.includes('rccm')) return null
      return { status: 'eligible', gaps: [], note: { fr: 'C’est la première étape qui débloque tout le reste.', en: 'This is the first step that unlocks everything else.' } }
    },
  },
  {
    id: 'joint-bid',
    title: { fr: 'Grands marchés via un groupement', en: 'Large contracts via a consortium' },
    summary: {
      fr: 'Au-dessus de 150 M FCFA, les marchés ne sont plus réservés aux PME. Un groupement avec une entreprise complémentaire permet d’atteindre la capacité exigée.',
      en: 'Above 150M FCFA, contracts are no longer SME-reserved. A consortium with a complementary business helps reach the required capacity.',
    },
    official: 'lejmp',
    networkFilter: 'jointbid',
    evaluate: (a) => {
      const relevant = (a.needs.includes('contracts') || a.needs.includes('partners')) && ['operating', 'established'].includes(a.stage)
      if (!relevant) return null
      const gaps = missing(a, ['rccm', 'tax', 'cnss', 'accounts'])
      return { status: statusFromGaps(gaps, false), gaps, note: null }
    },
  },
  {
    id: 'corporate-supplier',
    title: { fr: 'Fournisseur de grandes entreprises au Gabon', en: 'Supplier to large companies in Gabon' },
    summary: {
      fr: 'Les grands donneurs d’ordre (pétrole, mines, télécoms, distribution) référencent des fournisseurs locaux. La régularité fiscale et sociale est presque toujours exigée.',
      en: 'Large buyers (oil, mining, telecom, retail) onboard local suppliers. Tax and social compliance are almost always required.',
    },
    official: null,
    resourceTab: 'funding',
    evaluate: (a) => {
      if (!a.needs.includes('contracts') && !a.needs.includes('partners')) return null
      if (a.stage === 'idea') return null
      const gaps = missing(a, ['rccm', 'tax', 'cnss', 'bank'])
      return { status: statusFromGaps(gaps, false), gaps, note: null }
    },
  },
]

const order = { eligible: 0, almost: 1, notyet: 2 }

export function evaluateReadiness(answers) {
  const results = []
  for (const rule of rules) {
    const r = rule.evaluate(answers)
    if (!r || !r.status) continue
    results.push({
      id: rule.id,
      title: rule.title,
      summary: rule.summary,
      official: rule.official,
      networkFilter: rule.networkFilter,
      resourceTab: rule.resourceTab,
      status: r.status,
      note: r.note,
      gaps: r.gaps.map((g) => ({ id: g, ...gapText[g] })),
    })
  }
  results.sort((a, b) => order[a.status] - order[b.status])
  return results
}

export const emptyAnswers = {
  sector: '',
  stage: '',
  size: '',
  location: '',
  needs: [],
  compliance: [],
}
