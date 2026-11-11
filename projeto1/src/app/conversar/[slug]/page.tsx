import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatHistoricalDate, getCategory, getPersonality, PERSONALITIES } from "@/content";
import { ChatRoom } from "@/components/chat/ChatRoom";
import type { ChatProfile } from "@/components/chat/types";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return PERSONALITIES.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const p = getPersonality((await params).slug);
  return p ? { title: `Conversar com ${p.name}`, description: p.shortDescription } : {};
}

export default async function ChatPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<{ pergunta?: string }>;
}) {
  const p = getPersonality((await params).slug);
  if (!p) notFound();
  const { pergunta } = await searchParams;

  // Somente dados de exibição vão ao navegador (a base de conhecimento fica no servidor).
  const profile: ChatProfile = {
    slug: p.slug,
    name: p.name,
    field: p.field,
    categoryName: getCategory(p.category).name,
    periodLabel: p.periodLabel,
    born: formatHistoricalDate(p.born),
    died: formatHistoricalDate(p.died),
    birthPlace: p.birthPlace,
    deathPlace: p.deathPlace,
    historicalContext: p.historicalContext,
    contributions: p.contributions,
    works: p.works,
    timeline: p.timeline,
    references: p.references,
    suggestedQuestions: p.suggestedQuestions,
    art: p.portrait.art,
    portraitAlt: p.portrait.alt,
    portraitNotice: p.portrait.notice,
  };
  const options = PERSONALITIES.map((x) => ({ slug: x.slug, name: x.name, categoryName: getCategory(x.category).name }));

  return (
    <ChatRoom
      key={p.slug}
      profile={profile}
      options={options}
      initialQuestion={typeof pergunta === "string" ? pergunta.slice(0, 300) : undefined}
    />
  );
}
