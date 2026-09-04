import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext'
import { PageHeader, Section, Callout } from '../components/ui'
import { submitForm } from '../lib/submitForm'

export default function Partner() {
  const { t, lang } = useLang()
  const asks = t('partner.asks')
  const offers = t('partner.offers')
  const orgTypes = t('partner.orgTypes')
  const interests = t('partner.interests')

  const [form, setForm] = useState({ orgType: '', orgName: '', contactName: '', email: '', phone: '', interest: '', message: '' })
  const [state, setState] = useState('idle')
  const field = (k) => ({ id: `p-${k}`, value: form[k], onChange: (e) => setForm({ ...form, [k]: e.target.value }) })

  const submit = async (e) => {
    e.preventDefault()
    setState('sending')
    try {
      await submitForm('partner-contact', form)
      setState('success')
    } catch {
      setState('error')
    }
  }

  return (
    <>
      <PageHeader breadcrumbs={[{ label: t('nav.partner') }]} title={t('partner.title')} lead={t('partner.sub')} />
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 className="text-2xl">{t('partner.askTitle')}</h2>
            <dl className="mt-4 border-t border-grey-200">
              {asks.map((a) => (
                <div key={a.title} className="defrow">
                  <dt className="font-bold text-grey-900">{a.title}</dt>
                  <dd className="text-grey-700">{a.text}</dd>
                </div>
              ))}
            </dl>

            <h2 className="mt-10 text-2xl">{t('partner.offerTitle')}</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-grey-700">
              {offers.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>

            <div className="mt-10">
              <Callout tone="neutral" title={t('partner.directTitle')}>
                <a href="mailto:partenaires@gabonconnect.ga" className="link">
                  partenaires@gabonconnect.ga
                </a>
                <p className="mt-1">{lang === 'fr' ? 'Réponse sous 48 heures ouvrées.' : 'Reply within 48 working hours.'}</p>
              </Callout>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="border border-grey-200">
              <h2 className="border-b border-grey-200 bg-grey-50 px-6 py-3 text-sm font-bold uppercase tracking-[0.04em]">{t('partner.formTitle')}</h2>
              <div className="p-6">
                {state === 'success' ? (
                  <p className="border-l-4 border-success-fg bg-success-bg px-4 py-3 text-sm font-medium" role="status">
                    {t('partner.success')}
                  </p>
                ) : (
                  <form onSubmit={submit} className="space-y-5">
                    <p className="text-xs text-grey-500">{lang === 'fr' ? 'Tous les champs sont obligatoires sauf mention contraire.' : 'All fields are required unless stated otherwise.'}</p>
                    <div>
                      <label htmlFor="p-orgType" className="label">{t('partner.orgType')}</label>
                      <select required className="input" {...field('orgType')}>
                        <option value="">{lang === 'fr' ? 'Sélectionner' : 'Select'}</option>
                        {orgTypes.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="p-orgName" className="label">{t('partner.orgName')}</label>
                      <input required className="input" {...field('orgName')} />
                    </div>
                    <div>
                      <label htmlFor="p-contactName" className="label">{t('partner.contactName')}</label>
                      <input required className="input" {...field('contactName')} />
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="p-email" className="label">{t('partner.email')}</label>
                        <input required type="email" className="input" autoComplete="email" {...field('email')} />
                      </div>
                      <div>
                        <label htmlFor="p-phone" className="label">{t('partner.phone')}</label>
                        <input type="tel" className="input" autoComplete="tel" {...field('phone')} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="p-interest" className="label">{t('partner.interest')}</label>
                      <select required className="input" {...field('interest')}>
                        <option value="">{lang === 'fr' ? 'Sélectionner' : 'Select'}</option>
                        {interests.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="p-message" className="label">{t('partner.message')}</label>
                      <textarea required rows={5} className="input" {...field('message')} />
                    </div>
                    <button type="submit" disabled={state === 'sending'} className="btn-primary disabled:opacity-60">
                      {state === 'sending' ? t('common.sending') : t('partner.submit')}
                    </button>
                    {state === 'error' && <p className="text-sm text-error-fg">{t('partner.error')}</p>}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
