/**
 * Verifica se as URLs de referência respondem (HTTP 2xx/3xx). Requer acesso à
 * internet; no ambiente de desenvolvimento original os domínios estavam bloqueados.
 *   npm run check:references
 */
import { PERSONALITIES } from "../src/content";

async function main() {
  const urls = [...new Set(PERSONALITIES.flatMap((p) => p.references.map((r) => r.url).filter((u): u is string => Boolean(u))))];
  let failed = 0;
  for (const url of urls) {
    try {
      const res = await fetch(url, { method: "GET", redirect: "follow", signal: AbortSignal.timeout(15000), headers: { "User-Agent": "projeto1-reference-check" } });
      const ok = res.status < 400;
      if (!ok) failed++;
      console.log(`${ok ? "OK " : "ERR"} ${res.status} ${url}`);
    } catch (err) {
      failed++;
      console.log(`ERR --- ${url} (${err instanceof Error ? err.message : "falha"})`);
    }
  }
  console.log(`\n${urls.length - failed}/${urls.length} URLs acessíveis.`);
  process.exit(failed ? 1 : 0);
}
void main();
