import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import { PageHeader, Section, Badge, Callout } from '../components/ui'
import { profiles } from '../data/profiles'
import { sectors, stages, locations, seeking, labelOf } from '../data/taxonomy'

function Select({ id, label, value, onChange, options, allLabel }) {
  const { lang } = useLang()
  return (
    <div>
      <label htmlFor={id} className="label text-sm">
        {label}
      </label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className="input">
        <option value="">{allLabel}</option>
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label[lang]}
          </option>
        ))}
      </select>
    </div>
  )
}

export default function Network() {
  const { t, lang, pick } = useLang()
  const [params, setParams] = useSearchParams()
  const sector = params.get('sector') || ''
  const need = params.get('need') || ''
  const type = params.get('type') || ''

  const update = (k) => (v) => {
    const next = new URLSearchParams(params)
    if (v) next.set(k, v)
    else next.delete(k)
    setParams(next, { replace: true })
  }

  const filtered = useMemo(
    () => profiles.filter((p) => (!sector || p.sector === sector) && (!need || p.seeking.includes(need)) && (!type || p.type === type)),
    [sector, need, type],
  )

  const typeOptions = [
    { id: 'sme', label: { fr: t('network.sme'), en: t('network.sme') } },
    { id: 'corporate', label: { fr: t('network.corporate'), en: t('network.corporate') } },
  ]

  return (
    <>
      <PageHeader breadcrumbs={[{ label: t('nav.network') }]} title={t('network.title')} lead={t('network.sub')} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <form className="border border-grey-200 p-5" onSubmit={(e) => e.preventDefault()}>
              <h2 className="text-sm font-bold uppercase tracking-[0.04em]">{lang === 'fr' ? 'Filtrer' : 'Filter'}</h2>
              <div className="mt-4 space-y-4">
                <Select id="f-sector" label={t('network.filterSector')} value={sector} onChange={update('sector')} options={sectors} allLabel={t('network.all')} />
                <Select id="f-need" label={t('network.filterNeed')} value={need} onChange={update('need')} options={seeking} allLabel={t('network.all')} />
                <Select id="f-type" label={t('network.filterType')} value={type} onChange={update('type')} options={typeOptions} allLabel={t('network.all')} />
                <label className="flex items-start gap-2 text-sm">
                  <input type="checkbox" className="mt-1 h-4 w-4 accent-primary-900" checked={need === 'jointbid'} onChange={(e) => update('need')(e.target.checked ? 'jointbid' : '')} />
                  <span>{t('network.jointBid')}</span>
                </label>
                {(sector || need || type) && (
                  <button type="button" onClick={() => setParams({}, { replace: true })} className="link text-sm">
                    {lang === 'fr' ? 'Réinitialiser les filtres' : 'Reset filters'}
                  </button>
                )}
              </div>
            </form>
            <div className="mt-6">
              <Callout tone="neutral">{lang === 'fr' ? 'Annuaire de démonstration : tous les profils sont des exemples.' : 'Demo directory: all profiles are samples.'}</Callout>
            </div>
          </aside>

          <div className="lg:col-span-9">
            <div className="flex items-center justify-between border-b border-grey-200 pb-3">
              <p className="text-sm text-grey-700">
                <span className="font-bold">{filtered.length}</span> {t('network.results')}
              </p>
              <Link to="/#waitlist" className="btn-secondary btn-sm">
                {t('network.listYourself')}
              </Link>
            </div>

            {filtered.length === 0 ? (
              <p className="py-10 text-grey-500">{t('network.noResults')}</p>
            ) : (
              <table className="table">
                <thead className="hidden sm:table-header-group">
                  <tr>
                    <th>{lang === 'fr' ? 'Entreprise' : 'Business'}</th>
                    <th>{t('network.filterSector')}</th>
                    <th>{t('network.location')}</th>
                    <th>{t('network.seeking')}</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr key={p.id} className="hover:bg-grey-50">
                      <td>
                        <Link to={`/reseau/${p.id}`} className="link font-bold">
                          {p.name}
                        </Link>
                        <p className="mt-1 text-grey-700">{pick(p.tagline)}</p>
                        <div className="mt-2 flex flex-wrap gap-1.5 sm:hidden">
                          <Badge tone="primary">{labelOf(sectors, p.sector, lang)}</Badge>
                          <Badge>{labelOf(locations, p.location, lang).split(' /')[0]}</Badge>
                        </div>
                        <div className="mt-1.5">
                          <Badge tone={p.type === 'corporate' ? 'dark' : 'neutral'}>{p.type === 'corporate' ? t('network.corporate') : t('network.sme')}</Badge>
                        </div>
                      </td>
                      <td className="hidden whitespace-nowrap sm:table-cell">{labelOf(sectors, p.sector, lang)}</td>
                      <td className="hidden whitespace-nowrap sm:table-cell">{labelOf(locations, p.location, lang).split(' /')[0]}</td>
                      <td className="hidden sm:table-cell">
                        <ul className="space-y-1">
                          {p.seeking.map((s) => (
                            <li key={s} className={s === 'jointbid' ? 'font-bold text-primary-900' : ''}>
                              {labelOf(seeking, s, lang)}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </Section>
    </>
  )
}
