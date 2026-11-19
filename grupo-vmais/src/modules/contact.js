/**
 * Contato inteligente: monta, no navegador, a mensagem da área escolhida
 * e abre o WhatsApp oficial com o texto pronto. Nada é enviado pelo site —
 * o envio acontece quando o visitante confirma no WhatsApp.
 */
export function initContact() {
  const form = document.getElementById('lead-form');
  if (!form) return;
  let cfg = { whatsapp: {}, servicos: [] };
  try { cfg = JSON.parse(document.getElementById('contato-data').textContent); } catch (e) { /* sem configuração */ }

  const nome = form.querySelector('#lead-nome');
  const sobre = form.querySelector('#lead-sobre');
  const data = form.querySelector('#lead-data');
  const erro = form.querySelector('#lead-nome-erro');
  const radios = [...form.querySelectorAll('input[name="servico"]')];

  const servicoAtual = () => radios.find((r) => r.checked)?.value || radios[0]?.value;
  const formatarData = (v) => {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v || '');
    return m ? `${m[3]}/${m[2]}/${m[1]}` : '';
  };
  const montarMensagem = () => {
    const sv = cfg.servicos.find((s) => s.id === servicoAtual()) || cfg.servicos[0];
    const linhas = [sv.abertura, `Meu nome é ${nome.value.trim()} e ${sv.pedido}`];
    const descricao = sobre.value.trim();
    const quando = formatarData(data.value);
    if (descricao) linhas.push('', 'Sobre o projeto:', descricao);
    if (quando) linhas.push('', 'Data prevista:', quando);
    return linhas.join('\n');
  };
  const numero = () => {
    const id = servicoAtual();
    return (cfg.whatsapp && (cfg.whatsapp[id] || cfg.whatsapp.grupo)) || '';
  };

  const setErro = (on) => {
    erro.hidden = !on;
    if (on) nome.setAttribute('aria-invalid', 'true'); else nome.removeAttribute('aria-invalid');
  };
  nome.addEventListener('input', () => { if (nome.value.trim()) setErro(false); });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!nome.value.trim()) { setErro(true); nome.focus(); return; }
    const tel = numero();
    if (!tel) return;
    const url = `https://wa.me/${tel}?text=${encodeURIComponent(montarMensagem())}`;
    const a = document.createElement('a');
    a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer';
    document.body.appendChild(a); a.click(); a.remove();
  });

  // Seleção vinda do seletor de empresas
  document.addEventListener('vmais:contact-select', (e) => {
    const { id, scroll } = e.detail || {};
    const r = radios.find((x) => x.value === id);
    if (r) r.checked = true;
    if (scroll) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      document.getElementById('contato')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        setTimeout(() => nome.focus({ preventScroll: true }), reduce ? 0 : 800);
      }
    }
  });

  // Expõe para testes e depuração
  window.__vmaisContato = { montarMensagem, numero };
}
