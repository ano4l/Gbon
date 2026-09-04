import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import { PageHeader, Section, Badge, Notice, ExtLink, Callout } from '../components/ui'
import { institutions } from '../data/institutions'
import { startGrow, fundingPrograms, publicDigest, corporateOpportunities, stories, media, articles } from '../data/resources'
import { sectors, locations, labelOf } from '../data/taxonomy'

const tabs = ['start', 'funding', 'mindset']

function formatDate(iso, lang) {
  return new Date(iso).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

function StartGrow() {
  const { t, lang, pick } = useLang()
  return (
    <>
      <p className="max-w-3xl text-grey-700">{t('opps.startIntro')}</p>
      <div className="mt-8 divide-y divide-grey-200 border-y border-grey-200">
        {startGrow.map((r) => {
          const inst = institutions[r.institution]
          return (
            <article key={r.id} id={r.id} className="grid gap-4 py-6 scroll-mt-6 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="eyebrow">{inst.short}</p>
                <h3 className="mt-1 text-lg font-bold">{pick(r.title)}</h3>
              </div>
              <div className="lg:col-span-5">
                <p className="text-sm text-grey-700">{pick(r.text)}</p>
                <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm">
                  {r.steps[lang].map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
              </div>
              <div className="lg:col-span-3 lg:text-right">
                <ExtLink href={inst.url} className="text-sm font-medium">
                  {t('opps.officialPage')}
                </ExtLink>
              </div>
            </article>
          )
        })}
      </div>
    </>
  )
}

function Funding() {
  const { t, lang, pick } = useLang()
  return (
    <>
      <p className="max-w-3xl text-grey-700">{t('opps.fundingIntro')}</p>

      <section className="mt-10">
        <h2 className="text-xl">{t('opps.publicDigestTitle')}</h2>
        <div className="mt-3">
          <Notice>{t('opps.publicDigestLabel')}</Notice>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="table min-w-[56rem]">
            <thead>
              <tr>
                <th>{lang === 'fr' ? 'Référence' : 'Reference'}</th>
                <th>{lang === 'fr' ? 'Objet' : 'Subject'}</th>
                <th>{t('network.filterSector')}</th>
                <th>{t('opps.budget')}</th>
                <th>{t('opps.deadline')}</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {publicDigest.map((d) => (
                <tr key={d.id}>
                  <td className="whitespace-nowrap font-mono text-xs">{d.ref}</td>
                  <td>
                    <p className="font-bold">{pick(d.title)}</p>
                    <p className="text-grey-500">{pick(d.buyer)}</p>
                    <p className="mt-1 text-grey-700">{pick(d.summary)}</p>
                  </td>
                  <td className="whitespace-nowrap">{labelOf(sectors, d.sector, lang)}</td>
                  <td className="whitespace-nowrap">
                    <p className="font-medium">{d.budget}</p>
                    <div className="mt-1">{d.smeReserved ? <Badge tone="success">{t('opps.smeReserved')}</Badge> : <Badge tone="info">&gt; 150 M FCFA</Badge>}</div>
                  </td>
                  <td className="whitespace-nowrap">{formatDate(d.deadline, lang)}</td>
                  <td className="whitespace-nowrap">
                    <ExtLink href={institutions.lejmp.url} className="text-xs font-medium">
                      {t('opps.viewNotice')}
                    </ExtLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl">{t('opps.fundingTitle')}</h2>
        <div className="mt-3">
          <Notice>{t('opps.fundingLabel')}</Notice>
        </div>
        <div className="mt-4 divide-y divide-grey-200 border-y border-grey-200">
          {fundingPrograms.map((f) => {
            const inst = institutions[f.institution]
            return (
              <article key={f.id} className="grid gap-4 py-6 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <p className="eyebrow">{inst.short}</p>
                  <h3 className="mt-1 text-lg font-bold">{pick(f.title)}</h3>
                  <p className="mt-1 text-sm font-medium text-primary-900">{pick(f.amount)}</p>
                </div>
                <div className="lg:col-span-5">
                  <p className="text-sm text-grey-700">{pick(f.text)}</p>
                  <dl className="mt-3 text-sm">
                    <dt className="text-xs font-bold uppercase tracking-[0.04em] text-grey-500">{t('opps.eligibility')}</dt>
                    <dd className="mt-0.5 text-grey-700">{pick(f.eligibility)}</dd>
                  </dl>
                </div>
                <div className="lg:col-span-3 lg:text-right">
                  <ExtLink href={inst.url} className="text-sm font-medium">
                    {t('opps.learnMore')}
                  </ExtLink>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl">{t('opps.corporateTitle')}</h2>
        <div className="mt-3">
          <Notice>{t('opps.corporateLabel')}</Notice>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="table min-w-[48rem]">
            <thead>
              <tr>
                <th>{lang === 'fr' ? 'Donneur d’ordre' : 'Buyer'}</th>
                <th>{lang === 'fr' ? 'Besoin' : 'Need'}</th>
                <th>{t('opps.amount')}</th>
                <th>{t('network.location')}</th>
                <th>{t('opps.deadline')}</th>
              </tr>
            </thead>
            <tbody>
              {corporateOpportunities.map((c) => (
                <tr key={c.id}>
                  <td>
                    <p className="font-medium">{pick(c.company)}</p>
                    <div className="mt-1">
                      <Badge tone="warning">{t('opps.sampleListing')}</Badge>
                    </div>
                  </td>
                  <td>
                    <p className="font-bold">{pick(c.title)}</p>
                    <p className="mt-1 text-grey-700">{pick(c.summary)}</p>
                  </td>
                  <td className="whitespace-nowrap">{c.value}</td>
                  <td className="whitespace-nowrap">{labelOf(locations, c.location, lang).split(' /')[0]}</td>
                  <td className="whitespace-nowrap">{formatDate(c.deadline, lang)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

function Mindset() {
  const { t, pick } = useLang()
  return (
    <>
      <p className="max-w-3xl text-grey-700">{t('opps.mindsetIntro')}</p>

      <section className="mt-10">
        <h2 className="text-xl">{t('opps.stories')}</h2>
        <ul className="mt-4 divide-y divide-grey-200 border-y border-grey-200">
          {stories.map((s) => (
            <li key={s.id} className="grid gap-2 py-5 lg:grid-cols-12 lg:gap-6">
              <div className="lg:col-span-3">
                <p className="font-bold">{s.name}</p>
                <p className="text-sm text-grey-500">{pick(s.role)}</p>
              </div>
              <div className="lg:col-span-7">
                <h3 className="text-lg font-bold">{pick(s.title)}</h3>
                <p className="mt-1 text-sm text-grey-700">{pick(s.excerpt)}</p>
              </div>
              <div className="text-sm text-grey-500 lg:col-span-2 lg:text-right">
                {s.readTime} {t('opps.minutes')}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="text-xl">{t('opps.listen')}</h2>
          <ul className="mt-4 divide-y divide-grey-200 border-y border-grey-200">
            {media.map((m) => (
              <li key={m.id} className="py-4">
                <div className="flex items-center gap-2">
                  <Badge>{m.type}</Badge>
                  <p className="font-bold">{pick(m.title)}</p>
                </div>
                <p className="mt-1 text-xs text-grey-500">{pick(m.by)}</p>
                <p className="mt-1 text-sm text-grey-700">{pick(m.text)}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-5">
          <h2 className="text-xl">{t('opps.read')}</h2>
          <ul className="mt-4 divide-y divide-grey-200 border-y border-grey-200">
            {articles.map((a) => (
              <li key={a.id} className="flex items-baseline justify-between gap-4 py-3">
                <p className="text-sm font-medium">{pick(a.title)}</p>
                <span className="shrink-0 text-xs text-grey-500">
                  {a.readTime} {t('opps.minutes')}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

export default function Opportunities() {
  const { t } = useLang()
  const [params, setParams] = useSearchParams()
  const tab = tabs.includes(params.get('tab')) ? params.get('tab') : 'start'

  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1))
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
    }
  }, [tab])

  return (
    <>
      <PageHeader breadcrumbs={[{ label: t('nav.opportunities') }]} title={t('opps.title')} lead={t('opps.sub')} />
      <Section>
        <div role="tablist" aria-label={t('opps.eyebrow')} className="flex flex-wrap border-b border-grey-300">
          {tabs.map((k) => (
            <button
              key={k}
              role="tab"
              type="button"
              aria-selected={tab === k}
              onClick={() => setParams({ tab: k }, { replace: true })}
              className={`-mb-px border px-5 py-3 text-sm font-bold ${tab === k ? 'border-grey-300 border-b-white bg-white text-primary-900' : 'border-transparent bg-grey-50 text-grey-700 hover:bg-grey-100'}`}
            >
              {t(`opps.tabs.${k}`)}
            </button>
          ))}
        </div>
        <div role="tabpanel" className="pt-8">
          {tab === 'start' && <StartGrow />}
          {tab === 'funding' && <Funding />}
          {tab === 'mindset' && <Mindset />}
        </div>
        <div className="mt-12">
          <Callout tone="neutral">{t('footer.disclaimer')}</Callout>
        </div>
      </Section>
    </>
  )
}
