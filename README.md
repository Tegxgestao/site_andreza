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
| `obrigado.html` | Página de agradecimento pós-envio dos formulários |
| `styles.css` | Todos os estilos |
| `img/` | Fotos |
| `completo.html/css/js` | Versão institucional completa (linkada pelo botão "Me Conheça") |

## Configurações pendentes

- **Formulários:** enviam via FormSubmit.co usando o alias anônimo no `action` — o e-mail de destino não aparece no código nem na URL. O formulário já foi ativado; se um dia trocar o e-mail de destino, será preciso ativar de novo (e-mail "Activate Form" do FormSubmit).
- **Agenda:** preencher as constantes no topo de `agenda.js` (`CALENDAR_ID` + `API_KEY` do Google Agenda, ou `SHEET_URL` de planilha publicada em CSV). Instruções nos comentários do próprio arquivo. Enquanto vazio, mostra eventos de exemplo.

## Atualizações

Edite os arquivos e faça commit na branch `main` — o GitHub Pages publica automaticamente.
