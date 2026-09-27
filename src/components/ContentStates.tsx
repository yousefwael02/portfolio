export function PageLoading({label = 'Loading content'}: {label?: string}) {
  return (
    <section className="content-state section-wrap" role="status" aria-live="polite" aria-label={label}>
      <span className="content-state__line" />
      <span className="content-state__line content-state__line--short" />
    </section>
  )
}

export function EmptyState({title, children}: {title: string; children: string}) {
  return (
    <div className="empty-state">
      <p className="eyebrow">Nothing to show yet</p>
      <h2>{title}</h2>
      <p>{children}</p>
    </div>
  )
}