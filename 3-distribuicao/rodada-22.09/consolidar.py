"""Consolida os retornos das diárias 08.09 a 21.09 num plano único.

Saída: plano-consolidado.csv — uma linha por (diária, SKU) com ajuste,
com AF proposta, destino (editor / áudio) e se já foi resolvido depois.
"""
import csv, re, os
from pathlib import Path

BASE = Path(__file__).resolve().parents[2] / '1-diarias'
OUT = Path(__file__).parent

# ordem cronológica: a diária mais nova vence
DIARIAS = [
    ('08.09', 'Kauê', None),  # vem do plano-08.09.csv
    ('10.09', 'Dany', 'diaria-10.09/2026-09-22_dany_re-diaria-10.09.txt'),
    ('10.09', 'Kauê', 'diaria-10.09/2026-09-22_kaue_re-diaria-10.09.txt'),
    ('11.09', 'Dany', 'diaria-11.09/2026-09-22_dany_re-diaria-11.09.txt'),
    ('14.09', 'Dany', 'diaria-14.09/2026-09-22_dany_re-diaria-14.09.txt'),
    ('15.09', 'Kauê', 'diaria-15.09/2026-09-22_kaue_re-diaria-15.09.txt'),
    ('16.09', 'Kauê', 'diaria-16.09/2026-09-22_kaue_re-diaria-16.09.txt'),
    ('17.09', 'Kauê', 'diaria-17.09/2026-09-22_kaue_re-diaria-17.09.txt'),
    ('18.09', 'Dany', 'diaria-18.09/2026-09-22_dany_re-diaria-18.09.txt'),
    ('21.09', 'Kauê', 'diaria-21.09/2026-09-22_kaue_re-diaria-21.09.txt'),
]

R = 'REINSERÇÃO CENAS IA'
RA = 'REINSERÇÃO CENAS IA/Alteração'
RAU = 'REINSERÇÃO CENAS IA/áudio'
A = 'Alteração'
AAU = 'Alteração/áudio'
AU = 'Alteração áudio'
NF = 'Alteração não feita'  # reenvio: a AF da rodada anterior continua

