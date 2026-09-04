import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import { Section, SectionTitle, Tile, Callout, ExtLink, LinkList } from '../components/ui'
import WaitlistForm from '../components/WaitlistForm'
import { institutions, officialLinkList } from '../data/institutions'
import { stories } from '../data/resources'

const pillarRoutes = ['/eligibilite', '/reseau', '/opportunites', '/opportunites?tab=mindset']

export default function Home() {
  const { t, pick } = useLang()
  const loop = t('home.loop')
  const pillars = t('home.pillars')
  const facts = t('home.facts')

  return (
    <>
      {/* Mission statement */}
      <section className="bg-primary-900 text-white">
        <div className="container-x grid gap-8 py-12 lg:grid-cols-12 lg:py-16">
          <div className="lg:col-span-8">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-grey-300">{t('home.heroEyebrow')}</p>
            <h1 className="mt-3 text-3xl leading-tight text-white sm:text-4xl lg:text-[2.75rem]">{t('home.heroTitle')}</h1>
            <p className="mt-5 max-w-3xl text-lg text-grey-100">{t('home.heroSub')}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/eligibilite" className="btn bg-white text-primary-900 hover:bg-grey-100">
                {t('home.ctaPrimary')}
              </Link>
              <a href="#waitlist" className="btn border border-white text-white hover:bg-primary-800">
                {t('home.ctaSecondary')}
              </a>
            </div>
            <p className="mt-4 text-xs text-grey-300">{t('home.heroNote')}</p>
          </div>
          <div className="lg:col-span-4">
            <div className="border border-white/30 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-grey-300">{t('home.signpostEyebrow')}</p>
              <p className="mt-2 font-bold">{t('home.signpostTitle')}</p>
              <p className="mt-2 text-sm text-grey-100">{t('home.signpostText')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <Section>
        <SectionTitle title={t('home.pillarsTitle')} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Tile key={p.title} to={pillarRoutes[i]} meta={`0${i + 1}`} title={p.title} text={p.text} />
          ))}
        </div>
      </Section>

      {/* Procedure */}
      <section className="bg-grey-50">
        <Section>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionTitle title={t('home.loopTitle')} />
              <Link to="/eligibilite" className="btn-primary mt-6">
                {t('home.ctaPrimary')}
              </Link>
            </div>
            <ol className="divide-y divide-grey-300 border-y border-grey-300 lg:col-span-8">
              {loop.map((step, i) => (
                <li key={step.title} className="grid grid-cols-[3rem_1fr] gap-4 py-5">
                  <span className="text-2xl font-bold text-primary-900">{i + 1}.</span>
                  <div>
                    <h3 className="text-lg font-bold">{step.title}</h3>
                    <p className="mt-1 text-grey-700">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Section>
      </section>

      {/* Reference points + official platforms */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionTitle title={t('home.factsEyebrow')} />
            <table className="table mt-6">
              <tbody>
                {facts.map((f) => (
                  <tr key={f.value}>
                    <td className="w-36 whitespace-nowrap text-base font-bold text-grey-900">{f.value}</td>
                    <td className="text-grey-700">{f.label}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="lg:col-span-7">
            <SectionTitle title={t('home.signpostLinks')} />
            <div className="mt-6">
              <LinkList items={officialLinkList.map((id) => ({ label: institutions[id].name, href: institutions[id].url, desc: pick(institutions[id].desc) }))} />
            </div>
          </div>
        </div>
      </Section>

      {/* Founder stories — plain list */}
      <section className="bg-grey-50">
        <Section>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <SectionTitle title={t('home.storiesTitle')} />
            <Link to="/opportunites?tab=mindset" className="link text-sm font-medium">
              {t('home.storiesLink')}
            </Link>
          </div>
          <ul className="mt-6 divide-y divide-grey-300 border-y border-grey-300">
            {stories.map((s) => (
              <li key={s.id} className="grid gap-2 py-4 sm:grid-cols-12 sm:gap-6">
                <div className="sm:col-span-4">
                  <p className="font-bold">{s.name}</p>
                  <p className="text-sm text-grey-500">{pick(s.role)}</p>
                </div>
                <div className="sm:col-span-8">
                  <Link to="/opportunites?tab=mindset" className="link font-medium">
                    {pick(s.title)}
                  </Link>
                  <p className="mt-1 text-sm text-grey-700">{pick(s.excerpt)}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      </section>

      {/* Waitlist */}
      <Section id="waitlist">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionTitle title={t('home.waitlistTitle')} lead={t('home.waitlistText')} />
          </div>
          <div className="lg:col-span-7">
            <WaitlistForm />
            <div className="mt-6">
              <Callout tone="neutral">{t('footer.disclaimer')}</Callout>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
