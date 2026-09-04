import { Link } from 'react-router-dom'
import { ExternalLink, ChevronRight } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'

export function Breadcrumbs({ items }) {
  const { t } = useLang()
  return (
    <nav aria-label="Breadcrumb" className="container-x py-3 text-sm">
      <ol className="flex flex-wrap items-center gap-1 text-grey-500">
        <li>
          <Link to="/" className="link">
            {t('nav.home')}
          </Link>
        </li>
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1">
            <ChevronRight size={14} aria-hidden="true" />
            {it.to ? (
              <Link to={it.to} className="link">
                {it.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-grey-700">
                {it.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function PageHeader({ breadcrumbs, title, lead, children }) {
  return (
    <>
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
      <header className="container-x border-b border-grey-200 pb-8 pt-4">
        <h1 className="max-w-4xl text-3xl leading-tight sm:text-4xl">{title}</h1>
        {lead && <p className="mt-4 max-w-3xl text-lg text-grey-700">{lead}</p>}
        {children}
      </header>
    </>
  )
}

export function Section({ children, className = '', id }) {
  return (
    <section id={id} className={`container-x py-10 sm:py-12 ${className}`}>
      {children}
    </section>
  )
}

export function SectionTitle({ title, lead, as = 'h2' }) {
  const Tag = as
  return (
    <div className="max-w-3xl">
      <Tag className="text-2xl leading-tight sm:text-[1.75rem]">{title}</Tag>
      {lead && <p className="mt-3 text-base text-grey-700">{lead}</p>}
    </div>
  )
}

export function ExtLink({ href, children, className = '' }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`link inline-flex items-center gap-1 ${className}`}>
      {children}
      <ExternalLink size={13} aria-hidden="true" />
    </a>
  )
}

export function Badge({ tone = 'neutral', children }) {
  return <span className={`badge badge-${tone}`}>{children}</span>
}

export function Callout({ tone = 'primary', title, children }) {
  const border = { primary: 'border-primary-900', warning: 'border-warning-fg', info: 'border-info-fg', neutral: 'border-grey-500' }[tone]
  return (
    <div className={`callout ${border}`}>
      {title && <p className="font-bold">{title}</p>}
      <div className={`${title ? 'mt-1' : ''} text-sm text-grey-700`}>{children}</div>
    </div>
  )
}

export function Notice({ children }) {
  return (
    <div className="border border-grey-300 bg-grey-50 px-4 py-3 text-sm text-grey-700">
      <span className="mr-2 inline-block h-2 w-2 bg-warning-fg align-middle" aria-hidden="true" />
      {children}
    </div>
  )
}

export function Tile({ to, href, title, text, meta }) {
  const inner = (
    <>
      {meta && <p className="eyebrow">{meta}</p>}
      <p className={`${meta ? 'mt-2' : ''} text-lg font-bold text-primary-900`}>{title}</p>
      {text && <p className="mt-2 text-sm text-grey-700">{text}</p>}
    </>
  )
  if (href)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="tile">
        {inner}
      </a>
    )
  return (
    <Link to={to} className="tile">
      {inner}
    </Link>
  )
}

export function LinkList({ items }) {
  return (
    <ul className="divide-y divide-grey-200 border-y border-grey-200">
      {items.map((it) => (
        <li key={it.label} className="py-3">
          {it.href ? (
            <ExtLink href={it.href} className="font-medium">
              {it.label}
            </ExtLink>
          ) : (
            <Link to={it.to} className="link font-medium">
              {it.label}
            </Link>
          )}
          {it.desc && <p className="mt-0.5 text-sm text-grey-500">{it.desc}</p>}
        </li>
      ))}
    </ul>
  )
}
