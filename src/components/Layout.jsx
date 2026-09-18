import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Menu, X, ExternalLink } from 'lucide-react'
import Logo from './Logo'
import { useLang } from '../i18n/LanguageContext'
import { institutions, officialLinkList } from '../data/institutions'

export const navItems = [
  { to: '/', key: 'home', end: true },
  { to: '/eligibilite', key: 'readiness' },
  { to: '/opportunites', key: 'opportunities' },
  { to: '/reseau', key: 'network' },
  { to: '/a-propos', key: 'about' },
  { to: '/partenaires', key: 'partner' },
]

function LangSwitch() {
  const { lang, setLang } = useLang()
  return (
    <div className="flex items-center gap-1 text-xs" role="group" aria-label="Langue / Language">
      {['fr', 'en'].map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-grey-300">|</span>}
          <button
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            className={`px-1 py-0.5 uppercase ${lang === l ? 'font-bold text-grey-900 underline underline-offset-4' : 'text-grey-700 hover:underline'}`}
          >
            {l === 'fr' ? 'Français' : 'English'}
          </button>
        </span>
      ))}
    </div>
  )
}

function Header() {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const location = useLocation()
  useEffect(() => setOpen(false), [location.pathname])

  return (
    <header className="border-b-2 border-primary-900 bg-white">
      <a href="#main" className="skip-link">
        Aller au contenu
      </a>
      {/* Utility bar */}
      <div className="border-b border-grey-200 bg-grey-50 text-xs text-grey-700">
        <div className="container-x flex h-8 items-center justify-between">
          <span className="font-medium">{t('nav.demo')}</span>
          <div className="flex items-center gap-4">
            <a href="mailto:bonjour@gabonconnect.ga" className="hidden hover:underline sm:inline">
              bonjour@gabonconnect.ga
            </a>
            <LangSwitch />
          </div>
        </div>
      </div>
      {/* Brand row */}
      <div className="container-x flex items-center justify-between py-4">
        <Link to="/" aria-label="OSA Connect — accueil">
          <Logo />
        </Link>
        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/partenaires" className="btn-secondary btn-sm">
            {t('nav.partner')}
          </Link>
          <Link to="/eligibilite" className="btn-primary btn-sm">
            {t('nav.cta')}
          </Link>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-2 border border-grey-300 px-3 py-2 text-sm font-medium lg:hidden"
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="main-nav"
        >
          {open ? <X size={18} /> : <Menu size={18} />} Menu
        </button>
      </div>
      {/* Main navigation */}
      <nav id="main-nav" aria-label="Navigation principale" className={`${open ? 'block' : 'hidden'} border-t border-grey-200 lg:block`}>
        <ul className="container-x flex flex-col lg:flex-row lg:gap-0">
          {navItems.map((item) => (
            <li key={item.to} className="border-b border-grey-200 lg:border-0">
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `relative block px-4 py-3 text-[15px] font-medium lg:px-4 lg:py-3.5 ${
                    isActive ? 'bg-grey-50 text-primary-900 lg:bg-transparent' : 'text-grey-700 hover:bg-grey-50 hover:text-grey-900'
                  } ${isActive ? 'lg:after:absolute lg:after:inset-x-4 lg:after:bottom-0 lg:after:h-[3px] lg:after:bg-primary-900' : ''}`
                }
              >
                {t(`nav.${item.key}`)}
              </NavLink>
            </li>
          ))}
          <li className="p-4 lg:hidden">
            <Link to="/eligibilite" className="btn-primary w-full">
              {t('nav.cta')}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

function Footer() {
  const { t, pick } = useLang()
  return (
    <footer className="mt-16 border-t-2 border-primary-900 bg-white">
      <div className="container-x grid gap-10 py-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-5 text-sm text-grey-700">{t('footer.tagline')}</p>
        </div>
        <div className="lg:col-span-2">
          <h2 className="text-sm font-bold">{t('footer.explore')}</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {navItems.slice(1).map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-grey-700 hover:underline">
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-4">
          <h2 className="text-sm font-bold">{t('footer.officialLinks')}</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {officialLinkList.map((id) => {
              const inst = institutions[id]
              return (
                <li key={id}>
                  <a href={inst.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-grey-700 hover:underline">
                    {inst.name} <ExternalLink size={12} aria-hidden="true" />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="lg:col-span-2">
          <h2 className="text-sm font-bold">{t('footer.contact')}</h2>
          <ul className="mt-3 space-y-2 text-sm text-grey-700">
            <li>
              <a href="mailto:bonjour@gabonconnect.ga" className="hover:underline">
                bonjour@gabonconnect.ga
              </a>
            </li>
            <li>
              <a href="mailto:partenaires@gabonconnect.ga" className="hover:underline">
                partenaires@gabonconnect.ga
              </a>
            </li>
            <li>Libreville, Gabon</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-grey-200">
        <div className="container-x py-5 text-xs text-grey-500">
          <p className="max-w-4xl">{t('footer.disclaimer')}</p>
          <p className="mt-3">
            © {new Date().getFullYear()} {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default function Layout() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
