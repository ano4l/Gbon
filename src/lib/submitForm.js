// Forms post to a Formspree endpoint (set VITE_FORMSPREE_ID in .env).
// Without an endpoint configured, submissions are stored locally so the demo still "works" live.

const endpointId = import.meta.env.VITE_FORMSPREE_ID

export async function submitForm(formName, data) {
  const payload = { form: formName, ...data, submittedAt: new Date().toISOString() }

  if (endpointId) {
    const res = await fetch(`https://formspree.io/f/${endpointId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error(`Form submission failed: ${res.status}`)
    return { ok: true, mode: 'remote' }
  }

  await new Promise((r) => setTimeout(r, 600))
  const key = 'gc-submissions'
  const existing = JSON.parse(window.localStorage.getItem(key) || '[]')
  existing.push(payload)
  window.localStorage.setItem(key, JSON.stringify(existing))
  return { ok: true, mode: 'local' }
}
