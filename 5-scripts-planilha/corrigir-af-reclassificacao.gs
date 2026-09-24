/**
 * CORRIGE a coluna AF de 5 linhas ja lancadas, na aba Setembro/2026.
 * Reclassificacao decidida pelo Tiago em 10/09/2026 - os 5 sairam da planilha da
 * Priscila (reinsercao de cena) e passaram para os editores.
 *
 * ATENCAO: este script SOBRESCREVE a AF, ao contrario dos anteriores, que so
 * escreviam em celula vazia. Por isso ele:
 *   1. confere o SKU da coluna A de cada linha;
 *   2. confere que a AF atual e exatamente o valor "de" esperado;
 *   3. se qualquer uma das duas conferencias falhar, ABORTA sem escrever nada;
 *   4. registra no log o valor antigo de cada celula antes de trocar.
 *
 * USO: Extensoes > Apps Script > colar > Executar (corrigirAf) > Execucao > Registros.
 */

var ABA = 'Setembro/2026';
var TROCAS = [
 {
  "l": 782,
  "sku": "241386000",
  "de": "REINSERÇÃO CENAS IA/roteiro",
  "para": "Alteração"
 },
 {
  "l": 1257,
  "sku": "232090700",
  "de": "REINSERÇÃO CENAS IA/áudio",
  "para": "Alteração/áudio"
 },
 {
  "l": 1264,
  "sku": "232095400",
  "de": "REINSERÇÃO CENAS IA",
  "para": "REINSERÇÃO CENAS IA edição"
 },
 {
  "l": 1269,
  "sku": "232096100",
  "de": "REINSERÇÃO CENAS IA",
  "para": "REINSERÇÃO CENAS IA edição"
 },
 {
  "l": 1326,
  "sku": "232529500",
  "de": "REINSERÇÃO CENAS IA",
  "para": "Alteração"
 }
];

function corrigirAf() {
  var sh = SpreadsheetApp.getActive().getSheetByName(ABA);
  if (!sh) throw new Error('Aba nao encontrada: ' + ABA);

  function normSku(v) {
    if (v === null || v === undefined) return '';
    var s = String(v).trim(); var n = Number(s);
    if (!isNaN(n) && s !== '') return String(Math.round(n));
    return s;
  }

  var problemas = [];
  for (var i = 0; i < TROCAS.length; i++) {
    var t = TROCAS[i];
    var sku = normSku(sh.getRange(t.l, 1).getValue());
    if (sku !== normSku(t.sku)) {
      problemas.push('linha ' + t.l + ': SKU esperado ' + t.sku + ', achado ' + sku);
      continue;
    }
    var af = String(sh.getRange(t.l, 32).getValue()).trim();
    if (af !== t.de) {
      problemas.push('linha ' + t.l + ' (' + t.sku + '): AF esperada "' + t.de + '", achada "' + af + '"');
    }
  }
  if (problemas.length) {
    Logger.log('ABORTADO - %s problema(s), NADA foi alterado:', problemas.length);
    problemas.forEach(function (m) { Logger.log('  ' + m); });
    Logger.log('Se a AF achada estiver vazia, rode antes o lancar-af-alteracoes.gs.');
    return;
  }

  Logger.log('Conferencia OK. Trocando %s celula(s):', TROCAS.length);
  for (var j = 0; j < TROCAS.length; j++) {
    var x = TROCAS[j];
    sh.getRange(x.l, 32).setValue(x.para);
    Logger.log('  linha %s (%s): "%s"  ->  "%s"', x.l, x.sku, x.de, x.para);
  }
  Logger.log('Pronto. AJ e demais colunas nao foram tocadas.');
}
