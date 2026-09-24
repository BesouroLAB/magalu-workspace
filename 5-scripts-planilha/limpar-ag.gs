/**
 * Deixa a coluna AG (Coorden/Dist/Ajustes) EM BRANCO nas linhas lancadas por nos,
 * para o Tiago identificar quais entraram nas diarias 03.09 e 04.09.
 *
 * NAO limpa as 23 linhas que JA tinham AG preenchida antes das nossas rodadas
 * (conferido no Web_Video.xlsx local) - essas estao listadas em PRESERVADAS e so
 * sao reportadas no log, nunca alteradas.
 *
 * USO: Extensoes > Apps Script > colar > Executar (limparAgDasNossasLinhas)
 *      > Execucao > Registros.
 *
 * SE A AG VOLTAR A APARECER PREENCHIDA depois de rodar, existe um gatilho onEdit
 * na planilha carimbando a coluna - me avise que mudamos a abordagem.
 */

var ABA = 'Setembro/2026';
var LIMPAR = [
 {
  "l": 325,
  "sku": "240843400"
 },
 {
  "l": 330,
  "sku": "240690600"
 },
 {
  "l": 374,
  "sku": "241107500"
 },
 {
  "l": 379,
  "sku": "240805000"
 },
 {
  "l": 445,
  "sku": "237634400"
 },
 {
  "l": 608,
  "sku": "240350100"
 },
 {
  "l": 610,
  "sku": "240375700"
 },
 {
  "l": 614,
  "sku": "240347500"
 },
 {
  "l": 616,
  "sku": "238160800"
 },
 {
  "l": 618,
  "sku": "216465300"
 },
 {
  "l": 711,
  "sku": "237352900"
 },
 {
  "l": 757,
  "sku": "241125100"
 },
 {
  "l": 771,
  "sku": "218817100"
 },
 {
  "l": 777,
  "sku": "238264200"
 },
 {
  "l": 782,
  "sku": "241386000"
 },
 {
  "l": 784,
  "sku": "240374700"
 },
 {
  "l": 785,
  "sku": "043186100"
 },
 {
  "l": 786,
  "sku": "241257900"
 },
 {
  "l": 787,
  "sku": "240647500"
 },
 {
  "l": 790,
  "sku": "240066800"
 },
 {
  "l": 795,
  "sku": "204581600"
 },
 {
  "l": 804,
  "sku": "238490100"
 },
 {
  "l": 836,
  "sku": "238777800"
 },
 {
  "l": 1198,
  "sku": "232049400"
 },
 {
  "l": 1213,
  "sku": "232059300"
 },
 {
  "l": 1214,
  "sku": "232059100"
 },
 {
  "l": 1228,
  "sku": "232069100"
 },
 {
  "l": 1229,
  "sku": "232070400"
 },
 {
  "l": 1230,
  "sku": "232069900"
 },
 {
  "l": 1231,
  "sku": "232070700"
 },
 {
  "l": 1232,
  "sku": "232070800"
 },
 {
  "l": 1233,
  "sku": "232085000"
 },
 {
  "l": 1234,
  "sku": "232085100"
 },
 {
  "l": 1235,
  "sku": "232085800"
 },
 {
  "l": 1236,
  "sku": "232086000"
 },
 {
  "l": 1238,
  "sku": "232086100"
 },
 {
  "l": 1239,
  "sku": "232086900"
 },
 {
  "l": 1242,
  "sku": "232087700"
 },
 {
  "l": 1244,
  "sku": "232088900"
 },
 {
  "l": 1247,
  "sku": "232089200"
 },
 {
  "l": 1248,
  "sku": "232089600"
 },
 {
  "l": 1250,
  "sku": "232089900"
 },
 {
  "l": 1251,
  "sku": "232089700"
 },
 {
  "l": 1252,
  "sku": "232090300"
 },
 {
  "l": 1253,
  "sku": "232090100"
 },
 {
  "l": 1254,
  "sku": "232090400"
 },
 {
  "l": 1255,
  "sku": "232090500"
 },
 {
  "l": 1256,
  "sku": "232090800"
 },
 {
  "l": 1257,
  "sku": "232090700"
 },
 {
  "l": 1260,
  "sku": "232095000"
 },
 {
  "l": 1264,
  "sku": "232095400"
 },
 {
  "l": 1266,
  "sku": "232095300"
 },
 {
  "l": 1267,
  "sku": "232095900"
 },
 {
  "l": 1268,
  "sku": "232095800"
 },
 {
  "l": 1269,
  "sku": "232096100"
 },
 {
  "l": 1270,
  "sku": "232096300"
 },
 {
  "l": 1271,
  "sku": "232096400"
 },
 {
  "l": 1273,
  "sku": "232097400"
 },
 {
  "l": 1278,
  "sku": "232099300"
 },
 {
  "l": 1280,
  "sku": "232098100"
 },
 {
  "l": 1281,
  "sku": "232099000"
 },
 {
  "l": 1282,
  "sku": "232098500"
 },
 {
  "l": 1283,
  "sku": "232099200"
 },
 {
  "l": 1288,
  "sku": "232100600"
 },
 {
  "l": 1289,
  "sku": "232100400"
 },
 {
  "l": 1290,
  "sku": "232099900"
 },
 {
  "l": 1291,
  "sku": "232100500"
 },
 {
  "l": 1292,
  "sku": "232099400"
 },
 {
  "l": 1294,
  "sku": "232101700"
 },
 {
  "l": 1295,
  "sku": "232102400"
 },
 {
  "l": 1296,
  "sku": "232102300"
 },
 {
  "l": 1301,
  "sku": "232103100"
 },
 {
  "l": 1302,
  "sku": "232103400"
 },
 {
  "l": 1303,
  "sku": "232104500"
 },
 {
  "l": 1304,
  "sku": "232104200"
 },
 {
  "l": 1305,
  "sku": "232105100"
 },
 {
  "l": 1306,
  "sku": "232104600"
 },
 {
  "l": 1307,
  "sku": "232104700"
 },
 {
  "l": 1308,
  "sku": "232105800"
 },
 {
  "l": 1311,
  "sku": "232105700"
 },
 {
  "l": 1313,
  "sku": "232106500"
 },
 {
  "l": 1316,
  "sku": "232180100"
 },
 {
  "l": 1319,
  "sku": "232448400"
 },
 {
  "l": 1323,
  "sku": "232524200"
 },
 {
  "l": 1324,
  "sku": "232524100"
 },
 {
  "l": 1326,
  "sku": "232529500"
 },
 {
  "l": 1327,
  "sku": "233364200"
 },
 {
  "l": 1328,
  "sku": "233363900"
 },
 {
  "l": 1329,
  "sku": "233364000"
 },
 {
  "l": 1330,
  "sku": "233544500"
 },
 {
  "l": 1332,
  "sku": "233544600"
 },
 {
  "l": 1335,
  "sku": "234364700"
 },
 {
  "l": 1336,
  "sku": "234659600"
 },
 {
  "l": 1337,
  "sku": "234669700"
 },
 {
  "l": 1338,
  "sku": "234669800"
 },
 {
  "l": 1343,
  "sku": "234974300"
 },
 {
  "l": 1344,
  "sku": "234975400"
 },
 {
  "l": 1345,
  "sku": "234974800"
 },
 {
  "l": 1346,
  "sku": "234975000"
 },
 {
  "l": 1347,
  "sku": "234975100"
 },
 {
  "l": 1348,
  "sku": "234974700"
 },
 {
  "l": 1349,
  "sku": "234974500"
 },
 {
  "l": 1351,
  "sku": "234975500"
 },
 {
  "l": 1352,
  "sku": "234974900"
 },
 {
  "l": 1358,
  "sku": "234976700"
 },
 {
  "l": 1386,
  "sku": "235465200"
 },
 {
  "l": 1426,
  "sku": "236923500"
 },
 {
  "l": 1496,
  "sku": "238134700"
 },
 {
  "l": 1498,
  "sku": "238135200"
 },
 {
  "l": 1499,
  "sku": "238189500"
 },
 {
  "l": 1501,
  "sku": "238189100"
 },
 {
  "l": 1502,
  "sku": "238249000"
 },
 {
  "l": 1503,
  "sku": "238249100"
 },
 {
  "l": 1505,
  "sku": "238250000"
 },
 {
  "l": 1506,
  "sku": "238250800"
 },
 {
  "l": 1514,
  "sku": "238253000"
 },
 {
  "l": 1516,
  "sku": "238254800"
 },
 {
  "l": 1517,
  "sku": "238259800"
 }
];
var PRESERVADAS = [
 {
  "l": 1157,
  "sku": "225588700",
  "ag_antes": "Priscila",
  "diaria": "04.09"
 },
 {
  "l": 1158,
  "sku": "225588600",
  "ag_antes": "Priscila",
  "diaria": "04.09"
 },
 {
  "l": 1159,
  "sku": "226287000",
  "ag_antes": "Priscila",
  "diaria": "04.09"
 },
 {
  "l": 1160,
  "sku": "226287500",
  "ag_antes": "Priscila",
  "diaria": "04.09"
 },
 {
  "l": 1162,
  "sku": "226773100",
  "ag_antes": "Priscila",
  "diaria": "04.09"
 },
 {
  "l": 1164,
  "sku": "226911600",
  "ag_antes": "Priscila",
  "diaria": "04.09"
 },
 {
  "l": 1165,
  "sku": "227010700",
  "ag_antes": "Priscila",
  "diaria": "04.09"
 },
 {
  "l": 1166,
  "sku": "227010600",
  "ag_antes": "Priscila",
  "diaria": "04.09"
 },
 {
  "l": 1170,
  "sku": "227696900",
  "ag_antes": "Priscila",
  "diaria": "04.09"
 },
 {
  "l": 1171,
  "sku": "227696700",
  "ag_antes": "Priscila",
  "diaria": "04.09"
 },
 {
  "l": 1174,
  "sku": "228701800",
  "ag_antes": "Priscila",
  "diaria": "04.09"
 },
 {
  "l": 1175,
  "sku": "228702000",
  "ag_antes": "Priscila",
  "diaria": "04.09"
 },
 {
  "l": 1178,
  "sku": "230066300",
  "ag_antes": "Priscila",
  "diaria": "04.09"
 },
 {
  "l": 1179,
  "sku": "230924800",
  "ag_antes": "Priscila",
  "diaria": "04.09"
 },
 {
  "l": 1180,
  "sku": "230924900",
  "ag_antes": "Priscila",
  "diaria": "04.09"
 },
 {
  "l": 1183,
  "sku": "231159600",
  "ag_antes": "Priscila",
  "diaria": "04.09"
 },
 {
  "l": 1286,
  "sku": "232099500",
  "ag_antes": "Priscila",
  "diaria": "04.09"
 },
 {
  "l": 1287,
  "sku": "232100000",
  "ag_antes": "Priscila",
  "diaria": "04.09"
 },
 {
  "l": 1297,
  "sku": "232102600",
  "ag_antes": "Priscila",
  "diaria": "04.09"
 },
 {
  "l": 1298,
  "sku": "232102500",
  "ag_antes": "Priscila",
  "diaria": "04.09"
 },
 {
  "l": 1299,
  "sku": "232102700",
  "ag_antes": "Priscila",
  "diaria": "04.09"
 },
 {
  "l": 1300,
  "sku": "232102800",
  "ag_antes": "Priscila",
  "diaria": "04.09"
 },
 {
  "l": 1310,
  "sku": "232105600",
  "ag_antes": "Priscila",
  "diaria": "04.09"
 }
];

