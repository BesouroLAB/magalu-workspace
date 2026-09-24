/**
 * Lanca o retorno do Kaue (Magalu) da diaria 08.09 na aba Setembro/2026.
 *
 * Diferenca para os scripts anteriores: aqui o script NAO recebe numeros de
 * linha. Ele procura a linha viva pelo par SKU + AD (Data/Enviado/Cliente)
 * igual a 08/09/2026, porque a copia local da planilha esta parada em 31/08 e
 * nao tem as linhas desta diaria.
 *
 * COMO USAR
 *   1. Extensoes > Apps Script > cole este arquivo > Executar (lancarRetorno).
 *   2. Com SIMULAR = true ele NAO escreve nada, so mostra em Execucao > Registros
 *      o que faria. Confira o log e me mande.
 *   3. Se estiver tudo certo, troque para SIMULAR = false e rode de novo.
 *
 * REGRAS DE SEGURANCA
 *   - so escreve em AF (32) e AJ (36) que estiverem VAZIAS; celula preenchida e
 *     apenas registrada no log, nunca sobrescrita;
 *   - limpa AG (33) apenas nas linhas em que escreveu, para o Tiago identificar
 *     o que entrou nesta rodada;
 *   - SKU sem linha com AD = 08/09/2026, ou com mais de uma, e pulado e listado no
 *     log com todas as datas encontradas para aquele SKU.
 */

var ABA = 'Setembro/2026';
var DATA_DIARIA = '08/09/2026';
var SIMULAR = true;   // <<< troque para false so depois de conferir o log

var COL_SKU = 1, COL_AD = 30, COL_AF = 32, COL_AG = 33, COL_AJ = 36;

