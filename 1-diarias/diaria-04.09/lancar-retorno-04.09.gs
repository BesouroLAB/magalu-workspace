/**
 * Lanca o retorno da Dany da DIARIA 04.09 na aba Setembro/2026.
 *   - 46 aprovados        -> AF = "Aprovado"
 *   - 22 em alteracao     -> AF = classificacao + AJ = observacao do cliente
 *
 * SEGURANCA: confere o SKU da coluna A das 68 linhas antes de escrever; se algum
 *            divergir, aborta sem escrever nada. Nunca sobrescreve AF/AJ com conteudo.
 * USO: Extensoes > Apps Script > colar > Executar (lancarRetorno0409) > Execucao > Registros.
 *
 * ATENCAO linha 330 (SKU 240690600, Fralda Pampers): a coluna AD esta VAZIA nessa linha,
 * entao ela nao entrou pelo filtro de data - foi escolhida por ser a gemea "Lu Oferta"
 * com pipeline completo (a 1138 e a "IAC"). Vale preencher AD330 = 04/09/2026 depois.
 */

var ABA = 'Setembro/2026';
var DADOS = [
 {
  "l": 330,
  "sku": "240690600",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 608,
  "sku": "240350100",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 610,
  "sku": "240375700",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 618,
  "sku": "216465300",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 757,
  "sku": "241125100",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 771,
  "sku": "218817100",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 777,
  "sku": "238264200",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 784,
  "sku": "240374700",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 785,
  "sku": "043186100",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 786,
  "sku": "241257900",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 787,
  "sku": "240647500",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 790,
  "sku": "240066800",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 795,
  "sku": "204581600",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 804,
  "sku": "238490100",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 836,
  "sku": "238777800",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1157,
  "sku": "225588700",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1158,
  "sku": "225588600",
  "af": "REINSERÇÃO CENAS IA",
  "aj": "0:03 - A parte de dentro da frigideira é lisa, não tem estampa."
 },
 {
  "l": 1159,
  "sku": "226287000",
  "af": "REINSERÇÃO CENAS IA",
  "aj": "0:07 - Mesma cena usada duas vezes seguidas.\n0:09 - A original não tem furinho na tampa.\n0:14 - Mesma cena usada duas vezes seguidas."
 },
 {
  "l": 1160,
  "sku": "226287500",
  "af": "REINSERÇÃO CENAS IA",
  "aj": "0:03 - A panela original não tem furinho na tampa.\n0:07 - A panela original não tem furinho na tampa.\n0:13 - A panela original não tem furinho na tampa."
 },
 {
  "l": 1162,
  "sku": "226773100",
  "af": "REINSERÇÃO CENAS IA",
  "aj": "0:03 - Tá diferente do original.\n0:16 - Tá diferente do original.\n0:19 - Tá diferente do original."
 },
 {
  "l": 1164,
  "sku": "226911600",
  "af": "REINSERÇÃO CENAS IA",
  "aj": "0:02 - Tem um cabo saindo da alça do aspirador.\n0:06 - O reservatório do original é meio transparente, dá pra enxergar dentro. No vídeo não tá. Tem um cabo saindo da alça do aspirador.\n0:09 - Tem um cabo saindo da alça do aspirador."
 },
 {
  "l": 1165,
  "sku": "227010700",
  "af": "REINSERÇÃO CENAS IA",
  "aj": "Vídeo começou com produto dentro da embalagem.\n0:06 - cordão maior do que o produto original\nNão aparece o canudo do produto. Mas temos fotos disponíveis no site."
 },
 {
  "l": 1166,
  "sku": "227010600",
  "af": "REINSERÇÃO CENAS IA",
  "aj": "0:03 - O cordão do produto original é bem pequeno.\n0:18 - O cordão do produto original é bem pequeno."
 },
 {
  "l": 1170,
  "sku": "227696900",
  "af": "REINSERÇÃO CENAS IA",
  "aj": "0:09 - Produto diferente do original."
 },
 {
  "l": 1171,
  "sku": "227696700",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1174,
  "sku": "228701800",
  "af": "REINSERÇÃO CENAS IA",
  "aj": "0:06 - A boneca original não tem patins. E não está nessa posição."
 },
 {
  "l": 1175,
  "sku": "228702000",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1178,
  "sku": "230066300",
  "af": "REINSERÇÃO CENAS IA",
  "aj": "0:16 - Parece que deu bug na hora da transição.\nEm nenhum momento mostrou usabilidade do produto."
 },
 {
  "l": 1179,
  "sku": "230924800",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1180,
  "sku": "230924900",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1183,
  "sku": "231159600",
  "af": "REINSERÇÃO CENAS IA",
  "aj": "0:04 - As rodas tão diferentes.\n0:15 - Tá aparecendo o rosto da criança. Precisa cortar um pouco a imagem.\nEm 0:15 - Fala que o patins é indicado pra superfícies planas, ideal pra crianças que tão aprendendo a andar. Mas o vídeo começa com os patins ambientados na praia. Ideal colocar algum chão liso."
 },
 {
  "l": 1286,
  "sku": "232099500",
  "af": "REINSERÇÃO CENAS IA",
  "aj": "Colher de chá ambientada como se fosse de sobremesa no vídeo todo."
 },
 {
  "l": 1287,
  "sku": "232100000",
  "af": "REINSERÇÃO CENAS IA",
  "aj": "0:03 - Colher de chá ambientada como de sobremesa.\n0:12 - Colher de chá ambientada como de sobremesa."
 },
 {
  "l": 1297,
  "sku": "232102600",
  "af": "REINSERÇÃO CENAS IA",
  "aj": "0:16 - Garfo bem maior do que nas outras cenas. Parece que foi esticado."
 },
 {
  "l": 1298,
  "sku": "232102500",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1299,
  "sku": "232102700",
  "af": "REINSERÇÃO CENAS IA",
  "aj": "Em nenhum momento do vídeo aparece o Garfo por completo. Só aparece parte dele.\nO vídeo é do garfo, mas a única animação que tem é na faca."
 },
 {
  "l": 1300,
  "sku": "232102800",
  "af": "REINSERÇÃO CENAS IA edição",
  "aj": "0:04 - a embalagem tá em pé sozinha"
 },
 {
  "l": 1310,
  "sku": "232105600",
  "af": "REINSERÇÃO CENAS IA",
  "aj": "0:03 - Aparecem 10 garfos, mas o kit é de 12."
 },
 {
  "l": 1326,
  "sku": "232529500",
  "af": "REINSERÇÃO CENAS IA",
  "aj": "Esse código é de colchão, mas veio vídeo de jogo de panelas."
 },
 {
  "l": 1327,
  "sku": "233364200",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1328,
  "sku": "233363900",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1329,
  "sku": "233364000",
  "af": "REINSERÇÃO CENAS IA",
  "aj": "0:06 - Aparenta ser bem maior do que realmente é. Ela tem 30cm d diâmetro.\n0:17 - A IA alucinou a cena."
 },
 {
  "l": 1330,
  "sku": "233544500",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1332,
  "sku": "233544600",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1335,
  "sku": "234364700",
  "af": "REINSERÇÃO CENAS IA edição",
  "aj": "Faltou régua de medidas.\n0:14 - Não temos imagens desse ângulo do produto para conseguir conferir se os detalhes tão certos."
 },
 {
  "l": 1337,
  "sku": "234669700",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1338,
  "sku": "234669800",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1343,
  "sku": "234974300",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1344,
  "sku": "234975400",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1345,
  "sku": "234974800",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1346,
  "sku": "234975000",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1347,
  "sku": "234975100",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1348,
  "sku": "234974700",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1349,
  "sku": "234974500",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1351,
  "sku": "234975500",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1352,
  "sku": "234974900",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1426,
  "sku": "236923500",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1496,
  "sku": "238134700",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1498,
  "sku": "238135200",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1499,
  "sku": "238189500",
  "af": "REINSERÇÃO CENAS IA",
  "aj": "00:06 – O apoio para as pernas aparece aberto até uma altura muito maior do que a apresentada nas imagens enviadas pelo fornecedor. Como não é possível confirmar se o produto realmente possui essa amplitude de ajuste, solicito manter o apoio no mesmo nível apresentado nas imagens do fornecedor, evitando representar uma funcionalidade não confirmada.\n00:10 – Na cena, a parte inferior da poltrona aparece com as madeiras expostas, porém, pelas imagens enviadas pelo fornecedor, esse detalhe não existe no produto original."
 },
 {
  "l": 1501,
  "sku": "238189100",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1502,
  "sku": "238249000",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1503,
  "sku": "238249100",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1505,
  "sku": "238250000",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1506,
  "sku": "238250800",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1514,
  "sku": "238253000",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1516,
  "sku": "238254800",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1517,
  "sku": "238259800",
  "af": "REINSERÇÃO CENAS IA",
  "aj": "Durante todo o vídeo – O produto aparece muito maior do que seu tamanho real, deixando a proporção apresentada diferente do produto original."
 }
];