# classificação das diárias 10.09 a 21.09 (critério em memória regra-classificacao-af)
# (af, o que vai para o áudio/roteiro, nota)
CLASSE = {
    # 10.09 Dany
    ('10.09', '241125300'): (R, '', ''), ('10.09', '238653000'): (R, '', ''),
    ('10.09', '241180200'): (A, '', 'mostrar parte interna com as fotos do site'),
    ('10.09', '240881200'): (R, '', ''), ('10.09', '240693300'): (R, '', ''),
    ('10.09', '238521700'): (R, '', ''), ('10.09', '238772100'): (R, '', ''),
    ('10.09', '240685600'): (RA, '', ''), ('10.09', '230428100'): (R, '', ''),
    ('10.09', '238648900'): (A, '', 'régua de medidas'), ('10.09', '240099700'): (R, '', ''),
    ('10.09', '240351700'): (R, '', ''), ('10.09', '224915900'): (R, '', ''),
    ('10.09', '240082100'): (R, '', ''), ('10.09', '237260200'): (R, '', ''),
    ('10.09', '226185900'): (R, '', ''), ('10.09', '237956600'): (R, '', ''),
    ('10.09', '233891500'): (R, '', ''),
    ('10.09', '238424200'): (A, '', 'cortar o trecho do enchimento'),
    ('10.09', '240683200'): (R, 'VERIFICAR: "vídeo sem som" — conferir se o áudio existe na pasta ou se é só exportação', ''),
    ('10.09', '227346300'): (R, '', ''), ('10.09', '240378500'): (R, '', ''),
    ('10.09', '240170000'): (R, '', ''), ('10.09', '221137300'): (R, '', ''),
    ('10.09', '221420400'): (R, '', ''), ('10.09', '086021600'): (R, '', ''),
    ('10.09', '214592700'): (RA, '', ''),
    ('10.09', '224822200'): (A, '', 'régua de medidas'),
    ('10.09', '228705000'): (AU, 'locução diz "Bill Murray"; o Funko é da Wichita — corrigir roteiro e regravar', ''),
    ('10.09', '228879200'): (R, '', ''), ('10.09', '228886800'): (RA, '', 'cortar a cena violenta'),
    ('10.09', '232049000'): (R, '', ''), ('10.09', '232058800'): (R, '', ''),
    ('10.09', '235721300'): (A, '', 'cortar o trecho do puxador'),
    ('10.09', '236835900'): (R, '', ''), ('10.09', '236836200'): (R, '', ''),
    ('10.09', '236862500'): (A, '', 'régua de medidas'), ('10.09', '238413300'): (R, '', ''),
    ('10.09', '238413600'): (RA, '', ''), ('10.09', '238433500'): (R, '', ''),
    ('10.09', '238437200'): (R, '', ''),
    ('10.09', '238491400'): (A, '', 'mostrar parte interna com as fotos do site'),
    ('10.09', '234767300'): (R, '', ''),
    # 10.09 Kauê
    ('10.09', '241317300'): (R, '', ''),
    ('10.09', '240687300'): (R, '', 'cliente pede tratar como VÍDEO NOVO (imagens da página estão erradas)'),
    ('10.09', '241214000'): (R, '', ''), ('10.09', '240889500'): (R, '', ''),
    ('10.09', '238119400'): (AAU, 'locução da Lu com efeito metalizado ("dentro de uma lata") — regravar', 'retirar as estampas do final'),
    ('10.09', '238130500'): (A, '', 'usar as imagens do fornecedor com o bebê'),
    ('10.09', '238253900'): (R, '', ''), ('10.09', '238266900'): (R, '', ''),
    ('10.09', '238820700'): (AU, '"PFOA" pronunciado muito pausado — ajustar pronúncia e ritmo', ''),
    ('10.09', '240122000'): (R, '', ''), ('10.09', '240122300'): (R, '', ''),
    # 11.09 Dany
    ('11.09', '241107700'): (R, '', ''), ('11.09', '240813600'): (R, '', ''),
    ('11.09', '226499400'): (R, '', ''), ('11.09', '235720800'): (A, '', ''),
    ('11.09', '236836600'): (RA, '', ''), ('11.09', '236836900'): (R, '', ''),
    ('11.09', '236837000'): (A, '', 'linha preta na lateral — recortar/reenquadrar'),
    ('11.09', '237902600'): (R, '', ''), ('11.09', '238133700'): (RA, '', ''),
    ('11.09', '238131600'): (R, '', ''), ('11.09', '238829000'): (RA, '', ''),
    ('11.09', '238855900'): (A, '', ''), ('11.09', '238946100'): (A, '', ''),
    ('11.09', '238967500'): (A, '', ''), ('11.09', '238996900'): (A, '', ''),
    ('11.09', '238996500'): (A, '', ''), ('11.09', '240000500'): (RA, '', ''),
    ('11.09', '240132900'): (A, '', ''), ('11.09', '240133000'): (A, '', ''),
    ('11.09', '240133400'): (RA, '', ''),
    # 14.09 Dany
    ('14.09', '241125300'): (R, '', ''), ('14.09', '241222000'): (R, '', ''),
    ('14.09', '241424500'): (R, '', ''), ('14.09', '241324900'): (R, '', ''),
    ('14.09', '226773000'): (R, '', ''), ('14.09', '226911600'): (R, '', ''),
    ('14.09', '232056800'): (R, '', ''), ('14.09', '235690600'): (R, '', ''),
    # 15.09 Kauê
    ('15.09', '217689200'): (R, '', ''), ('15.09', '240254800'): (R, '', ''),
    ('15.09', '240196200'): (R, '', ''), ('15.09', '238945900'): (R, '', ''),
    # 16.09 Kauê
    ('16.09', '238198600'): (R, '', ''), ('16.09', '240891300'): (R, '', ''),
    ('16.09', '238825800'): (R, '', ''), ('16.09', '238984500'): (R, '', ''),
    ('16.09', '238659700'): (R, '', ''), ('16.09', '235581900'): (R, '', ''),
    ('16.09', '225415400'): (R, '', ''), ('16.09', '227010700'): (RA, '', ''),
    ('16.09', '228701800'): (R, '', 'o editor devolveu com o mesmo erro, só deu zoom'),
    ('16.09', '231656900'): (R, '', ''), ('16.09', '232089500'): (R, '', ''),
    ('16.09', '232095100'): (R, '', ''),
    ('16.09', '238967000'): (AAU, 'VERIFICAR: "não fala" que vem com espelheira — se for locução, incluir no roteiro e regravar', 'régua da espelheira'),
    # 17.09 Kauê
    ('17.09', '241383600'): (R, '', ''), ('17.09', '240706500'): (R, '', ''),
    ('17.09', '240040000'): (R, '', ''), ('17.09', '240554500'): (R, '', ''),
    ('17.09', '238859400'): (R, '', 'lado da mesa lateral invertido — ver se espelhar a cena resolve'),
    ('17.09', '232059800'): (R, '', ''), ('17.09', '232067700'): (R, '', ''),
    # 18.09 Dany
    ('18.09', '240348300'): (R, '', ''), ('18.09', '238829400'): (R, '', ''),
    ('18.09', '240384800'): (R, '', ''), ('18.09', '241007600'): (R, '', ''),
    ('18.09', '240999100'): (A, '', 'estabilizar imagem'), ('18.09', '240736600'): (RA, '', ''),
    ('18.09', '238830900'): (A, '', ''), ('18.09', '240288000'): (R, '', ''),
    ('18.09', '124340800'): (A, '', ''), ('18.09', '088043800'): (R, '', ''),
    ('18.09', '155589700'): (R, '', ''), ('18.09', '237850200'): (R, '', ''),
    ('18.09', '234515100'): (RA, '', ''), ('18.09', '238435600'): (R, '', ''),
    ('18.09', '217696200'): (R, '', ''), ('18.09', '080905100'): (R, '', ''),
    ('18.09', '237360300'): (AU, 'pronúncia de "rack" errada', ''),
    ('18.09', '220544200'): (R, '', ''), ('18.09', '238414500'): (A, '', ''),
    ('18.09', '238432300'): (A, '', ''), ('18.09', '238436300'): (RA, '', ''),
    ('18.09', '238946000'): (RA, '', ''),
    ('18.09', '240062500'): (RAU, 'VERIFICAR: "menciona 04" lugares; o sofá é de 3 — se for na locução, corrigir roteiro e regravar', ''),
    ('18.09', '240062900'): (AAU, 'VERIFICAR: "menciona de 03" lugares; o sofá é de 4 — se for na locução, corrigir roteiro e regravar', ''),
    ('18.09', '240064700'): (AAU, 'pronúncia de "rack" errada', ''),
    ('18.09', '240064100'): (A, '', ''), ('18.09', '240084200'): (A, '', ''),
    ('18.09', '240087700'): (A, '', ''), ('18.09', '240100700'): (A, '', 'mostrar as posições (usar fotos do site se houver)'),
    ('18.09', '240144000'): (A, '', ''), ('18.09', '240143300'): (A, '', ''),
    ('18.09', '240154800'): (R, '', ''), ('18.09', '240169600'): (A, '', ''),
    # 21.09 Kauê
    ('21.09', '240891200'): (R, '', ''), ('21.09', '240991200'): (R, '', ''),
    ('21.09', '241278900'): (R, '', ''), ('21.09', '240014700'): (R, '', ''),
    ('21.09', '238838700'): (A, '', ''), ('21.09', '238955800'): (R, '', ''),
    ('21.09', '230560100'): (R, '', ''),
    ('21.09', '238432900'): (AU, 'VERIFICAR: "é informado" que tem 4 nichos; não tem — se for na locução, corrigir roteiro e regravar', 'se for lettering, corrigir na edição'),
    ('21.09', '240054300'): (R, '', ''),
}

