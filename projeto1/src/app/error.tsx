"use client";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  // Detalhes técnicos não são exibidos ao usuário.
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="eyebrow">Algo deu errado</p>
      <h1 className="mt-3 font-serif text-3xl text-ivory">Não foi possível carregar esta página.</h1>
      <button onClick={reset} className="mt-6 rounded-lg bg-ivory px-4 py-2 text-sm font-medium text-ink hover:bg-bronze">
        Tentar novamente
      </button>
    </div>
  );
}
