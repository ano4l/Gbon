import { useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import { PageHeader, Section, Badge, Callout } from '../components/ui'
import { profiles } from '../data/profiles'
import { sectors, stages, locations, seeking, labelOf } from '../data/taxonomy'
import { submitForm } from '../lib/submitForm'

export default function Profile() {
  const { id } = useParams()
  const { t, lang, pick } = useLang()
  const p = profiles.find((x) => x.id === id)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [state, setState] = useState('idle')

  if (!p) return <Navigate to="/reseau" replace />

  const related = profiles.filter((x) => x.id !== p.id && (x.sector === p.sector || x.seeking.some((s) => p.seeking.includes(s)))).slice(0, 4)

  const submit = async (e) => {
    e.preventDefault()
    setState('sending')
    try {
      await submitForm('connect-request', { ...form, target: p.id })
      setState('success')
    } catch {
      setState('error')
    }
  }

  const rows = [
    [t('network.filterType'), p.type === 'corporate' ? t('network.corporate') : t('network.sme')],
    [t('network.filterSector'), labelOf(sectors, p.sector, lang)],
    [t('network.stage'), labelOf(stages, p.stage, lang)],
    [t('network.location'), labelOf(locations, p.location, lang)],
    [t('network.founded'), p.founded],
    [t('network.team'), p.team],
  ]

  return (
    <>
      <PageHeader breadcrumbs={[{ label: t('nav.network'), to: '/reseau' }, { label: p.name }]} title={p.name} lead={pick(p.tagline)}>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge tone={p.type === 'corporate' ? 'dark' : 'neutral'}>{p.type === 'corporate' ? t('network.corporate') : t('network.sme')}</Badge>
          <Badge tone="warning">{t('network.sampleLabel')}</Badge>
          {p.seeking.includes('jointbid') && <Badge tone="primary">{t('network.jointBid')}</Badge>}
        </div>
      </PageHeader>
      <Section>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <dl className="border-t border-grey-200">
              {rows.map(([k, v]) => (
                <div key={k} className="defrow">
                  <dt>{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>

            <h2 className="mt-10 text-xl">{lang === 'fr' ? 'Présentation' : 'Overview'}</h2>
            <p className="mt-3 text-grey-700">{pick(p.description)}</p>

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <h2 className="text-xl">{t('network.offers')}</h2>
                <ul className="prose-x mt-3 text-grey-700">
                  {p.offers[lang].map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-xl">{t('network.seeking')}</h2>
                <ul className="prose-x mt-3 text-grey-700">
                  {p.seeking.map((s) => (
                    <li key={s} className={s === 'jointbid' ? 'font-bold text-primary-900' : ''}>
                      {labelOf(seeking, s, lang)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {related.length > 0 && (
              <div className="mt-12">
                <h2 className="text-xl">{lang === 'fr' ? 'Profils similaires' : 'Similar profiles'}</h2>
                <ul className="mt-3 divide-y divide-grey-200 border-y border-grey-200">
                  {related.map((r) => (
                    <li key={r.id} className="flex flex-wrap items-baseline justify-between gap-2 py-3">
                      <Link to={`/reseau/${r.id}`} className="link font-medium">
                        {r.name}
                      </Link>
                      <span className="text-sm text-grey-500">
                        {labelOf(sectors, r.sector, lang)} · {labelOf(locations, r.location, lang).split(' /')[0]}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="lg:col-span-4">
            <div className="border border-grey-200">
              <h2 className="border-b border-grey-200 bg-grey-50 px-5 py-3 text-sm font-bold uppercase tracking-[0.04em]">{t('network.connect')}</h2>
              <div className="p-5">
                <p className="text-sm text-grey-700">{t('network.connectText')}</p>
                {state === 'success' ? (
                  <p className="mt-4 border-l-4 border-success-fg bg-success-bg px-3 py-2 text-sm font-medium">{t('network.sent')}</p>
                ) : (
                  <form onSubmit={submit} className="mt-4 space-y-4">
                    <div>
                      <label htmlFor="c-name" className="label text-sm">{t('network.yourName')}</label>
                      <input id="c-name" required className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div>
                      <label htmlFor="c-email" className="label text-sm">{t('network.yourEmail')}</label>
                      <input id="c-email" required type="email" className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </div>
                    <div>
                      <label htmlFor="c-msg" className="label text-sm">{t('network.message')}</label>
                      <textarea id="c-msg" required rows={4} className="input" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                    </div>
                    <button type="submit" disabled={state === 'sending'} className="btn-primary w-full disabled:opacity-60">
                      {state === 'sending' ? t('common.sending') : t('network.send')}
                    </button>
                    {state === 'error' && <p className="text-sm text-error-fg">{t('home.waitlistError')}</p>}
                  </form>
                )}
              </div>
            </div>
            <div className="mt-6">
              <Callout tone="neutral">{lang === 'fr' ? 'Profil d’exemple créé pour la démonstration. Les coordonnées ne sont pas réelles.' : 'Sample profile created for the demo. Contact details are not real.'}</Callout>
            </div>
          </aside>
        </div>
      </Section>
    </>
  )
}