function lancarRetorno0409() {
  var sh = SpreadsheetApp.getActive().getSheetByName(ABA);
  if (!sh) throw new Error('Aba nao encontrada: ' + ABA);

  function normSku(v) {
    if (v === null || v === undefined) return '';
    var s = String(v).trim();
    var n = Number(s);
    if (!isNaN(n) && s !== '') return String(Math.round(n));
    return s;
  }

  var div = [];
  for (var i = 0; i < DADOS.length; i++) {
    var atual = normSku(sh.getRange(DADOS[i].l, 1).getValue());
    var esp = normSku(DADOS[i].sku);
    if (atual !== esp) div.push('linha ' + DADOS[i].l + ': esperado ' + esp + ', achado ' + atual);
  }
  if (div.length) {
    Logger.log('ABORTADO - %s divergencia(s), nada escrito:', div.length);
    div.forEach(function (m) { Logger.log('  ' + m); });
    return;
  }
  Logger.log('Conferencia OK: %s SKUs batem.', DADOS.length);

  var nAf = 0, nAj = 0, pulos = [];
  for (var j = 0; j < DADOS.length; j++) {
    var it = DADOS[j];
    var cAf = sh.getRange(it.l, 32);                       // AF
    if (cAf.getValue() === '' || cAf.getValue() === null) { cAf.setValue(it.af); nAf++; }
    else pulos.push('linha ' + it.l + ' AF ja tinha: ' + String(cAf.getValue()).slice(0, 50));

    if (it.aj !== null) {
      var cAj = sh.getRange(it.l, 36);                     // AJ
      if (cAj.getValue() === '' || cAj.getValue() === null) { cAj.setValue(it.aj); nAj++; }
      else pulos.push('linha ' + it.l + ' AJ ja tinha: ' + String(cAj.getValue()).slice(0, 50));
    }
  }
  Logger.log('AF escritas: %s | AJ escritas: %s', nAf, nAj);
  if (pulos.length) { Logger.log('Puladas (%s):', pulos.length); pulos.forEach(function (m) { Logger.log('  ' + m); }); }
}
