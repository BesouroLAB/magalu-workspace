/**
 * Lanca o retorno da Dany (Re: Diaria 03.09, recebido 08/09/2026) na aba Setembro/2026.
 *
 * ESCOPO (conforme combinado):
 *   - 29 linhas  -> escreve "Aprovado" na coluna AF
 *   - 44 linhas  -> escreve a observacao do cliente na coluna AJ (AF fica intacta)
 *
 * SEGURANCA:
 *   - Confere o SKU da coluna A de cada linha ANTES de escrever. Se algum nao bater,
 *     NADA e escrito e o script aborta listando as divergencias.
 *   - Nunca sobrescreve AF/AJ que ja tenham conteudo: essas linhas sao puladas e listadas.
 *
 * COMO USAR: Extensoes > Apps Script > cole isto > Executar (funcao lancarRetornoDany).
 * Veja o resultado em Execucao > Registros.
 */

var ABA = 'Setembro/2026';
var DADOS = [
 {
  "l": 325,
  "sku": "240843400",
  "af": null,
  "aj": "0:01 - IA alucinou o texto.\n0:08 - IA alucinou o texto."
 },
 {
  "l": 374,
  "sku": "241107500",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 379,
  "sku": "240805000",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 445,
  "sku": "237634400",
  "af": null,
  "aj": "0:01 - IA alucinou texto da embalagem\n0:07 - IA alucinou texto da embalagem"
 },
 {
  "l": 614,
  "sku": "240347500",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 616,
  "sku": "238160800",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 711,
  "sku": "237352900",
  "af": null,
  "aj": "0:03 - IA alucinou texto da embalagem\n0:07 - IA alucinou texto da embalagem\n0:09 - IA alucinou texto da embalagem"
 },
 {
  "l": 782,
  "sku": "241386000",
  "af": null,
  "aj": "O produto é sortimento, mas não menciona isso no vídeo."
 },
 {
  "l": 1198,
  "sku": "232049400",
  "af": null,
  "aj": "vídeo começa com embalagem em pé"
 },
 {
  "l": 1213,
  "sku": "232059300",
  "af": null,
  "aj": "começo do vídeo com embalagem.\n0:06 - Mesma cena aparece duas vezes seguidas, com zoom.\nO produto é uma espátula para pizza. Na maior parte do vídeo aparece ela ambientada ao lado de doces."
 },
 {
  "l": 1214,
  "sku": "232059100",
  "af": null,
  "aj": "0:03 - Começo do vídeo com produto na embalagem.\nO ideal é seguir a indicação do produto. Esse produto é indicado pra pizza. Foi ambientado na maior parte do vídeo com doces."
 },
 {
  "l": 1228,
  "sku": "232069100",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1229,
  "sku": "232070400",
  "af": null,
  "aj": "começo do vídeo com embalagem em pé.\n0:15 - faca flutuando\n0:16 - embalagem em pé.\nRoteiro diz que é indicado pra carnes, mas no vídeo só passa ela cortando maçã e tomate."
 },
 {
  "l": 1230,
  "sku": "232069900",
  "af": null,
  "aj": "vídeo começa com embalagem em pé\nNo áudio diz que ela é indicada pra carnes e churrasco, mas no vídeo só mostra ela cortando couve e tomate."
 },
 {
  "l": 1231,
  "sku": "232070700",
  "af": null,
  "aj": "0:03 - Vídeo começa com embalagem em pé.\n0:16 - embalagem em cima do tomate."
 },
 {
  "l": 1232,
  "sku": "232070800",
  "af": null,
  "aj": "0:05 - embalagem em pé\n0:12 - IA alucinou a cena."
 },
 {
  "l": 1233,
  "sku": "232085000",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1234,
  "sku": "232085100",
  "af": null,
  "aj": "0:02 - Pá para bolo ambientada ao lado de um salmão.\n0:09 - Pá flutuando.\n0:12 - Cabo tá todo em inox.\n0:13 - Cabo tá todo em inox.\n0:14 - Aparece rapidamente uma cena e some.\n0:15 - Cabo tá todo em inox."
 },
 {
  "l": 1235,
  "sku": "232085800",
  "af": null,
  "aj": "0:06 - Modelo completamente diferente.\n0:09 - Ponta do cabo diferente\n0:11 - Tá escrito Tramontina no cabo"
 },
 {
  "l": 1236,
  "sku": "232086000",
  "af": null,
  "aj": "0:17 - produto completamente diferente.\n0:18 - aqui aparecem outros produtos diferentes do produto anunciado."
 },
 {
  "l": 1238,
  "sku": "232086100",
  "af": null,
  "aj": "começo do vídeo com embalagem."
 },
 {
  "l": 1239,
  "sku": "232086900",
  "af": null,
  "aj": "Vídeo começa com produto na embalagem, em pé.\n0:10 - Produto em pé, sozinho\n0:13 - Produto em pé, sozinho\n0:14 - Produto em pé, sozinho\n0:15 - Produto em pé, sozinho"
 },
 {
  "l": 1242,
  "sku": "232087700",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1244,
  "sku": "232088900",
  "af": null,
  "aj": "0:03 - Vídeo começa com embalagem.\n0:14 - Embalagem pendura em cima do fogão.\n0:16 - Embalagem pendura em cima do fogão.\n0:17 - Mesma cena passa duas vezes seguidas."
 },
 {
  "l": 1247,
  "sku": "232089200",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1248,
  "sku": "232089600",
  "af": null,
  "aj": "0:04 - panela toda suja. A concha é para molho. Mas tá sendo usada para pegar sopa.\n0:06 - Parece que tá duplicado o áudio."
 },
 {
  "l": 1250,
  "sku": "232089900",
  "af": null,
  "aj": "0:03 - Vídeo começa com embalagem. IA alucinou o local onde tá pendura.\n0:07 - IA alucinou o local onde tá pendura."
 },
 {
  "l": 1251,
  "sku": "232089700",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1252,
  "sku": "232090300",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1253,
  "sku": "232090100",
  "af": null,
  "aj": "0:04 - ambientação desconexa."
 },
 {
  "l": 1254,
  "sku": "232090400",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1255,
  "sku": "232090500",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1256,
  "sku": "232090800",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1257,
  "sku": "232090700",
  "af": null,
  "aj": "0:02 - Vídeo começa com produto na embalagem.\n0:17 - Parece que a Lu fala: - fácil de limpar \"ta na\" mão ou na máquina."
 },
 {
  "l": 1260,
  "sku": "232095000",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1264,
  "sku": "232095400",
  "af": null,
  "aj": "0:07 - O jogo tem 3 colheres. Mas aparecem 8. Pode gerar confusão e sac.\n0:10 - A letra \"ô\" de \"anatômico\" tá minúsculo.\n0:11 - A letra \"ã\" de \"mão\" tá minúsculo."
 },
 {
  "l": 1266,
  "sku": "232095300",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1267,
  "sku": "232095900",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1268,
  "sku": "232095800",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1269,
  "sku": "232096100",
  "af": null,
  "aj": "0:17 - Apareceram 05 colheres, mas no kit vem 03. Pode gerar confusão e sac."
 },
 {
  "l": 1270,
  "sku": "232096300",
  "af": null,
  "aj": "Vídeo começa com produto dentro da embalagem, em pé. Além disso, são colheres de chá, mas pelo tamanho, parecem colheres de sopa.\n0:09 - São colheres de chá, mas pelo tamanho, parecem colheres de sopa.\n0:10 - É uma colher de chá, no vídeo está sendo usada para comer sopa.\n0:12 - Ambientação desconexa com a real utilidade do produto.\nVídeo todo feito para uma colher de sopa. Produto original é colher de chá."
 },
 {
  "l": 1271,
  "sku": "232096400",
  "af": null,
  "aj": "0:01 - É uma colher de chá, ela ta ambientada como se fosse de sobremesa.\n0:08 - A colher de chá, tá servindo sopa.\n0:09 - bugou a caixa azul de texto.\n0:12 - a colher é de chá!\n...\nRestante do vídeo TODO feito como se fosse colher de mesa!"
 },
 {
  "l": 1273,
  "sku": "232097400",
  "af": null,
  "aj": "0:02 - O kit vem com 12 colheres, mas aparecem mais. Pode gerar confusão e sac.\n0:11 - O kit vem com 12 colheres, mas aparecem mais.\n0:12 - Aparece um take rapidamente e logo some."
 },
 {
  "l": 1278,
  "sku": "232099300",
  "af": null,
  "aj": "0:18 - As colheres são de mesa e estão minúsculas"
 },
 {
  "l": 1280,
  "sku": "232098100",
  "af": null,
  "aj": "0:14 - Produto na embalagem, ambientado em cima da mesa. Bem maior do que o resto dos objetos"
 },
 {
  "l": 1281,
  "sku": "232099000",
  "af": null,
  "aj": "0:04 - Deu bug na transição, passa muito rápido.\n0:05 - A IA alucina a colher. Aparece primeiro com o cabo de um lado e depois vira pro outro.\n0:07 - Tem um corte no vídeo."
 },
 {
  "l": 1282,
  "sku": "232098500",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1283,
  "sku": "232099200",
  "af": null,
  "aj": "0:03 - Vídeo começa com embalagem em pé\n0:04 - As colheres são de mesa, mas foram ambientadas ao lado de café e biscoitos.\n0:09 - Em primeiro plano aparece uma xícara de café com uma colher de café. As colheres são de mesa.\n0:21 - Ambientação desconexa."
 },
 {
  "l": 1288,
  "sku": "232100600",
  "af": null,
  "aj": "0:02 - Colher de chá, mas foi ambientada com café.\n0:10 - Colher de chá, tão comendo doce.\n0:11 a 0:14 - Colher de chá para comer doce.\n0:18 - Colher de chá para comer doce."
 },
 {
  "l": 1289,
  "sku": "232100400",
  "af": null,
  "aj": "A colher é de chá, vídeo todo feito como se fosse colher de mesa!"
 },
 {
  "l": 1290,
  "sku": "232099900",
  "af": null,
  "aj": "Vídeo começa com embalagem em pé.\nColher de chá, vídeo feito como se fosse colher de sopa."
 },
 {
  "l": 1291,
  "sku": "232100500",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1292,
  "sku": "232099400",
  "af": null,
  "aj": "Colher de chá. Vídeo todo feito como se fosse colher de mesa."
 },
 {
  "l": 1294,
  "sku": "232101700",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1295,
  "sku": "232102400",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1296,
  "sku": "232102300",
  "af": null,
  "aj": "0:03 - o começo do cabo tá diferente"
 },
 {
  "l": 1301,
  "sku": "232103100",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1302,
  "sku": "232103400",
  "af": null,
  "aj": "0:03 - Vídeo começa com produto na embalagem."
 },
 {
  "l": 1303,
  "sku": "232104500",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1304,
  "sku": "232104200",
  "af": null,
  "aj": "0:07 - O vídeo tá tremendo.\n0:11 - Bugou o contorno azul da legenda.\n0:17 - Embalagem em pé."
 },
 {
  "l": 1305,
  "sku": "232105100",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1306,
  "sku": "232104600",
  "af": null,
  "aj": "0:12 - Embalagem em pé."
 },
 {
  "l": 1307,
  "sku": "232104700",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1308,
  "sku": "232105800",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1311,
  "sku": "232105700",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1313,
  "sku": "232106500",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1316,
  "sku": "232180100",
  "af": null,
  "aj": "0:03 até 0:12 - Modelo completamente diferente do original.\n0:12 - Na hora que fala \"fungos\" dá uma trepidação na voz.\n0:14 - colher diferente do original\n0:14 - Locução desconexa. Tá falando: \"e em silicone e polipropileno poder direto na lava-louças\""
 },
 {
  "l": 1319,
  "sku": "232448400",
  "af": null,
  "aj": "0:04 - Os detalhes no cano da roda da frente tão diferentes. O cano onde vai o banco tbm tá diferente.\n0:06 - Os detalhes no cano da roda da frente tão diferentes. O cano onde vai o banco tbm tá diferente.\n0:18 - paisagem estrangeira."
 },
 {
  "l": 1323,
  "sku": "232524200",
  "af": null,
  "aj": "Faltou régua de medidas."
 },
 {
  "l": 1324,
  "sku": "232524100",
  "af": null,
  "aj": "0:12 - Ela fala \"e\" duas vezes seguidas \"reflorestada e e ainda tem proteção\"\nFaltou régua de medidas."
 },
 {
  "l": 1336,
  "sku": "234659600",
  "af": null,
  "aj": "0:13 - A parte de dentro da geladeira tá diferente do original.\n0:15 - Geladeira tá mais larga do que realmente é.\n0:20 - Modelo de geladeira tá diferente."
 },
 {
  "l": 1358,
  "sku": "234976700",
  "af": "Aprovado",
  "aj": null
 },
 {
  "l": 1386,
  "sku": "235465200",
  "af": null,
  "aj": "0:05 - os detalhes das rodas tão diferentes\n0:10 - tá faltando o freio traseiro. A parte de trás dos patins tá diferente"
 }
];

