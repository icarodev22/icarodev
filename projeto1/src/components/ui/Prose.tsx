export function Prose({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-2 font-display text-3xl text-fg sm:text-4xl">{title}</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-muted [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-fg [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-fg/90">
        {children}
      </div>
    </article>
  );
}
