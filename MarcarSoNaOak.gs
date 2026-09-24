/**
 * MARCAR O QUE SO EXISTE NA OAK - Outubro/2026
 *
 * REGRA: na planilha OAK (Web_Video_, aba Outubro/2026), pinta de vermelho
 * a linha inteira dos SKUs que NAO aparecem no Outubro da planilha do
 * cliente (New Web IA). Tudo que existe nas duas fica exatamente como esta.
 *
 * Onde colar: planilha OAK - Web_Video_
 *   Extensoes > Apps Script > cola tudo > salva > recarrega a planilha.
 *   Aparece o menu "Conferencia OAK" ao lado de Ajuda.
 *
 * So mexe em cor de fonte, e so nas linhas marcadas. Nao apaga,
 * nao ordena, nao escreve em celula nenhuma da aba Outubro/2026.
 *
 * Conferido em 22/09/2026 - 996 linhas na aba Outubro/2026:
 *   10 nao existem no Outubro do cliente (linhas 2, 3, 4, 17, 59, 61, 172, 215, 258, 271)
 *   986 tem SKU no cliente e ficam intocadas
 *   dessas, 17 estao la como "Lu Oferta" e aqui como "IAC" (ver MARCAR_TIPO_DIFERENTE)
 */

var CONFIG = {
  // --- ONDE O SCRIPT RODA: planilha OAK (Web_Video_) ---
  ABA_OAK: 'Outubro/2026',
  COL_SKU_OAK: 1,          // A  Sku
  COL_PRODUTO_OAK: 2,      // B  Produto
  COL_TIPO_OAK: 13,        // M  Tipo

  // --- REFERENCIA: planilha do cliente (New Web IA) ---
  ID_CLIENTE: '1DDAWiNgDH9Zpo7fNKtojFWj4fRGvZTdtq2yB72XSwio',
  GID_CLIENTE: 0,          // aba New Web IA
  ABA_CLIENTE: '',         // preencha o nome da aba para ignorar o gid
  COL_SKU_CLIENTE: 1,      // A  SKU
  COL_TIPO_CLIENTE: 3,     // C  Tipo
  COL_MES_CLIENTE: 11,     // K  Mes
  MES_ALVO: 'outubro',     // o cliente tem varios meses na mesma aba

  // --- regra ---
  MARCAR_TIPO_DIFERENTE: false,  // true = laranja quando o SKU esta la com outro Tipo

  // --- cores ---
  COR_FALTA: '#FF0000',          // vermelho: nao existe no cliente
  COR_TIPO_DIFERENTE: '#E69138', // laranja
  COR_PADRAO: '#000000',

  ABA_RELATORIO: 'SO NA OAK'
};

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Conferencia OAK')
    .addItem('1. Testar (nao altera nada)', 'testarConferencia')
    .addItem('2. Marcar o que nao esta no cliente', 'marcarSoNaOak')
    .addSeparator()
    .addItem('Desfazer: limpar as linhas marcadas', 'desmarcar')
    .addToUi();
}

/* ------------------------------------------------------------------ */
/* NORMALIZACAO                                                        */
/* ------------------------------------------------------------------ */

function normalizaSku(v) {
  if (v === null || v === undefined) return '';
  var s = String(v).trim();
  if (s === '') return '';
  if (/^\d+(\.0+)?$/.test(s)) s = s.replace(/\.0+$/, '');          // 241521200.0 -> 241521200
  if (/^\d+(\.\d+)?[eE]\+?\d+$/.test(s)) s = Number(s).toFixed(0); // 2.415212E+8
  s = s.replace(/\D/g, '');
  return s.replace(/^0+/, '');    // 086041600 e 86041600 sao o mesmo SKU
}

function normalizaTipo(v) {
  return String(v === null || v === undefined ? '' : v)
    .trim().toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[áàâã]/g, 'a').replace(/[éê]/g, 'e').replace(/í/g, 'i')
    .replace(/[óôõ]/g, 'o').replace(/ú/g, 'u').replace(/ç/g, 'c');
}

function colunaLetra_(n) {
  var s = '';
  while (n > 0) { var m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = (n - m - 1) / 26; }
  return s;
}

/* ------------------------------------------------------------------ */
/* LEITURA DA PLANILHA DO CLIENTE (so o mes alvo)                      */
/* ------------------------------------------------------------------ */

function abaDoCliente_() {
  var ss = SpreadsheetApp.openById(CONFIG.ID_CLIENTE);
  var abas = ss.getSheets();
  var i;

  if (CONFIG.ABA_CLIENTE) {
    var porNome = ss.getSheetByName(CONFIG.ABA_CLIENTE);
    if (porNome) return porNome;
  }
  for (i = 0; i < abas.length; i++) {
    if (abas[i].getSheetId() === CONFIG.GID_CLIENTE) return abas[i];
  }
  throw new Error('Nao achei a aba do cliente (gid ' + CONFIG.GID_CLIENTE + '). Abas: ' +
                  abas.map(function (s) { return s.getName(); }).join(' | '));
}

