import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { LanguageProvider, useLang } from './i18n/LanguageContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Readiness from './pages/Readiness'
import Network from './pages/Network'
import Profile from './pages/Profile'
import Opportunities from './pages/Opportunities'
import About from './pages/About'
import Partner from './pages/Partner'

function NotFound() {
  const { t } = useLang()
  return (
    <div className="container-x py-20">
      <h1 className="text-3xl">{t('common.notFound')}</h1>
      <Link to="/" className="link mt-4 inline-block">
        {t('common.backHome')}
      </Link>
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/eligibilite" element={<Readiness />} />
            <Route path="/reseau" element={<Network />} />
            <Route path="/reseau/:id" element={<Profile />} />
            <Route path="/opportunites" element={<Opportunities />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/partenaires" element={<Partner />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}
