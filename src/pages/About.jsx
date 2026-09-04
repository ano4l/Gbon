import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import { PageHeader, Section, Callout, LinkList } from '../components/ui'
import { institutions, officialLinkList } from '../data/institutions'

export default function About() {
  const { t, pick, lang } = useLang()
  const founder = t('about.founder')
  const why = t('about.why')
  const gov = t('about.gov')
  const pledge = t('about.govPledge')

  const toc = [
    ['founder', t('about.founderTitle')],
    ['why', t('about.whyEyebrow')],
    ['gov', t('about.govEyebrow')],
    ['pledge', t('about.govPledgeTitle')],
  ]

  return (
    <>
      <PageHeader breadcrumbs={[{ label: t('nav.about') }]} title={t('about.title')} lead={t('about.lead')} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <nav aria-label={lang === 'fr' ? 'Sommaire' : 'Contents'} className="border-l-2 border-grey-200 lg:sticky lg:top-6">
              <p className="px-4 text-xs font-bold uppercase tracking-[0.04em] text-grey-500">{lang === 'fr' ? 'Sommaire' : 'On this page'}</p>
              <ul className="mt-2 text-sm">
                {toc.map(([id, label]) => (
                  <li key={id}>
                    <a href={`#${id}`} className="-ml-0.5 block border-l-2 border-transparent px-4 py-1.5 text-grey-700 hover:border-primary-900 hover:text-grey-900">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="prose-x max-w-3xl lg:col-span-9">
            <section id="founder" className="scroll-mt-6">
              <p className="eyebrow">{t('about.founderEyebrow')}</p>
              <h2 className="mt-1 text-2xl">{t('about.founderTitle')}</h2>
              <div className="mt-4 text-grey-700">
                {founder.map((p, i) => (
                  <p key={i} className={i === 0 ? 'text-lg text-grey-900' : ''}>
                    {p}
                  </p>
                ))}
              </div>
            </section>

            <section id="why" className="mt-12 scroll-mt-6 border-t border-grey-200 pt-10">
              <p className="eyebrow">{t('about.whyEyebrow')}</p>
              <h2 className="mt-1 text-2xl">{t('about.whyTitle')}</h2>
              <dl className="mt-6 border-t border-grey-200">
                {why.map((w) => (
                  <div key={w.title} className="defrow">
                    <dt className="font-bold text-grey-900">{w.title}</dt>
                    <dd className="text-grey-700">{w.text}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section id="gov" className="mt-12 scroll-mt-6 border-t border-grey-200 pt-10">
              <p className="eyebrow">{t('about.govEyebrow')}</p>
              <h2 className="mt-1 text-2xl">{t('about.govTitle')}</h2>
              <div className="mt-4 text-grey-700">
                {gov.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="mt-6">
                <p className="text-sm font-bold">{t('home.signpostLinks')}</p>
                <div className="mt-2">
                  <LinkList items={officialLinkList.map((id) => ({ label: institutions[id].name, href: institutions[id].url, desc: pick(institutions[id].desc) }))} />
                </div>
              </div>
            </section>

            <section id="pledge" className="mt-12 scroll-mt-6 border-t border-grey-200 pt-10">
              <h2 className="text-2xl">{t('about.govPledgeTitle')}</h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-grey-700">
                {pledge.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ol>
            </section>

            <div className="mt-12 border-t border-grey-200 pt-10">
              <Callout tone="primary" title={t('about.ctaTitle')}>
                <p>{t('about.ctaText')}</p>
                <Link to="/partenaires" className="btn-primary mt-4">
                  {t('about.ctaButton')}
                </Link>
              </Callout>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
