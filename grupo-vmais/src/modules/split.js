/**
 * Divide o texto de um elemento em palavras mascaradas, preservando
 * elementos internos (ex.: <em>) e a leitura por tecnologias assistivas
 * (o texto continua no DOM, com espaços reais entre as palavras).
 */
export function splitWords(el) {
  if (el.dataset.splitDone) return el.querySelectorAll('.line__in');
  const walk = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === 3) {
        const parts = child.textContent.split(/(\s+)/);
        const frag = document.createDocumentFragment();
        parts.forEach((p) => {
          if (!p) return;
          if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(' ')); return; }
          const outer = document.createElement('span');
          outer.className = 'line';
          outer.style.display = 'inline-block';
          const inner = document.createElement('span');
          inner.className = 'line__in';
          inner.textContent = p;
          outer.appendChild(inner);
          frag.appendChild(outer);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === 1) {
        walk(child);
      }
    });
  };
  walk(el);
  el.dataset.splitDone = '1';
  return el.querySelectorAll('.line__in');
}
