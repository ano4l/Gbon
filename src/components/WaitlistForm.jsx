import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext'
import { submitForm } from '../lib/submitForm'

export default function WaitlistForm() {
  const { t } = useLang()
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle')

  const onSubmit = async (e) => {
    e.preventDefault()
    setState('sending')
    try {
      await submitForm('waitlist', { email })
      setState('success')
      setEmail('')
    } catch {
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="border-l-4 border-success-fg bg-success-bg px-4 py-3 text-sm font-medium text-grey-900" role="status">
        {t('home.waitlistSuccess')}
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="max-w-lg">
      <label htmlFor="waitlist-email" className="label">
        {t('home.waitlistPlaceholder')}
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input id="waitlist-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input flex-1" autoComplete="email" />
        <button type="submit" disabled={state === 'sending'} className="btn-primary shrink-0 disabled:opacity-60">
          {state === 'sending' ? t('common.sending') : t('home.waitlistButton')}
        </button>
      </div>
      {state === 'error' && <p className="mt-2 text-sm text-error-fg">{t('home.waitlistError')}</p>}
    </form>
  )
}