# áudio já mapeado na 08.09
AUDIO_0809 = {
    '227421700': '"Diga" em vez de "Giga" (00:14)',
    '225511800': '"escuma" em vez de "espuma" (0:08)',
    '234976400': 'pronúncia de "Starflon" (00:06)',
}

SKU_RE = re.compile(r'^(\d{8,9})\t')
FILE_RE = re.compile(r'_(\d{9})_|IAC[ _](\d{9})')


def norm(s):
    return s.strip().lstrip('0')


def parse(path):
    """Devolve lista de dicts: sku, produto, status ('Aprovado' | 'Alteração' | NF), obs."""
    out, cur, section = [], None, None
    for raw in Path(path).read_text(encoding='utf-8').splitlines():
        line = raw.rstrip()
        low = line.lower()
        if low.startswith('aprovados'):
            section = 'aprov'; cur = None; continue
        if low.startswith('em alteração'):
            section = 'alt'; cur = None; continue
        if low.startswith('o restante'):
            section = 'reenvio'; cur = None; continue
        if section == 'reenvio':
            m = FILE_RE.search(line)
            if m and '\t' in line:
                sku = m.group(1) or m.group(2)
                st = line.split('\t')[-1].strip()
                out.append(dict(sku=sku, produto=line.split('\t')[0], status='Aprovado' if st == 'Aprovado' else NF, obs=st))
            continue
        m = SKU_RE.match(line)
        if m:
            parts = line.split('\t')
            sku, prod = parts[0], parts[1].strip()
            txt = parts[2].strip() if len(parts) > 2 else ''
            if section == 'aprov' or txt == 'Aprovado':
                cur = None
                out.append(dict(sku=sku, produto=prod, status='Aprovado', obs=''))
            else:
                cur = dict(sku=sku, produto=prod, status='Alteração', obs=txt)
                out.append(cur)
        elif cur is not None and line.strip():
            cur['obs'] += '\n' + line.strip()
    return out