/** {skus:{}, pares:{}, tiposPorSku:{}, linhas:n, unicos:n, aba:nome} */
function dadosDoCliente_() {
  var aba = abaDoCliente_();
  var dados = aba.getDataRange().getValues();
  if (dados.length < 2) throw new Error('A aba "' + aba.getName() + '" do cliente esta vazia.');

  var alvo = CONFIG.MES_ALVO.toLowerCase();
  var skus = {}, pares = {}, tiposPorSku = {}, linhas = 0, unicos = 0;

  for (var l = 1; l < dados.length; l++) {
    if (String(dados[l][CONFIG.COL_MES_CLIENTE - 1]).trim().toLowerCase() !== alvo) continue;

    var sku = normalizaSku(dados[l][CONFIG.COL_SKU_CLIENTE - 1]);
    if (!/^\d{5,10}$/.test(sku)) continue;
    var tipo = dados[l][CONFIG.COL_TIPO_CLIENTE - 1];

    linhas++;
    if (!skus[sku]) { skus[sku] = true; unicos++; }
    pares[sku + '|' + normalizaTipo(tipo)] = true;

    var t = String(tipo || '').trim();
    if (!tiposPorSku[sku]) tiposPorSku[sku] = [];
    if (t && tiposPorSku[sku].indexOf(t) === -1) tiposPorSku[sku].push(t);
  }

  if (!linhas) {
    throw new Error('Nenhuma linha de ' + CONFIG.MES_ALVO + ' encontrada na aba "' + aba.getName() +
                    '" do cliente. Confira COL_MES_CLIENTE / MES_ALVO no CONFIG.');
  }
  return { skus: skus, pares: pares, tiposPorSku: tiposPorSku, linhas: linhas, unicos: unicos, aba: aba.getName() };
}

/* ------------------------------------------------------------------ */
/* LINHAS DA OAK                                                       */
/* ------------------------------------------------------------------ */

