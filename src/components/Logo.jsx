export default function Logo({ light = false }) {
  return (
    <span className="inline-flex items-center gap-3">
      <span className={`flex h-10 w-1.5 ${light ? 'bg-accent' : 'bg-primary-900'}`} aria-hidden="true" />
      <span className="leading-none">
        <span className={`block text-lg font-bold tracking-tight ${light ? 'text-white' : 'text-grey-900'}`}>OSA Connect</span>
        <span className={`mt-1 block text-[11px] font-medium uppercase tracking-[0.08em] ${light ? 'text-grey-300' : 'text-grey-500'}`}>
          Plateforme d’orientation des entrepreneurs
        </span>
      </span>
    </span>
  )
}
