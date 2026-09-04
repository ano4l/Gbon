import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import { PageHeader, Section, Badge, Callout, ExtLink } from '../components/ui'
import { sectors, stages, sizes, locations, needs, complianceItems, labelOf } from '../data/taxonomy'
import { evaluateReadiness, emptyAnswers } from '../lib/readinessRules'
import { institutions } from '../data/institutions'
import { submitForm } from '../lib/submitForm'

const steps = ['sector', 'stage', 'size', 'location', 'needs', 'compliance']

function ChoiceGroup({ name, options, value, onChange, multiple = false }) {
  const { lang } = useLang()
  const selected = (id) => (multiple ? value.includes(id) : value === id)
  const toggle = (id) => {
    if (!multiple) return onChange(id)
    onChange(selected(id) ? value.filter((v) => v !== id) : [...value, id])
  }
  return (
    <div className="divide-y divide-grey-200 border-y border-grey-200">
      {options.map((o) => {
        const id = `${name}-${o.id}`
        return (
          <label key={o.id} htmlFor={id} className={`flex cursor-pointer items-start gap-3 px-3 py-3 hover:bg-grey-50 ${selected(o.id) ? 'bg-primary-50' : ''}`}>
            <input
              id={id}
              type={multiple ? 'checkbox' : 'radio'}
              name={name}
              checked={selected(o.id)}
              onChange={() => toggle(o.id)}
              className="mt-1 h-4 w-4 accent-primary-900"
            />
            <span>
              <span className="block font-medium">{o.label[lang]}</span>
              {o.hint && <span className="block text-sm text-grey-500">{o.hint[lang]}</span>}
            </span>
          </label>
        )
      })}
    </div>
  )
}

const statusTone = { eligible: 'success', almost: 'warning', notyet: 'neutral' }
const statusKey = { eligible: 'eligibleNow', almost: 'almost', notyet: 'notYet' }

function GapAction({ action }) {
  const { t } = useLang()
  if (action.type === 'official') {
    const inst = institutions[action.target]
    return <ExtLink href={inst.url}>{inst.short}</ExtLink>
  }
  if (action.type === 'network') {
    return (
      <Link to={`/reseau?sector=${action.target}`} className="link">
        {t('readiness.networkLink')}
      </Link>
    )
  }
  return (
    <Link to={`/opportunites?tab=start#${action.target}`} className="link">
      {t('readiness.resourceLink')}
    </Link>
  )
}

