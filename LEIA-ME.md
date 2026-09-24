# magalu-work — como a pasta está organizada

Cobertura das férias da Lenny no processo de aprovação de vídeos Magalu.
Reorganizado em 14/09/2026. As pastas seguem a ordem do fluxo de trabalho.

```
0-planilha-mestre/     cópia local da Web_Vídeo (leitura/diagnóstico)
1-diarias/             uma pasta por diária: retorno do cliente + plano + script
2-demandas-andrea/     pedidos que chegam por fora da diária
3-distribuicao/        as planilhas que saem para a equipe
4-audios/              áudios regravados recebidos do Rampim
5-scripts-planilha/    Apps Scripts que valem para mais de uma diária
6-roteiros-drika_*/    roteiros .docx separados para a Drika gravar
7-roteiros-rampim_*/   roteiros .docx separados para o Rampim gravar
_apoio/                índices, backups e rascunhos
```

---

## 0-planilha-mestre

`Web_Vídeo.xlsx` e `Web_Vídeo.BACKUP.xlsx` — **cópia baixada em 08/09 09:55**.
Está parada: a última data em AD é 31/08, então não tem as linhas de 03.09, 04.09
nem 08.09. Serve para diagnóstico e para conferir estrutura, **não** para saber o
estado atual. O estado atual está sempre no Google Sheets.

> ⚠️ Nunca abrir com `openpyxl.save()`. O arquivo tem 68MB de mídia embutida
> (GIF/PNG em `xl/media/`) que a biblioteca descarta ao salvar. Para escrever,
> reescrever o XML da aba dentro do zip e copiar as demais entradas.

## 1-diarias

Uma pasta por diária, nomeada pela data da diária (não pela data do arquivo — os
dois não batem, e era justamente isso que confundia).

| Pasta | Retorno de | Itens |
|---|---|---|
| `diaria-03.09` | Dany | 29 aprovados + 44 em alteração |
| `diaria-04.09` | Dany | 46 aprovados + 22 em alteração |
| `diaria-08.09` | Kauê | 57 aprovados + 31 em alteração |

Cada uma tem o mesmo trio: o **retorno do cliente** como veio, o **plano**
(`plano-*.csv`, com SKU, AF, destino e motivo) e o **Apps Script** que lança na
planilha. O script da 08.09 está em modo `SIMULAR = true` e ainda não rodou.

## 2-demandas-andrea

Pedidos da Andrea que não vêm pela diária (WhatsApp, mensagem avulsa).
`2026-09-11_andrea_demandas.md` é o histórico; as duas planilhas são a que vai
para o Rampim e a visão geral dos 6 códigos.

## 3-distribuicao

O que sai para as pessoas. A numeração indica o destino:

- `1_` → Priscila (reinserção de cenas IA)
- `2_` → editores (Diogo, Bidoia, Lucas)
- `3_` e `4_` → controle do Tiago para envio ao Rampim

## 4-audios

`corrigidos-rampim_10.09/` — os 8 mp3 que o Rampim devolveu e que **já foram
copiados** para as pastas `Roteiro_e_Audio` de cada produto no Drive em 10/09.
Ficam aqui como cópia de segurança; não precisam ser copiados de novo.

## 5-scripts-planilha

Apps Scripts que não pertencem a uma diária só:
`limpar-ag.gs` (limpa a coluna AG) e `corrigir-af-reclassificacao.gs` (único que
sobrescreve AF já preenchida, e só depois de conferir SKU e valor antigo).

## _apoio

`_indice_drive.csv` — 3202 pastas do Drive indexadas por SKU. É o que resolve
"onde fica a pasta deste produto". Vale regerar quando entrar lote novo.
Também guarda os `.bak` e o rascunho de e-mail que ficou desatualizado.

---

## Regras que valem para tudo

1. **Casar sempre por SKU + AD** (Data/Enviado/Cliente = data da diária).
   Só o SKU não basta: o mesmo SKU aparece em mais de uma linha.
2. **Nunca sobrescrever célula preenchida**, exceto com script que confere o
   valor antigo antes.
3. **Deixar AG em branco** nas linhas que a gente escreve — é assim que o Tiago
   identifica o que entrou em cada rodada.
4. **Áudio novo entra ao lado do antigo** (`_R02`, `_R03`), nunca por cima.

## 6-roteiros-drika_15-09-2026

Os 60 roteiros marcados com **15/09 na coluna U (Voz Drika)** — 53 LEGO e 7 de
outros produtos. Vieram do Drive (`DIÁRIA UNIFICADA / 09. SETEMBRO`, subpastas
`04.09` e `09.09`), baixados como `.docx`.

**4 deles o Google não exporta** (falha no download individual e na compactação):
`240997100`, `240385900`, `240998000`, `240384800`. O texto foi extraído do
próprio Docs e remontado — conteúdo completo, formatação original perdida.
Está anotado no `LEIA-ME.txt` e na coluna *Origem* do `_lista.csv` da pasta.

**Distribuídos em 15/09**: os 59 que têm pasta foram copiados para o
`Roteiro_e_Audio` de cada produto em `EM_ANDAMENTO/2026-08-AGOSTO`, via `G:`
(o Drive está montado, não precisa de upload). Nenhuma dessas subpastas tinha
conteúdo — nada foi sobrescrito. O mapa está em `_destinos.csv`.
O `241104800` ficou de fora: não tem pasta de produto no Drive (ver PENDENCIAS).

> A pasta `drive-download-20260915T142828Z-1-001/` é o pacote bruto do Drive
> (193 dos 202 documentos — o ZIP do Google derruba os que não exporta). Pode
> apagar depois de conferir os 60.

## 7-roteiros-rampim_15-09-2026

Os 139 roteiros restantes do lote — tudo que não foi para a Drika. Mesma fonte:
`drive-download-20260915T142828Z-1-001`.

60 (Drika) + 139 (Rampim) = **199**. O pacote do Drive tinha 202 documentos;
os outros 3 são de SKUs que não estão em nenhuma das duas listas — o único
sobrando é `241281700` (Colchão Viúva Americanflex), que ficou sem destino.

**3 foram recriados por nós**: `241144100`, `240792400`, `204592700`. São os
mesmos que o Google se recusa a exportar — falham no download individual, na
compactação e na URL de export. Por isso o ZIP veio com 193 de 202.

> Os roteiros em `PROJETOS/magalu-roteirista` **não servem** como substituto:
> são os que ainda não foram aprovados.