function linhasDaOak_() {
  var ws = SpreadsheetApp.getActive().getSheetByName(CONFIG.ABA_OAK);
  if (!ws) throw new Error('Nao achei a aba "' + CONFIG.ABA_OAK + '" nesta planilha.');

  var dados = ws.getRange(1, 1, ws.getLastRow(), ws.getLastColumn()).getValues();
  var out = [];

  for (var i = 1; i < dados.length; i++) {
    var sku = normalizaSku(dados[i][CONFIG.COL_SKU_OAK - 1]);
    var produto = String(dados[i][CONFIG.COL_PRODUTO_OAK - 1] || '');
    if (!sku && !produto.trim()) continue;          // linha vazia
    out.push({
      linha: i + 1,
      sku: sku,
      tipo: String(dados[i][CONFIG.COL_TIPO_OAK - 1] || '').trim(),
      produto: produto
    });
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* CLASSIFICACAO                                                       */
/* ------------------------------------------------------------------ */

function classifica_(linhas, cli) {
  var res = { falta: [], tipoDif: [], jaTem: 0 };

  for (var i = 0; i < linhas.length; i++) {
    var r = linhas[i];

    if (!/^\d{5,10}$/.test(r.sku)) { res.falta.push(r); continue; }   // sem SKU legivel

    if (!cli.skus[r.sku]) {
      res.falta.push(r);
    } else if (CONFIG.MARCAR_TIPO_DIFERENTE && !cli.pares[r.sku + '|' + normalizaTipo(r.tipo)]) {
      r.tipoCliente = (cli.tiposPorSku[r.sku] || []).join(' / ');
      res.tipoDif.push(r);
    } else {
      res.jaTem++;
    }
  }
  return res;
}

/* ------------------------------------------------------------------ */
/* PASSO 1 - TESTAR                                                    */
/* ------------------------------------------------------------------ */

function testarConferencia() {
  var cli = dadosDoCliente_();
  var linhas = linhasDaOak_();
  var res = classifica_(linhas, cli);

  var amostra = res.falta.slice(0, 12).map(function (r) {
    return '  L' + r.linha + '  ' + r.sku + '  ' + r.produto.substring(0, 32);
  }).join('\n');

  SpreadsheetApp.getUi().alert(
    'Teste - nada foi alterado\n\n' +
    'CLIENTE (' + cli.aba + ', mes = ' + CONFIG.MES_ALVO + ')\n' +
    '  linhas: ' + cli.linhas + '   SKUs unicos: ' + cli.unicos + '\n\n' +
    'OAK (' + CONFIG.ABA_OAK + ')\n' +
    '  linhas com conteudo: ' + linhas.length + '\n\n' +
    'SE RODAR O PASSO 2:\n' +
    '  vermelho - nao esta no cliente: ' + res.falta.length + '\n' +
    '  laranja - SKU la com outro tipo: ' + res.tipoDif.length + '\n' +
    '  intocadas: ' + res.jaTem + '\n\n' +
    (amostra ? 'Primeiras linhas a marcar:\n' + amostra : '')
  );
}

/* ------------------------------------------------------------------ */
/* PASSO 2 - MARCAR                                                    */
/* ------------------------------------------------------------------ */

function marcarSoNaOak() {
  var ss = SpreadsheetApp.getActive();
  var ws = ss.getSheetByName(CONFIG.ABA_OAK);
  var ui = SpreadsheetApp.getUi();

  var cli = dadosDoCliente_();
  var linhas = linhasDaOak_();
  var res = classifica_(linhas, cli);

  if (!res.falta.length && !res.tipoDif.length) {
    ui.alert('Nada a marcar: todas as ' + linhas.length + ' linhas existem no Outubro do cliente.');
    return;
  }

  var nCols = ws.getLastColumn();
  var relatorio = [], i, r;

  // pinta linha a linha - nao toca em nenhuma outra linha da aba
  for (i = 0; i < res.falta.length; i++) {
    r = res.falta[i];
    ws.getRange(r.linha, 1, 1, nCols).setFontColor(CONFIG.COR_FALTA);
    relatorio.push([r.linha, r.sku, r.produto, r.tipo,
                    /^\d{5,10}$/.test(r.sku) ? 'NAO ESTA NO CLIENTE' : 'LINHA SEM SKU', '']);
  }
  for (i = 0; i < res.tipoDif.length; i++) {
    r = res.tipoDif[i];
    ws.getRange(r.linha, 1, 1, nCols).setFontColor(CONFIG.COR_TIPO_DIFERENTE);
    relatorio.push([r.linha, r.sku, r.produto, r.tipo,
                    'CONFERIR - no cliente esta como', r.tipoCliente]);
  }

  relatorio.sort(function (a, b) { return a[0] - b[0]; });
  gravaRelatorio_(ss, relatorio, cli, linhas.length, res);

  ui.alert(
    'Pronto.\n\n' +
    'OAK (' + CONFIG.ABA_OAK + '): ' + linhas.length + ' linhas conferidas\n' +
    'Cliente (' + cli.aba + ', ' + CONFIG.MES_ALVO + '): ' + cli.linhas + ' linhas, ' + cli.unicos + ' SKUs\n\n' +
    'VERMELHO - nao esta no cliente: ' + res.falta.length + '\n' +
    'LARANJA  - tipo diferente: ' + res.tipoDif.length + '\n' +
    'Intocadas: ' + res.jaTem + '\n\n' +
    'Lista na aba "' + CONFIG.ABA_RELATORIO + '". Nada foi apagado.'
  );
}

function gravaRelatorio_(ss, linhas, cli, totalConferido, res) {
  var ws = ss.getSheetByName(CONFIG.ABA_RELATORIO);
  if (!ws) ws = ss.insertSheet(CONFIG.ABA_RELATORIO);
  ws.clear();

  var cab = [
    ['Conferencia rodada em', new Date(), '', '', '', ''],
    ['Cliente', cli.aba + ' (' + CONFIG.MES_ALVO + ')', 'linhas', cli.linhas, 'SKUs unicos', cli.unicos],
    ['OAK', CONFIG.ABA_OAK, 'linhas', totalConferido, 'intocadas', res.jaTem],
    ['Marcadas', res.falta.length + res.tipoDif.length, 'vermelho', res.falta.length, 'laranja', res.tipoDif.length],
    ['', '', '', '', '', ''],
    ['Linha na OAK', 'SKU', 'Produto', 'Tipo na OAK', 'Situacao', 'Tipo no cliente']
  ];
  ws.getRange(1, 1, cab.length, 6).setValues(cab);
  ws.getRange(cab.length, 1, 1, 6).setFontWeight('bold');

  if (linhas.length) {
    ws.getRange(cab.length + 1, 1, linhas.length, 6).setValues(linhas);
    for (var i = 0; i < linhas.length; i++) {
      var cor = linhas[i][4].indexOf('CONFERIR') === 0 ? CONFIG.COR_TIPO_DIFERENTE : CONFIG.COR_FALTA;
      ws.getRange(cab.length + 1 + i, 1, 1, 6).setFontColor(cor);
    }
  }
  ws.autoResizeColumns(1, 6);
}

/* ------------------------------------------------------------------ */
/* DESFAZER - so as linhas que o script marcou                         */
/* ------------------------------------------------------------------ */

function desmarcar() {
  var ss = SpreadsheetApp.getActive();
  var ui = SpreadsheetApp.getUi();
  var rel = ss.getSheetByName(CONFIG.ABA_RELATORIO);

  if (!rel || rel.getLastRow() < 7) {
    ui.alert('Nao achei a aba "' + CONFIG.ABA_RELATORIO + '" com linhas marcadas.\n' +
             'Sem ela nao da para saber o que reverter sem mexer no resto da planilha.');
    return;
  }

  var ws = ss.getSheetByName(CONFIG.ABA_OAK);
  var nCols = ws.getLastColumn();
  var alvos = rel.getRange(7, 1, rel.getLastRow() - 6, 1).getValues();
  var n = 0;

  for (var i = 0; i < alvos.length; i++) {
    var linha = Number(alvos[i][0]);
    if (!linha) continue;
    ws.getRange(linha, 1, 1, nCols).setFontColor(CONFIG.COR_PADRAO);
    n++;
  }
  ui.alert(n + ' linha(s) voltaram para preto.');
}