function ResultItem({ r }) {
  const { t, lang, pick } = useLang()
  const inst = r.official ? institutions[r.official] : null
  return (
    <li className="border border-grey-200">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-grey-200 bg-grey-50 px-5 py-3">
        <h3 className="text-lg font-bold">{pick(r.title)}</h3>
        <Badge tone={statusTone[r.status]}>{t(`readiness.${statusKey[r.status]}`)}</Badge>
      </div>
      <div className="px-5 py-4">
        <p className="text-grey-700">{pick(r.summary)}</p>
        {r.note && <p className="mt-2 text-sm text-grey-500">{pick(r.note)}</p>}

        {r.gaps.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-bold uppercase tracking-[0.04em] text-grey-500">{t('readiness.gaps')}</p>
            <table className="table mt-2">
              <tbody>
                {r.gaps.map((g) => (
                  <tr key={g.id}>
                    <td className="font-medium">{g[lang]}</td>
                    <td className="w-48 text-right">
                      <GapAction action={g.action} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <span className="text-xs font-bold uppercase tracking-[0.04em] text-grey-500">{t('readiness.nextAction')}</span>
          {inst && (
            <ExtLink href={inst.url} className="font-medium">
              {t('readiness.officialLink')} — {inst.short}
            </ExtLink>
          )}
          {r.networkFilter && (
            <Link to={`/reseau?need=${r.networkFilter}`} className="link font-medium">
              {t('readiness.networkLink')}
            </Link>
          )}
          {r.resourceTab && (
            <Link to={`/opportunites?tab=${r.resourceTab}`} className="link font-medium">
              {t('readiness.resourceLink')}
            </Link>
          )}
        </div>
      </div>
    </li>
  )
}

function Results({ answers, onRestart }) {
  const { t, lang } = useLang()
  const results = useMemo(() => evaluateReadiness(answers), [answers])
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle')

  const save = async (e) => {
    e.preventDefault()
    setState('sending')
    try {
      await submitForm('readiness-results', { email, answers, results: results.map((r) => ({ id: r.id, status: r.status })) })
      setState('success')
    } catch {
      setState('error')
    }
  }

  const profile = [
    [t('readiness.q.sector'), labelOf(sectors, answers.sector, lang)],
    [t('readiness.q.stage'), labelOf(stages, answers.stage, lang)],
    [t('readiness.q.size'), labelOf(sizes, answers.size, lang)],
    [t('readiness.q.location'), labelOf(locations, answers.location, lang)],
    [t('readiness.q.needs').split(' (')[0], answers.needs.map((n) => labelOf(needs, n, lang)).join(', ')],
    [t('readiness.q.compliance'), answers.compliance.length ? answers.compliance.map((c) => labelOf(complianceItems, c, lang)).join(', ') : '—'],
  ]

  const counts = ['eligible', 'almost', 'notyet'].map((s) => [s, results.filter((r) => r.status === s).length])

  return (
    <>
      <PageHeader breadcrumbs={[{ label: t('nav.readiness'), to: '/eligibilite' }, { label: t('readiness.resultsEyebrow') }]} title={t('readiness.resultsTitle')} lead={t('readiness.resultsSub')} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap gap-4 border-b border-grey-200 pb-4 text-sm">
              {counts.map(([s, n]) => (
                <span key={s} className="inline-flex items-center gap-2">
                  <Badge tone={statusTone[s]}>{t(`readiness.${statusKey[s]}`)}</Badge>
                  <span className="font-bold">{n}</span>
                </span>
              ))}
            </div>
            <ul className="mt-6 space-y-4">
              {results.map((r) => (
                <ResultItem key={r.id} r={r} />
              ))}
            </ul>
            <div className="mt-8">
              <Callout tone="neutral">{t('readiness.disclaimer')}</Callout>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="border border-grey-200">
              <h2 className="border-b border-grey-200 bg-grey-50 px-5 py-3 text-sm font-bold uppercase tracking-[0.04em]">{t('readiness.summaryLabel')}</h2>
              <dl className="px-5">
                {profile.map(([k, v]) => (
                  <div key={k} className="border-b border-grey-200 py-3 last:border-0">
                    <dt className="text-xs text-grey-500">{k}</dt>
                    <dd className="mt-0.5 text-sm font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-6 border border-grey-200 p-5">
              <h2 className="font-bold">{t('readiness.saveTitle')}</h2>
              {state === 'success' ? (
                <p className="mt-3 border-l-4 border-success-fg bg-success-bg px-3 py-2 text-sm">{t('home.waitlistSuccess')}</p>
              ) : (
                <form onSubmit={save} className="mt-3 space-y-3">
                  <label htmlFor="results-email" className="label text-sm">
                    {t('home.waitlistPlaceholder')}
                  </label>
                  <input id="results-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
                  <button type="submit" disabled={state === 'sending'} className="btn-primary w-full disabled:opacity-60">
                    {state === 'sending' ? t('common.sending') : t('readiness.saveButton')}
                  </button>
                  {state === 'error' && <p className="text-sm text-error-fg">{t('home.waitlistError')}</p>}
                </form>
              )}
            </div>

            <button type="button" onClick={onRestart} className="btn-secondary mt-6 w-full">
              {t('readiness.restart')}
            </button>
          </aside>
        </div>
      </Section>
    </>
  )
}

export default function Readiness() {
  const { t, lang } = useLang()
  const [answers, setAnswers] = useState(emptyAnswers)
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)

  const key = steps[step]
  const set = (field) => (v) => setAnswers((a) => ({ ...a, [field]: v }))
  const canContinue = key === 'compliance' ? true : key === 'needs' ? answers.needs.length > 0 : Boolean(answers[key])

  if (done) {
    return (
      <Results
        answers={answers}
        onRestart={() => {
          setAnswers(emptyAnswers)
          setStep(0)
          setDone(false)
        }}
      />
    )
  }

  return (
    <>
      <PageHeader breadcrumbs={[{ label: t('nav.readiness') }]} title={t('readiness.title')} lead={t('readiness.sub')} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-12">
          <form
            className="lg:col-span-8"
            onSubmit={(e) => {
              e.preventDefault()
              if (step < steps.length - 1) setStep((s) => s + 1)
              else setDone(true)
            }}
          >
            <p className="text-sm font-bold text-grey-500">
              {t('readiness.step')} {step + 1} {t('readiness.of')} {steps.length}
            </p>
            <fieldset className="mt-2">
              <legend className="text-2xl font-bold leading-tight">{t(`readiness.q.${key}`)}</legend>
              {key === 'size' && <p className="hint mt-2">{t('readiness.sizeHint')}</p>}
              {key === 'compliance' && (
                <p className="hint mt-2">{lang === 'fr' ? 'Cochez ce que vous possédez déjà. Laissez vide si rien ne s’applique.' : 'Tick what you already have. Leave empty if none apply.'}</p>
              )}
              <div className="mt-5">
                {key === 'sector' && <ChoiceGroup name="sector" options={sectors} value={answers.sector} onChange={set('sector')} />}
                {key === 'stage' && <ChoiceGroup name="stage" options={stages} value={answers.stage} onChange={set('stage')} />}
                {key === 'size' && <ChoiceGroup name="size" options={sizes} value={answers.size} onChange={set('size')} />}
                {key === 'location' && <ChoiceGroup name="location" options={locations} value={answers.location} onChange={set('location')} />}
                {key === 'needs' && <ChoiceGroup name="needs" options={needs} value={answers.needs} onChange={set('needs')} multiple />}
                {key === 'compliance' && <ChoiceGroup name="compliance" options={complianceItems} value={answers.compliance} onChange={set('compliance')} multiple />}
              </div>
            </fieldset>
            <div className="mt-8 flex items-center gap-3">
              <button type="submit" disabled={!canContinue} className="btn-primary disabled:opacity-40">
                {step < steps.length - 1 ? t('readiness.next') : t('readiness.seeResults')}
              </button>
              {step > 0 && (
                <button type="button" onClick={() => setStep((s) => s - 1)} className="btn-tertiary">
                  {t('readiness.back')}
                </button>
              )}
            </div>
          </form>

          <aside className="lg:col-span-4">
            <ol className="border border-grey-200 text-sm">
              {steps.map((s, i) => (
                <li key={s} className={`flex items-center gap-3 border-b border-grey-200 px-4 py-2.5 last:border-0 ${i === step ? 'bg-primary-50 font-bold' : i < step ? 'text-grey-700' : 'text-grey-500'}`}>
                  <span className={`flex h-6 w-6 shrink-0 items-center justify-center border text-xs ${i <= step ? 'border-primary-900 bg-primary-900 text-white' : 'border-grey-300'}`}>{i + 1}</span>
                  {t(`readiness.q.${s}`).split(' (')[0]}
                </li>
              ))}
            </ol>
            <div className="mt-6">
              <Callout tone="neutral">{t('readiness.disclaimer')}</Callout>
            </div>
          </aside>
        </div>
      </Section>
    </>
  )
}
