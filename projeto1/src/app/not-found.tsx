import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="eyebrow">Página não encontrada</p>
      <h1 className="mt-3 font-serif text-3xl text-ivory">Este capítulo não existe no nosso acervo.</h1>
      <Link href="/personalidades" className="mt-6 inline-flex rounded-lg bg-ivory px-4 py-2 text-sm font-medium text-ink hover:bg-bronze">
        Ver personalidades
      </Link>
    </div>
  );
}
