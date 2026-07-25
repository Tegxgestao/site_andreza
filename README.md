# Site — Andreza Frontelmo

Site de bio (link do Instagram) de Andreza Frontelmo: liderança, comportamento e desenvolvimento humano.

Site estático, sem build e sem dependências — para publicar, basta servir estes arquivos.

## Estrutura

| Arquivo | O que é |
|---|---|
| `index.html` | Página principal (nome, frase e botões) |
| `palestras.html` | Introdução + formulário de palestras/treinamentos |
| `mentoria.html` | Introdução + formulário de mentoria pessoal |
| `agenda.html` + `agenda.js` | Agenda de eventos, mês a mês |
| `styles.css` | Todos os estilos |
| `img/` | Fotos |
| `completo.html/css/js` | Versão institucional completa (arquivada, não linkada) |

## Configurações pendentes

- **Formulários:** trocar `contato@exemplo.com` pelo e-mail real no `action` dos formulários em `palestras.html` e `mentoria.html` (procure pelos comentários `EMAIL:`). O envio usa FormSubmit.co — no primeiro envio real, clicar no link de ativação que chega por e-mail.
- **Agenda:** preencher as constantes no topo de `agenda.js` (`CALENDAR_ID` + `API_KEY` do Google Agenda, ou `SHEET_URL` de planilha publicada em CSV). Instruções nos comentários do próprio arquivo. Enquanto vazio, mostra eventos de exemplo.

## Atualizações

Edite os arquivos e faça commit na branch `main` — o GitHub Pages publica automaticamente.