var ITENS = [
 {
  "sku": "235027100",
  "af": "REINSERÇÃO CENAS IA",
  "aj": "00:04 e 00:10 – As frigideiras aparecem completamente diferentes do modelo original. Foram alterados o formato, a quantidade de parafusos e o cabo, além de ter sido adicionada a logo da marca na parte interna, detalhe que não existe no produto.\n00:06 – Foi adicionada a logo da marca no fundo da panela, porém o produto original não possui esse detalhe."
 },
 {
  "sku": "225415400",
  "af": "REINSERÇÃO CENAS IA/Alteração",
  "aj": "0:03 - Os pés estão diferentes\n0:09 - O sofá ta disponível nas cores Bege, Castanho e Vermelho. Nesse take ele tá cinza. Aparece o rosto de crianças geradas por IA.\n0:13 - Pés diferentes.\nFaltou régua de medidas."
 },
 {
  "sku": "225415700",
  "af": "REINSERÇÃO CENAS IA/Alteração",
  "aj": "Faltou régua de medidas.\nEsse vídeo tem um replicado em outra cor, essa cor não é mostrada.\nO vídeo ficou cansativo, porque o sofá fica mudando de lado o tempo todo. Faltou simulação de uso."
 },
 {
  "sku": "225511800",
  "af": "Alteração/áudio",
  "aj": "0:08 - Parece que fala \"escuma\" no lugar de \"espuma\"\nFaltou régua de medidas"
 },
 {
  "sku": "225512500",
  "af": "Alteração",
  "aj": "Faltou régua de medidas"
 },
 {
  "sku": "226298200",
  "af": "REINSERÇÃO CENAS IA",
  "aj": "0:04 - O detalhe do cabo tá diferente na frigideira da direita.\n0:16 - O detalhe do cabo tá diferente"
 },
 {
  "sku": "226773000",
  "af": "REINSERÇÃO CENAS IA",
  "aj": "0:03 - Aparecem duas bolsas e duas cartelas de colantes. No kit vem 1 de cada.\n0:05 - Joelheira diferente\n0:07 - Joelheira e cotoveleira diferentes\n0:16 - Joelheira diferente"
 },
 {
  "sku": "227421700",
  "af": "REINSERÇÃO CENAS IA/áudio",
  "aj": "00:14 – Na locução, em vez de falar “Giga”, a pronúncia está como “Diga”.\n00:18 – Foram adicionadas informações na parte inferior de cada câmera, porém esse detalhe não existe no produto original."
 },
 {
  "sku": "231615000",
  "af": "REINSERÇÃO CENAS IA",
  "aj": "0:08 - Embalagem diferente."
 },
 {
  "sku": "231654400",
  "af": "Alteração",
  "aj": "0:03 - Vídeo começa com embalagem"
 },
 {
  "sku": "230255300",
  "af": "REINSERÇÃO CENAS IA",
  "aj": "0:09 - Parece que tem brilho no boneco. No original é mais opaco.\n0:16 - Tem uma linha na sobrancelha. No original não tem."
 },
 {
  "sku": "231654900",
  "af": "REINSERÇÃO CENAS IA",
  "aj": "0:11- O boneco mexe, mas o funko é estático"
 },
 {
  "sku": "231656900",
  "af": "Alteração",
  "aj": "0:03 - começa o vídeo com produto na embalagem"
 },
 {
  "sku": "232049700",
  "af": "REINSERÇÃO CENAS IA",
  "aj": "0:04 - Aparecem 11 peças, mas o kit vem 12.\n0:08 - Nesse trecho tá dando zoom no logo de ponta cabeça.\n0:10 - IA alucinou o logo"
 },
 {
  "sku": "232049500",
  "af": "Alteração",
  "aj": "0:03 - Vídeo começa com embalagem em pé."
 },
 {
  "sku": "232057100",
  "af": "REINSERÇÃO CENAS IA",
  "aj": "0:04 - Detalhe no cabo em inox diferente.\n0:09 - objeto se move sozinho.\n0:12 - objeto se move sozinho.\n0:17 - Detalhe no cabo em inox diferente."
 },
 {
  "sku": "232067900",
  "af": "REINSERÇÃO CENAS IA/Alteração",
  "aj": "0:04 - A cena fica travada\n0:16 - Mesma cena aparece duas vezes seguidas\n0:18 - Embalagem em pé"
 },
 {
  "sku": "232086200",
  "af": "REINSERÇÃO CENAS IA",
  "aj": "00:10 – Os furos do pegador aparecem diferentes do modelo original."
 },
 {
  "sku": "232089000",
  "af": "REINSERÇÃO CENAS IA",
  "aj": "0:09 - O cabo tá totalmente em inox, mas a pontinha é de plástico branco.\n0:10 - O cabo tá totalmente em inox, mas a pontinha é de plástico branco."
 },
 {
  "sku": "232089500",
  "af": "REINSERÇÃO CENAS IA",
  "aj": "0:13 - A concha é de molho mas tá ambientada servindo sopa. São modelos diferentes, pode gerar confusão e sac."
 },
 {
  "sku": "232091700",
  "af": "REINSERÇÃO CENAS IA",
  "aj": "0:15 - A IA mudou a cor do cabo, tá preto."
 },
 {
  "sku": "232095200",
  "af": "REINSERÇÃO CENAS IA",
  "aj": "A colher é de chá. No vídeo TODO aparece sendo usada pra comer sopa"
 },
 {
  "sku": "232095100",
  "af": "REINSERÇÃO CENAS IA",
  "aj": "A colher é de chá. No vídeo TODO aparece sendo usada pra comer sopa"
 },
 {
  "sku": "232096900",
  "af": "Alteração",
  "aj": "0:13 - Deu uma piscada no vídeo."
 },
 {
  "sku": "234970100",
  "af": "REINSERÇÃO CENAS IA",
  "aj": "00:05 – A espátula aparece diferente do modelo original."
 },
 {
  "sku": "234969900",
  "af": "REINSERÇÃO CENAS IA",
  "aj": "00:18 – A espátula aparece diferente do modelo original."
 },
 {
  "sku": "234976400",
  "af": "Alteração áudio",
  "aj": "00:06 – A pronúncia de “Starflon” na locução está incorreta."
 },
 {
  "sku": "234980600",
  "af": "REINSERÇÃO CENAS IA",
  "aj": "00:08 – A frigideira aparece deformada e a IA adicionou a logo da marca no cabo, porém esse detalhe não existe no produto original."
 },
 {
  "sku": "238309000",
  "af": "REINSERÇÃO CENAS IA",
  "aj": "00:10 – A panela aparenta ser maior do que seu tamanho real e o cabo aparece diferente, com os parafusos de fixação ausentes."
 },
 {
  "sku": "238308500",
  "af": "REINSERÇÃO CENAS IA",
  "aj": "00:19 – Na cena em que é apresentada a informação sobre o material do cabo, a IA alterou suas características, deixando-o diferente do modelo original."
 },
 {
  "sku": "238438900",
  "af": "REINSERÇÃO CENAS IA",
  "aj": "00:07 – Na cena, parece que o tampo superior do rack possui uma profundidade menor do que a prateleira inferior, deixando a estrutura diferente do produto original."
 },
 {
  "sku": "240714100",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "241206500",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "240890200",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "240890000",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "240707400",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "240137900",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "230026500",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "240686500",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "227639900",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "237871400",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "238380900",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "226546000",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "230949000",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "224821900",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "227008900",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "231155500",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "231155700",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "231614900",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "232057200",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "232059400",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "232086700",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "232087500",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "232088700",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "232089100",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "232097500",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "232099100",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "232098600",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "232529400",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "234346600",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "234362200",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "234707100",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "234975700",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "234976300",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "234977300",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "234977800",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "234977700",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "234981800",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "234983700",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "234983400",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "238191300",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "238250900",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "238251900",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "238254900",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "238309400",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "238309100",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "238309900",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "238332800",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "238438100",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "238437500",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "238438000",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "238549300",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "238547700",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "238550400",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "238550500",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "238553100",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "238550700",
  "af": "Aprovado",
  "aj": ""
 },
 {
  "sku": "238599400",
  "af": "Aprovado",
  "aj": ""
 }
];

