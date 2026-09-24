/**
 * Preenche a coluna AF (Aprov Video) dos 44 itens EM ALTERACAO da diaria 03.09.
 * Complementa o lancar-retorno-dany.gs, que ja escreveu AF dos aprovados e AJ das alteracoes.
 *
 * SEGURANCA: confere o SKU da coluna A antes; se algum divergir, aborta sem escrever nada.
 *            nao sobrescreve AF que ja tenha conteudo.
 * USO: Extensoes > Apps Script > colar > Executar (lancarAfAlteracoes) > Execucao > Registros.
 */

var ABA = 'Setembro/2026';
var DADOS = [
 {
  "l": 325,
  "sku": "240843400",
  "af": "REINSERÇÃO CENAS IA"
 },
 {
  "l": 445,
  "sku": "237634400",
  "af": "REINSERÇÃO CENAS IA"
 },
 {
  "l": 711,
  "sku": "237352900",
  "af": "REINSERÇÃO CENAS IA"
 },
 {
  "l": 782,
  "sku": "241386000",
  "af": "REINSERÇÃO CENAS IA/roteiro"
 },
 {
  "l": 1198,
  "sku": "232049400",
  "af": "REINSERÇÃO CENAS IA edição"
 },
 {
  "l": 1213,
  "sku": "232059300",
  "af": "REINSERÇÃO CENAS IA"
 },
 {
  "l": 1214,
  "sku": "232059100",
  "af": "REINSERÇÃO CENAS IA"
 },
 {
  "l": 1229,
  "sku": "232070400",
  "af": "REINSERÇÃO CENAS IA"
 },
 {
  "l": 1230,
  "sku": "232069900",
  "af": "REINSERÇÃO CENAS IA"
 },
 {
  "l": 1231,
  "sku": "232070700",
  "af": "REINSERÇÃO CENAS IA"
 },
 {
  "l": 1232,
  "sku": "232070800",
  "af": "REINSERÇÃO CENAS IA"
 },
 {
  "l": 1234,
  "sku": "232085100",
  "af": "REINSERÇÃO CENAS IA"
 },
 {
  "l": 1235,
  "sku": "232085800",
  "af": "REINSERÇÃO CENAS IA"
 },
 {
  "l": 1236,
  "sku": "232086000",
  "af": "REINSERÇÃO CENAS IA"
 },
 {
  "l": 1238,
  "sku": "232086100",
  "af": "REINSERÇÃO CENAS IA edição"
 },
 {
  "l": 1239,
  "sku": "232086900",
  "af": "REINSERÇÃO CENAS IA"
 },
 {
  "l": 1244,
  "sku": "232088900",
  "af": "REINSERÇÃO CENAS IA"
 },
 {
  "l": 1248,
  "sku": "232089600",
  "af": "REINSERÇÃO CENAS IA/áudio"
 },
 {
  "l": 1250,
  "sku": "232089900",
  "af": "REINSERÇÃO CENAS IA"
 },
 {
  "l": 1253,
  "sku": "232090100",
  "af": "REINSERÇÃO CENAS IA"
 },
 {
  "l": 1257,
  "sku": "232090700",
  "af": "REINSERÇÃO CENAS IA/áudio"
 },
 {
  "l": 1264,
  "sku": "232095400",
  "af": "REINSERÇÃO CENAS IA"
 },
 {
  "l": 1269,
  "sku": "232096100",
  "af": "REINSERÇÃO CENAS IA"
 },
 {
  "l": 1270,
  "sku": "232096300",
  "af": "REINSERÇÃO CENAS IA"
 },
 {
  "l": 1271,
  "sku": "232096400",
  "af": "REINSERÇÃO CENAS IA"
 },
 {
  "l": 1273,
  "sku": "232097400",
  "af": "REINSERÇÃO CENAS IA"
 },
 {
  "l": 1278,
  "sku": "232099300",
  "af": "REINSERÇÃO CENAS IA"
 },
 {
  "l": 1280,
  "sku": "232098100",
  "af": "REINSERÇÃO CENAS IA"
 },
 {
  "l": 1281,
  "sku": "232099000",
  "af": "REINSERÇÃO CENAS IA"
 },
 {
  "l": 1283,
  "sku": "232099200",
  "af": "REINSERÇÃO CENAS IA"
 },
 {
  "l": 1288,
  "sku": "232100600",
  "af": "REINSERÇÃO CENAS IA"
 },
 {
  "l": 1289,
  "sku": "232100400",
  "af": "REINSERÇÃO CENAS IA"
 },
 {
  "l": 1290,
  "sku": "232099900",
  "af": "REINSERÇÃO CENAS IA"
 },
 {
  "l": 1292,
  "sku": "232099400",
  "af": "REINSERÇÃO CENAS IA"
 },
 {
  "l": 1296,
  "sku": "232102300",
  "af": "REINSERÇÃO CENAS IA"
 },
 {
  "l": 1302,
  "sku": "232103400",
  "af": "REINSERÇÃO CENAS IA edição"
 },
 {
  "l": 1304,
  "sku": "232104200",
  "af": "REINSERÇÃO CENAS IA edição"
 },
 {
  "l": 1306,
  "sku": "232104600",
  "af": "REINSERÇÃO CENAS IA edição"
 },
 {
  "l": 1316,
  "sku": "232180100",
  "af": "REINSERÇÃO CENAS IA/áudio"
 },
 {
  "l": 1319,
  "sku": "232448400",
  "af": "REINSERÇÃO CENAS IA"
 },
 {
  "l": 1323,
  "sku": "232524200",
  "af": "REINSERÇÃO CENAS IA edição"
 },
 {
  "l": 1324,
  "sku": "232524100",
  "af": "Alteração áudio"
 },
 {
  "l": 1336,
  "sku": "234659600",
  "af": "REINSERÇÃO CENAS IA"
 },
 {
  "l": 1386,
  "sku": "235465200",
  "af": "REINSERÇÃO CENAS IA"
 }
];

