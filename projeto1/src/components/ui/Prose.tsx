export function Prose({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-2 font-serif text-3xl text-ivory sm:text-4xl">{title}</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-stone [&_h2]:mt-8 [&_h2]:font-serif [&_h2]:text-xl [&_h2]:text-ivory [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-ivory/90">
        {children}
      </div>
    </article>
  );
}
