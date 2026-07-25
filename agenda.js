/* ============================================================
   AGENDA — configuração
   ------------------------------------------------------------
   OPÇÃO A (recomendada): Google Agenda
   Criar na conta da Andreza um calendário separado (ex.:
   "Agenda do Site"), marcado como público. Ela continua anotando
   tudo no Google Agenda; eventos para o site ela salva nesse
   calendário (um toque a mais ao criar o evento).
   Preencher abaixo:
   - CALENDAR_ID: em Configurações do calendário > "ID da agenda"
   - API_KEY: chave da API do Google Calendar (console.cloud.google.com,
     restrita à Calendar API e ao domínio do site)
   - PALAVRA_CHAVE (opcional): se preenchida, só eventos cujo
     título contém essa palavra aparecem no site (a palavra é
     removida do título exibido).

   OPÇÃO B: Planilha Google publicada como CSV em SHEET_URL
   (Arquivo > Compartilhar > Publicar na web > CSV).
   Colunas: Data (dd/mm/aaaa) | Evento | Local | Observação

   Prioridade: Google Agenda > Planilha > exemplos abaixo
   (EXCLUIR os exemplos quando uma fonte real estiver ativa).
   ============================================================ */
const CALENDAR_ID = "";
const API_KEY = "";
const PALAVRA_CHAVE = "";
const SHEET_URL = "";

const EVENTOS_EXEMPLO = [
  { data: "10/08/2026", evento: "Exemplo — Palestra: Liderança na prática", local: "São Paulo · SP", obs: "" },
  { data: "22/08/2026", evento: "Exemplo — Treinamento in-company: Comunicação e protagonismo", local: "Campinas · SP", obs: "Evento fechado para colaboradores" },
  { data: "05/09/2026", evento: "Exemplo — Convenção de vendas: Comportamento que gera resultado", local: "Belo Horizonte · MG", obs: "" }
];

function parseDate(s) {
  s = (s || "").trim();
  let m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (m) return new Date(+m[3], +m[2] - 1, +m[1]);
  m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (m) return new Date(+m[1], +m[2] - 1, +m[3]);
  return null;
}

function parseCSV(text) {
  const rows = [];
  let row = [], cell = "", inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') inQuotes = false;
      else cell += c;
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(cell); cell = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cell); cell = "";
      if (row.some(v => v.trim() !== "")) rows.push(row);
      row = [];
    } else {
      cell += c;
    }
  }
  row.push(cell);
  if (row.some(v => v.trim() !== "")) rows.push(row);
  return rows;
}

function el(tag, cls, texto) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (texto !== undefined) n.textContent = texto;
  return n;
}

function capitalizar(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function render(eventos) {
  const container = document.getElementById("agenda");
  container.textContent = "";

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const futuros = eventos
    .map(e => ({ ...e, d: e.d || parseDate(e.data) }))
    .filter(e => e.d && e.d >= hoje)
    .sort((a, b) => a.d - b.d);

  if (!futuros.length) {
    const vazio = el("div", "agenda-empty");
    vazio.append(el("p", "", "Nenhum evento público confirmado no momento."));
    const cta = el("a", "btn btn--primary", "Leve a Andreza para o seu evento");
    cta.href = "palestras.html";
    vazio.append(cta);
    container.append(vazio);
    return;
  }

  const fmtMes = new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" });
  const fmtDia = new Intl.DateTimeFormat("pt-BR", { weekday: "short" });

  let eventsDiv = null, mesAtual = "";
  for (const e of futuros) {
    const mes = capitalizar(fmtMes.format(e.d));
    if (mes !== mesAtual) {
      const section = el("section", "month");
      section.append(el("h2", "", mes));
      eventsDiv = el("div", "events");
      section.append(eventsDiv);
      container.append(section);
      mesAtual = mes;
    }

    const art = el("article", "event");
    const dataDiv = el("div", "event-date");
    dataDiv.append(el("span", "event-day", String(e.d.getDate())));
    dataDiv.append(el("span", "event-wd", fmtDia.format(e.d).replace(".", "")));

    const info = el("div", "event-info");
    info.append(el("h3", "", e.evento));
    const detalhes = [e.hora, e.local].filter(Boolean).join(" · ");
    if (detalhes) info.append(el("p", "", detalhes));
    if (e.obs) info.append(el("p", "event-obs", e.obs));

    art.append(dataDiv, info);
    eventsDiv.append(art);
  }
}

async function carregarDoGoogleAgenda() {
  const params = new URLSearchParams({
    key: API_KEY,
    timeMin: new Date().toISOString(),
    maxResults: "100",
    singleEvents: "true",
    orderBy: "startTime"
  });
  const url = "https://www.googleapis.com/calendar/v3/calendars/" +
    encodeURIComponent(CALENDAR_ID) + "/events?" + params.toString();
  const resp = await fetch(url, { cache: "no-store" });
  if (!resp.ok) throw new Error("HTTP " + resp.status);
  const dados = await resp.json();
  const fmtHora = new Intl.DateTimeFormat("pt-BR", { hour: "numeric", minute: "2-digit" });

  let itens = dados.items || [];
  if (PALAVRA_CHAVE) {
    const chave = PALAVRA_CHAVE.toLowerCase();
    itens = itens.filter(ev => (ev.summary || "").toLowerCase().includes(chave));
  }

  return itens
    .filter(ev => ev.status !== "cancelled" && (ev.start || {}))
    .map(ev => {
      const comHora = !!(ev.start && ev.start.dateTime);
      const d = comHora ? new Date(ev.start.dateTime) : parseDate((ev.start && ev.start.date) || "");
      let titulo = (ev.summary || "").trim();
      if (PALAVRA_CHAVE) {
        titulo = titulo.replace(new RegExp(PALAVRA_CHAVE.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "ig"), "").replace(/\s{2,}/g, " ").trim();
      }
      return {
        d: d,
        evento: titulo,
        local: (ev.location || "").trim(),
        hora: comHora ? fmtHora.format(d).replace(":", "h") : "",
        obs: ""
      };
    })
    .filter(e => e.d && e.evento);
}

async function carregarDaPlanilha() {
  const resp = await fetch(SHEET_URL, { cache: "no-store" });
  if (!resp.ok) throw new Error("HTTP " + resp.status);
  const rows = parseCSV(await resp.text());
  return rows
    .filter(r => parseDate(r[0]))
    .map(r => ({ data: r[0], evento: (r[1] || "").trim(), local: (r[2] || "").trim(), obs: (r[3] || "").trim() }))
    .filter(e => e.evento);
}

async function init() {
  try {
    if (CALENDAR_ID && API_KEY) {
      render(await carregarDoGoogleAgenda());
    } else if (SHEET_URL) {
      render(await carregarDaPlanilha());
    } else {
      render(EVENTOS_EXEMPLO);
    }
  } catch (err) {
    render([]);
  }
}

init();
