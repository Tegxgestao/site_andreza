/* Tema do dia — os três designs aprovados se revezam, um por dia,
   virando à meia-noite de Brasília (UTC-3). Carregar SEM defer no
   <head>, antes do CSS, para o tema valer já na primeira pintura.
   ?tema=noturno|minimal|palco na URL força um tema (conferência/demo). */
(function () {
  var temas = ["noturno", "minimal", "palco"];
  var forcado = new URLSearchParams(location.search).get("tema");
  if (temas.indexOf(forcado) !== -1) {
    document.documentElement.dataset.tema = forcado;
    return;
  }
  var dia = Math.floor(Date.now() / 864e5 - 3 / 24); /* dias corridos, UTC-3 */
  document.documentElement.dataset.tema = temas[((dia % 3) + 3) % 3];
})();