function lancarRetornoDany() {
  var sh = SpreadsheetApp.getActive().getSheetByName(ABA);
  if (!sh) throw new Error('Aba nao encontrada: ' + ABA);

  function normSku(v) {
    if (v === null || v === undefined) return '';
    var s = String(v).trim();
    if (/^\d+(\.0+)?$/.test(s)) return String(Math.round(Number(s)));
    if (/^\d(\.\d+)?[eE]\+?\d+$/.test(s)) return String(Math.round(Number(s)));
    return s;
  }

  // ---------- 1. conferencia ----------
  var divergencias = [];
  for (var i = 0; i < DADOS.length; i++) {
    var d = DADOS[i];
    var atual = normSku(sh.getRange(d.l, 1).getValue());
    if (atual !== d.sku) divergencias.push('linha ' + d.l + ': esperado ' + d.sku + ', achado ' + atual);
  }
  if (divergencias.length) {
    Logger.log('ABORTADO - %s divergencia(s) de SKU, nada foi escrito:', divergencias.length);
    divergencias.forEach(function (m) { Logger.log('  ' + m); });
    return;
  }
  Logger.log('Conferencia OK: os %s SKUs batem com a coluna A.', DADOS.length);

  // ---------- 2. escrita ----------
  var escritas = 0, pulos = [];
  for (var j = 0; j < DADOS.length; j++) {
    var it = DADOS[j];
    var col = it.af !== null ? 32 : 36;          // AF = 32, AJ = 36
    var val = it.af !== null ? it.af : it.aj;
    var cel = sh.getRange(it.l, col);
    var antes = cel.getValue();
    if (antes !== '' && antes !== null) {
      pulos.push('linha ' + it.l + ' (' + it.sku + ') ' + (col === 32 ? 'AF' : 'AJ') +
                 ' ja tinha: ' + String(antes).slice(0, 60));
      continue;
    }
    cel.setValue(val);
    escritas++;
  }

  Logger.log('Escritas: %s de %s.', escritas, DADOS.length);
  if (pulos.length) {
    Logger.log('Puladas por ja terem conteudo (%s):', pulos.length);
    pulos.forEach(function (m) { Logger.log('  ' + m); });
  } else {
    Logger.log('Nenhuma linha pulada.');
  }
}