function lancarAfAlteracoes() {
  var sh = SpreadsheetApp.getActive().getSheetByName(ABA);
  if (!sh) throw new Error('Aba nao encontrada: ' + ABA);

  function normSku(v) {
    if (v === null || v === undefined) return '';
    var s = String(v).trim();
    if (/^\d+(\.0+)?$/.test(s)) return String(Math.round(Number(s)));
    if (/^\d(\.\d+)?[eE]\+?\d+$/.test(s)) return String(Math.round(Number(s)));
    return s;
  }

  var div = [];
  for (var i = 0; i < DADOS.length; i++) {
    var atual = normSku(sh.getRange(DADOS[i].l, 1).getValue());
    if (atual !== DADOS[i].sku) div.push('linha ' + DADOS[i].l + ': esperado ' + DADOS[i].sku + ', achado ' + atual);
  }
  if (div.length) {
    Logger.log('ABORTADO - %s divergencia(s), nada escrito:', div.length);
    div.forEach(function (m) { Logger.log('  ' + m); });
    return;
  }
  Logger.log('Conferencia OK: %s SKUs batem.', DADOS.length);

  var n = 0, pulos = [];
  for (var j = 0; j < DADOS.length; j++) {
    var cel = sh.getRange(DADOS[j].l, 32);           // AF
    var antes = cel.getValue();
    if (antes !== '' && antes !== null) {
      pulos.push('linha ' + DADOS[j].l + ' ja tinha: ' + String(antes).slice(0, 50));
      continue;
    }
    cel.setValue(DADOS[j].af);
    n++;
  }
  Logger.log('AF escritas: %s de %s.', n, DADOS.length);
  if (pulos.length) { Logger.log('Puladas (%s):', pulos.length); pulos.forEach(function (m) { Logger.log('  ' + m); }); }
}
