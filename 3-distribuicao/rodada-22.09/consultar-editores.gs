/**
 * CONSULTA (somente leitura) — rodada de distribuição 22/09/2026.
 * Para cada SKU em aberto das diárias 08.09 a 21.09, lista TODAS as linhas
 * em que ele aparece nas abas de 2026, com editor (Z) e o estado das colunas
 * de envio/retorno. Não escreve nada na planilha.
 *
 * Saída: um arquivo "consulta-editores_22-09-2026.csv" na raiz do Meu Drive
 * (a URL sai no log). Como rodar: Extensões > Apps Script > colar > Executar.
 */
var SKUS = '124340800,155589700,214592700,217689200,217696200,220544200,221137300,221420400,224822200,224915900,225415400,225415700,225511800,226185900,226298200,226499400,226773000,226911600,227010700,227346300,227421700,228701800,228705000,228886800,230255300,230428100,230560100,231615000,231654900,231656900,232049000,232058800,232059800,232067700,232086200,232089000,232089500,232091700,232095100,232095200,232100000,232102600,232102800,232105600,233891500,234515100,234767300,234969900,234970100,234976400,234980600,235027100,235581900,235690600,235720800,235721300,236835900,236836200,236836600,236836900,236837000,236862500,237260200,237360300,237850200,237902600,237956600,238119400,238130500,238131600,238133700,238198600,238253900,238266900,238308500,238309000,238413300,238413600,238414500,238424200,238432300,238432900,238433500,238435600,238436300,238437200,238438900,238491400,238521700,238648900,238653000,238659700,238772100,238820700,238825800,238829000,238829400,238830900,238838700,238855900,238859400,238945900,238946000,238946100,238955800,238967000,238967500,238984500,238996500,238996900,240014700,240040000,240054300,240062500,240062900,240064100,240064700,240082100,240084200,240087700,240099700,240100700,240122000,240122300,240132900,240133000,240133400,240143300,240144000,240154800,240169600,240170000,240196200,240254800,240288000,240348300,240351700,240378500,240384800,240554500,240683200,240685600,240687300,240693300,240706500,240736600,240813600,240881200,240889500,240891200,240891300,240991200,240999100,241007600,241107700,241125300,241180200,241214000,241222000,241278900,241317300,241324900,241383600,241424500,80905100,86021600,88043800'.split(',');

function consultarEditores() {
  var alvo = {};
  SKUS.forEach(function (s) { alvo[s] = true; });
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var tz = ss.getSpreadsheetTimeZone();
  var fmt = function (v) {
    if (v instanceof Date) return Utilities.formatDate(v, tz, 'dd/MM/yyyy');
    return String(v === null || v === undefined ? '' : v).replace(/[\r\n]+/g, ' / ').replace(/"/g, "'");
  };
  // colunas (base 0): A0 B1 M12 Q16 W22 Y24 Z25 AA26 AB27 AD29 AF31 AG32 AJ35
  var COLS = [0, 1, 12, 16, 22, 24, 25, 26, 27, 29, 31, 32, 35];
  var head = ['aba', 'linha', 'sku', 'produto', 'tipo', 'link_roteiro', 'link_drive', 'coord_video',
              'editor', 'dta_distrib', 'dta_receb', 'ad_enviado_cliente', 'af', 'ag', 'aj'];
  var out = [head];
  var achados = {};
  ss.getSheets().forEach(function (sh) {
    var nome = sh.getName();
    if (!/2026$/.test(nome)) return;
    var n = sh.getLastRow();
    if (n < 2) return;
    var vals = sh.getRange(2, 1, n - 1, 36).getValues();
    for (var i = 0; i < vals.length; i++) {
      var raw = vals[i][0];
      if (raw === '' || raw === null) continue;
      var sku = (typeof raw === 'number') ? String(Math.round(raw)) : String(raw).trim().replace(/^0+/, '');
      if (!alvo[sku]) continue;
      achados[sku] = true;
      var linha = [nome, i + 2];
      COLS.forEach(function (c) { linha.push(fmt(vals[i][c])); });
      out.push(linha);
    }
  });
  var faltam = SKUS.filter(function (s) { return !achados[s]; });
  var csv = out.map(function (l) {
    return l.map(function (v) { return '"' + v + '"'; }).join(',');
  }).join('\n');
  var f = DriveApp.createFile('consulta-editores_22-09-2026.csv', csv, MimeType.CSV);
  Logger.log('linhas encontradas: ' + (out.length - 1));
  Logger.log('SKUs sem linha em nenhuma aba 2026: ' + faltam.length + ' -> ' + faltam.join(', '));
  Logger.log('arquivo: ' + f.getUrl());
}