rows = []
# 08.09 do plano existente
for r in csv.DictReader(open(BASE / 'diaria-08.09/plano-08.09.csv', encoding='utf-8-sig')):
    st = 'Aprovado' if r['af'] == 'Aprovado' else 'Alteração'
    rows.append(dict(diaria='08.09', cliente='Kauê', sku=r['sku'], produto=r['produto'], status=st,
                     af=r['af'], obs=r['obs_cliente'], audio=AUDIO_0809.get(r['sku'], ''), nota=''))

for d, cli, f in DIARIAS[1:]:
    for it in parse(BASE / f):
        af, audio, nota = '', '', ''
        if it['status'] == 'Alteração':
            key = (d, it['sku'])
            if key not in CLASSE:
                raise SystemExit(f'sem classificação: {key} {it["produto"]}')
            af, audio, nota = CLASSE[key]
        elif it['status'] == NF:
            af = NF
            audio = AUDIO_0809.get(it['sku'], '')
        else:
            af = 'Aprovado'
        rows.append(dict(diaria=d, cliente=cli, sku=it['sku'], produto=it['produto'], status=it['status'],
                         af=af, obs=it['obs'], audio=audio, nota=nota))

# reenvio "não feita": herda AF e observação da última rodada em que o SKU apareceu
for i, r in enumerate(rows):
    if r['status'] != NF:
        continue
    ant = [p for p in rows[:i] if norm(p['sku']) == norm(r['sku']) and p['status'] == 'Alteração']
    if ant:
        p = ant[-1]
        r['produto'] = p['produto']
        r['af'] = p['af']
        r['nota'] = f"ALTERAÇÃO NÃO FEITA — pedida na {p['diaria']} e devolvida igual"
        r['obs'] = p['obs']
        r['audio'] = r['audio'] or p['audio']
    else:
        r['nota'] = 'ALTERAÇÃO NÃO FEITA — pedido original é anterior a 08.09 (ver AJ na planilha)'
        r['produto'] = re.sub(r'^\[.\]IAC_\d+_|\.mp4$', '', r['produto'])

# conferência: toda classificação foi usada
usadas = {(r['diaria'], r['sku']) for r in rows}
sobra = [k for k in CLASSE if k not in usadas]
assert not sobra, sobra

# ordem cronológica; o último status por SKU decide se está em aberto
ordem = {d: i for i, (d, _, _) in enumerate(DIARIAS)}
ultimo = {}
for i, r in enumerate(rows):
    ultimo[norm(r['sku'])] = (r['diaria'], i)

for i, r in enumerate(rows):
    k = norm(r['sku'])
    d_last, i_last = ultimo[k]
    r['em_aberto'] = 'sim' if (r['status'] != 'Aprovado' and i == i_last) else ''
    if r['status'] != 'Aprovado' and i != i_last:
        later = rows[i_last]
        r['resolvido_por'] = f"{later['diaria']} {later['status']}"
    else:
        r['resolvido_por'] = ''
    r['vai_editor'] = 'sim' if r['em_aberto'] and r['af'] != AU else ''
    r['vai_audio'] = 'sim' if r['em_aberto'] and r['audio'] else ''

campos = ['diaria', 'cliente', 'sku', 'produto', 'status', 'af', 'em_aberto', 'resolvido_por',
          'vai_editor', 'vai_audio', 'audio', 'nota', 'obs']
with open(OUT / 'plano-consolidado.csv', 'w', encoding='utf-8-sig', newline='') as fh:
    w = csv.DictWriter(fh, fieldnames=campos)
    w.writeheader(); w.writerows(rows)

from collections import Counter
print('linhas', len(rows))
print('por diária/status', Counter((r['diaria'], r['cliente'], r['status']) for r in rows))
print('em aberto', sum(1 for r in rows if r['em_aberto']))
print('vai editor', sum(1 for r in rows if r['vai_editor']))
print('vai áudio', sum(1 for r in rows if r['vai_audio']))
print('AF em aberto', Counter(r['af'] for r in rows if r['em_aberto']))
print('\nresolvidos depois:')
for r in rows:
    if r['resolvido_por']:
        print(' ', r['diaria'], r['sku'], r['produto'][:45], '->', r['resolvido_por'])

# lista de SKUs em aberto para a consulta na planilha
with open(OUT / 'skus-em-aberto.txt', 'w', encoding='utf-8') as fh:
    fh.write(','.join(sorted({norm(r['sku']) for r in rows if r['em_aberto']})))
