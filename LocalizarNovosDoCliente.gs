/**
 * LOCALIZAR NOVOS CODIGOS DO CLIENTE - Outubro/2026
 *
 * Caminho inverso do MarcarSoNaOak.gs: aqui a pergunta e o que o CLIENTE
 * inseriu no Outubro dele e ainda NAO existe na nossa aba Outubro/2026.
 *
 * Como esses SKUs nao tem linha na OAK, nao ha o que pintar: o script
 * monta a aba "NOVOS DO CLIENTE" com a lista pronta para conferir e
 * copiar. Nao escreve nada na aba Outubro/2026.
 *
 * Onde colar: planilha OAK - Web_Video_
 *   Extensoes > Apps Script > cola tudo > salva > recarrega a planilha.
 *   Menu "Conferencia OAK" > "Localizar novos do cliente".
 *
 * Estado do cliente em 29/09/2026: 1212 linhas de Outubro (eram 778 em 22/09),
 * sendo IAC 893, Lu Oferta 249, Video 3D 68 e 2 linhas com Tipo = PRIORIDADE.
 */

var CONFIG = {
  // --- ONDE O SCRIPT RODA: planilha OAK (Web_Video_) ---
  ABA_OAK: 'Outubro/2026',
  COL_SKU_OAK: 1,          // A  Sku
  COL_TIPO_OAK: 13,        // M  Tipo

  // --- REFERENCIA: planilha do cliente (New Web IA) ---
  ID_CLIENTE: '1DDAWiNgDH9Zpo7fNKtojFWj4fRGvZTdtq2yB72XSwio',
  GID_CLIENTE: 0,          // aba New Web IA
  ABA_CLIENTE: '',         // preencha o nome da aba para ignorar o gid
  COL_SKU_CLIENTE: 1,      // A  SKU
  COL_PRODUTO_CLIENTE: 2,  // B  Produto
  COL_TIPO_CLIENTE: 3,     // C  Tipo
  COL_NOVOREP_CLIENTE: 5,  // E  Novo/Replicado
  COL_CATEGORIA_CLIENTE: 6,// F  Categoria
  COL_DATA_CLIENTE: 7,     // G  Data Roteiro
  COL_LINK_CLIENTE: 8,     // H  Link Roteiro
  COL_MES_CLIENTE: 11,     // K  Mes
  MES_ALVO: 'outubro',

  ABA_RELATORIO: 'NOVOS DO CLIENTE'
};

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Conferencia OAK')
    .addItem('Localizar novos do cliente (so lista)', 'localizarNovosDoCliente')
    .addToUi();
}

/* ------------------------------------------------------------------ */
/* NORMALIZACAO                                                        */
/* ------------------------------------------------------------------ */

function normalizaSku(v) {
  if (v === null || v === undefined) return '';
  var s = String(v).trim();
  if (s === '') return '';
  if (/^\d+(\.0+)?$/.test(s)) s = s.replace(/\.0+$/, '');
  if (/^\d+(\.\d+)?[eE]\+?\d+$/.test(s)) s = Number(s).toFixed(0);
  s = s.replace(/\D/g, '');
  return s.replace(/^0+/, '');    // 086041600 e 86041600 sao o mesmo SKU
}

/* ------------------------------------------------------------------ */
/* LEITURA                                                             */
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

/** SKUs que a nossa aba Outubro/2026 ja tem */
function skusDaOak_() {
  var ws = SpreadsheetApp.getActive().getSheetByName(CONFIG.ABA_OAK);
  if (!ws) throw new Error('Nao achei a aba "' + CONFIG.ABA_OAK + '" nesta planilha.');

  var dados = ws.getRange(1, 1, ws.getLastRow(), Math.max(CONFIG.COL_SKU_OAK, CONFIG.COL_TIPO_OAK)).getValues();
  var set = {}, n = 0;

  for (var i = 1; i < dados.length; i++) {
    var sku = normalizaSku(dados[i][CONFIG.COL_SKU_OAK - 1]);
    if (!/^\d{5,10}$/.test(sku)) continue;
    if (!set[sku]) { set[sku] = true; n++; }
  }
  if (!n) throw new Error('Nenhum SKU lido na coluna ' + CONFIG.COL_SKU_OAK + ' da aba "' + CONFIG.ABA_OAK + '".');
  return { set: set, unicos: n, linhas: dados.length - 1 };
}