function limparAgDasNossasLinhas() {
  var sh = SpreadsheetApp.getActive().getSheetByName(ABA);
  if (!sh) throw new Error('Aba nao encontrada: ' + ABA);

  function normSku(v) {
    if (v === null || v === undefined) return '';
    var s = String(v).trim(); var n = Number(s);
    if (!isNaN(n) && s !== '') return String(Math.round(n));
    return s;
  }

  // confere os SKUs antes de mexer
  var div = [];
  for (var i = 0; i < LIMPAR.length; i++) {
    var a = normSku(sh.getRange(LIMPAR[i].l, 1).getValue());
    if (a !== normSku(LIMPAR[i].sku)) div.push('linha ' + LIMPAR[i].l + ': esperado ' + LIMPAR[i].sku + ', achado ' + a);
  }
  if (div.length) {
    Logger.log('ABORTADO - %s divergencia(s), nada alterado:', div.length);
    div.forEach(function (m) { Logger.log('  ' + m); });
    return;
  }

  var n = 0, jaVazias = 0, oQueTinha = {};
  for (var j = 0; j < LIMPAR.length; j++) {
    var cel = sh.getRange(LIMPAR[j].l, 33);        // AG
    var antes = cel.getValue();
    if (antes === '' || antes === null) { jaVazias++; continue; }
    oQueTinha[String(antes)] = (oQueTinha[String(antes)] || 0) + 1;
    cel.clearContent();
    n++;
  }

  Logger.log('AG limpas: %s | ja estavam vazias: %s | total analisado: %s', n, jaVazias, LIMPAR.length);
  Logger.log('O que havia nelas (deve ser o carimbo indevido):');
  for (var k in oQueTinha) Logger.log('   %sx  "%s"', oQueTinha[k], k);
  Logger.log('---');
  Logger.log('PRESERVADAS - %s linhas que ja tinham AG antes das nossas rodadas, NAO tocadas:', PRESERVADAS.length);
  PRESERVADAS.forEach(function (p) { Logger.log('   linha %s (%s) AG original: "%s"', p.l, p.sku, p.ag_antes); });
}
