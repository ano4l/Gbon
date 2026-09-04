import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { fr } from './fr'
import { en } from './en'

const dictionaries = { fr, en }
const LanguageContext = createContext(null)

function getInitialLang() {
  if (typeof window === 'undefined') return 'fr'
  const stored = window.localStorage.getItem('gc-lang')
  return stored === 'en' ? 'en' : 'fr'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang)

  useEffect(() => {
    window.localStorage.setItem('gc-lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const t = useCallback(
    (key) => {
      const parts = key.split('.')
      let node = dictionaries[lang]
      for (const p of parts) {
        node = node?.[p]
        if (node === undefined) break
      }
      if (node === undefined) {
        let fallback = dictionaries.fr
        for (const p of parts) fallback = fallback?.[p]
        return fallback ?? key
      }
      return node
    },
    [lang],
  )

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t,
      // pick a field from a bilingual object {fr, en}
      pick: (obj) => (obj && typeof obj === 'object' ? obj[lang] ?? obj.fr : obj),
    }),
    [lang, t],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider')
  return ctx
}