/* ------------------------------------------------------------------ */
/* LOCALIZAR                                                           */
/* ------------------------------------------------------------------ */

function localizarNovosDoCliente() {
  var ss = SpreadsheetApp.getActive();
  var ui = SpreadsheetApp.getUi();

  var oak = skusDaOak_();
  var aba = abaDoCliente_();
  var dados = aba.getDataRange().getValues();
  var alvo = CONFIG.MES_ALVO.toLowerCase();

  var novos = [], vistos = {}, totalMes = 0;

  for (var l = 1; l < dados.length; l++) {
    if (String(dados[l][CONFIG.COL_MES_CLIENTE - 1]).trim().toLowerCase() !== alvo) continue;

    var sku = normalizaSku(dados[l][CONFIG.COL_SKU_CLIENTE - 1]);
    if (!/^\d{5,10}$/.test(sku)) continue;

    totalMes++;
    if (oak.set[sku] || vistos[sku]) continue;   // ja temos, ou ja listamos
    vistos[sku] = true;

    var data = dados[l][CONFIG.COL_DATA_CLIENTE - 1];
    novos.push([
      l + 1,                                                    // linha no cliente
      String(dados[l][CONFIG.COL_SKU_CLIENTE - 1]).trim(),      // SKU como esta la
      String(dados[l][CONFIG.COL_PRODUTO_CLIENTE - 1] || ''),
      String(dados[l][CONFIG.COL_TIPO_CLIENTE - 1] || ''),
      String(dados[l][CONFIG.COL_NOVOREP_CLIENTE - 1] || ''),
      String(dados[l][CONFIG.COL_CATEGORIA_CLIENTE - 1] || ''),
      data instanceof Date ? data : String(data || ''),
      String(dados[l][CONFIG.COL_LINK_CLIENTE - 1] || '')
    ]);
  }

  gravaRelatorio_(ss, novos, aba.getName(), totalMes, oak);

  ui.alert(
    'Novos codigos do cliente\n\n' +
    'Cliente (' + aba.getName() + ', ' + CONFIG.MES_ALVO + '): ' + totalMes + ' linhas\n' +
    'OAK (' + CONFIG.ABA_OAK + '): ' + oak.linhas + ' linhas, ' + oak.unicos + ' SKUs\n\n' +
    'AINDA NAO ESTAO NA OAK: ' + novos.length + ' SKUs\n\n' +
    'Lista na aba "' + CONFIG.ABA_RELATORIO + '".\n' +
    'Nada foi alterado na aba ' + CONFIG.ABA_OAK + '.'
  );
}

function gravaRelatorio_(ss, novos, abaCliente, totalMes, oak) {
  var ws = ss.getSheetByName(CONFIG.ABA_RELATORIO);
  if (!ws) ws = ss.insertSheet(CONFIG.ABA_RELATORIO);
  ws.clear();

  var porTipo = {};
  for (var i = 0; i < novos.length; i++) {
    var t = novos[i][3] || '(sem tipo)';
    porTipo[t] = (porTipo[t] || 0) + 1;
  }
  var resumoTipo = Object.keys(porTipo).map(function (k) { return k + ': ' + porTipo[k]; }).join('   ');

  var cab = [
    ['Rodado em', new Date(), '', '', '', '', '', ''],
    ['Cliente', abaCliente + ' (' + CONFIG.MES_ALVO + ')', 'linhas', totalMes, '', '', '', ''],
    ['OAK', CONFIG.ABA_OAK, 'linhas', oak.linhas, 'SKUs unicos', oak.unicos, '', ''],
    ['Faltam entrar na OAK', novos.length, resumoTipo, '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['Linha no cliente', 'SKU', 'Produto', 'Tipo', 'Novo/Replicado', 'Categoria', 'Data Roteiro', 'Link Roteiro']
  ];
  ws.getRange(1, 1, cab.length, 8).setValues(cab);
  ws.getRange(cab.length, 1, 1, 8).setFontWeight('bold');

  if (novos.length) {
    ws.getRange(cab.length + 1, 1, novos.length, 8).setValues(novos);
  }
  ws.setFrozenRows(cab.length);
  ws.autoResizeColumns(1, 8);
}