function normSku(v) {
  if (v === null || v === undefined) return '';
  var s = String(v).trim(); var n = Number(s);
  if (!isNaN(n) && s !== '') return String(Math.round(n));
  return s;
}

function normData(v) {
  if (v === null || v === undefined || v === '') return '';
  if (Object.prototype.toString.call(v) === '[object Date]') {
    return Utilities.formatDate(v, Session.getScriptTimeZone(), 'dd/MM/yyyy');
  }
  var s = String(v).trim();
  var m = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/);
  if (m) {
    var a = m[3].length === 2 ? '20' + m[3] : m[3];
    return ('0' + m[1]).slice(-2) + '/' + ('0' + m[2]).slice(-2) + '/' + a;
  }
  return s;
}

function lancarRetorno() {
  var sh = SpreadsheetApp.getActive().getSheetByName(ABA);
  if (!sh) throw new Error('Aba nao encontrada: ' + ABA);

  var ult = sh.getLastRow();
  var skus = sh.getRange(1, COL_SKU, ult, 1).getValues();
  var ads  = sh.getRange(1, COL_AD,  ult, 1).getValues();

  var porSku = {};
  for (var r = 0; r < ult; r++) {
    var k = normSku(skus[r][0]);
    if (!k) continue;
    if (!porSku[k]) porSku[k] = [];
    porSku[k].push({ linha: r + 1, data: normData(ads[r][0]) });
  }

  var ok = 0, pulados = [], semLinha = [], ambiguos = [], jaPreenchidos = [], ocupadas = [];

  for (var i = 0; i < ITENS.length; i++) {
    var it = ITENS[i];
    var todas = porSku[normSku(it.sku)] || [];
    var cand = todas.filter(function (x) { return x.data === DATA_DIARIA; });

    if (cand.length === 0) {
      var datas = todas.map(function (x) { return (x.data || 'vazia') + '@L' + x.linha; });
      semLinha.push(it.sku + ' -> nenhuma linha com AD=' + DATA_DIARIA +
                    ' (tem ' + todas.length + ': ' + datas.join(', ') + ')');
      continue;
    }
    if (cand.length > 1) {
      ambiguos.push(it.sku + ' -> ' + cand.length + ' linhas com AD=' + DATA_DIARIA +
                    ': ' + cand.map(function (x) { return x.linha; }).join(', '));
      continue;
    }

    var L = cand[0].linha;
    var afAtual = String(sh.getRange(L, COL_AF).getValue()).trim();
    var ajAtual = String(sh.getRange(L, COL_AJ).getValue()).trim();
    var agAtual = String(sh.getRange(L, COL_AG).getValue()).trim();

    if (afAtual !== '' || ajAtual !== '' || agAtual !== '') {
      ocupadas.push('L' + L + ' ' + it.sku +
        ' | AF: ' + (afAtual === '' ? '(vazia)' : '"' + afAtual + '"') +
        ' | AJ: ' + (ajAtual === '' ? '(vazia)' : '"' + ajAtual.slice(0, 60) +
                     (ajAtual.length > 60 ? '...' : '') + '"') +
        ' | AG: ' + (agAtual === '' ? '(vazia)' : '"' + agAtual + '"'));
    }

    if (afAtual !== '') {
      jaPreenchidos.push('L' + L + ' ' + it.sku + ' AF ja tem "' + afAtual +
                         '" (queria "' + it.af + '") - nao mexi');
      continue;
    }

    if (SIMULAR) {
      Logger.log('[simulacao] L%s %s  AF<-"%s"%s  AG<-vazio', L, it.sku, it.af,
                 (it.aj ? '  AJ<-' + it.aj.length + ' car.' : ''));
    } else {
      sh.getRange(L, COL_AF).setValue(it.af);
      if (it.aj && ajAtual === '') sh.getRange(L, COL_AJ).setValue(it.aj);
      else if (it.aj) pulados.push('L' + L + ' ' + it.sku + ' AJ ja preenchida, nao mexi');
      sh.getRange(L, COL_AG).clearContent();
    }
    ok++;
  }

  Logger.log('===== %s | aba %s | diaria %s =====',
             (SIMULAR ? 'SIMULACAO (nada foi escrito)' : 'GRAVACAO'), ABA, DATA_DIARIA);
  Logger.log('itens no retorno do cliente : %s', ITENS.length);
  Logger.log('linhas %s                   : %s', (SIMULAR ? 'que seriam escritas' : 'escritas'), ok);
  Logger.log('');
  Logger.log('--- linhas que JA TEM algo em AF, AJ ou AG: %s de %s ---', ocupadas.length, ITENS.length);
  ocupadas.forEach(function (m) { Logger.log('   ' + m); });
  if (!ocupadas.length) Logger.log('   nenhuma: AF, AJ e AG estao vazias em todas as linhas encontradas.');
  Logger.log('');
  Logger.log('AF ja preenchida (pulei)    : %s', jaPreenchidos.length);
  jaPreenchidos.forEach(function (m) { Logger.log('   ' + m); });
  Logger.log('AJ ja preenchida (pulei)    : %s', pulados.length);
  pulados.forEach(function (m) { Logger.log('   ' + m); });
  Logger.log('sem linha na data (pulei)   : %s', semLinha.length);
  semLinha.forEach(function (m) { Logger.log('   ' + m); });
  Logger.log('SKU ambiguo (pulei)         : %s', ambiguos.length);
  ambiguos.forEach(function (m) { Logger.log('   ' + m); });
  if (SIMULAR) Logger.log('>>> Nada foi gravado. Troque SIMULAR para false para valer.');
}
