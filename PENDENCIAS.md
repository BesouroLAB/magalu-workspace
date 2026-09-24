# Pendências — para 15/09/2026

Combinado com o Tiago em 14/09.

---

## 1. Enviar áudios para gravação — Rampim (voz IA) e Drika (voz humana)

A separação sai das colunas da planilha: **S / T = Rampim**, **U = Drika**.

**Os 7 candidatos de hoje estão todos com S preenchida e U vazia — ou seja,
todos são voz IA, todos vão para o Rampim. Nenhum para a Drika neste lote.**
Confirmar na planilha viva antes de enviar; a cópia local é de 08/09.

### Prontos (demandas da Andrea)
| SKU | Produto | O que |
|---|---|---|
| 238945900 | Guarda-roupa Lanza Milão | "quatro cores" → "diferentes cores" |
| 238946200 | Cômoda Lanza Paris | idem (texto derivado por nós, não veio dela assim) |
| 238996400 | Mesa Dobrável Otello | pronúncia "LEVEAR" → "levar" |

Já estão prontos em `2-demandas-andrea/Rampim_ajustes-roteiro-e-audio_14-09-2026.xlsx`,
aba **Para gravar**.

### Travado
| SKU | Produto | Trava |
|---|---|---|
| 240133100 | Berço Mini Cama | falta redigir o trecho da conversão berço → mini cama |

### Dependem do lançamento da 08.09
| SKU | Produto | AF |
|---|---|---|
| 234976400 | Espagueteira Tramontina | Alteração áudio — pronúncia de "Starflon" |
| 227421700 | Galaxy S20 FE | REINSERÇÃO CENAS IA/áudio — "Diga" em vez de "Giga" |
| 225511800 | Sofá Retrátil Grazzia | Alteração/áudio — "escuma" em vez de "espuma" |

### Ainda a revisar
- **232524100** (Cama Box Casal, diária 03.09) está com AF = `Alteração áudio`,
  destino só Rampim. Com a regra nova da régua de medidas ele precisa ir para o
  editor também.

> Pedir ao Rampim o mesmo padrão de nome dos anteriores (`_IA_Final_R02`, `_R03`),
> adicionando ao lado do arquivo antigo, sem substituir.

---

## 2. Conferir se a diária 08.09 foi registrada corretamente

**Contexto novo:** o Tiago percebeu que parte das linhas **já tinha sido gravada
por outro agente, da Priscila**, e com muitas falhas — não preencheu tudo
corretamente. Ele perguntou a ela e **está esperando resposta**.

Isso muda o risco do lançamento: não é mais uma planilha vazia esperando os
nossos dados, é uma planilha com escrita de terceiro por cima das mesmas linhas.

### Como conferir
O `1-diarias/diaria-08.09/lancar-retorno-08.09.gs` está em `SIMULAR = true` e já
foi preparado para isso. O log traz o bloco:

```
--- linhas que JA TEM algo em AF, AJ ou AG: N de 88 ---
```

que lista, linha a linha, o conteúdo atual de **AF, AJ e AG**. É exatamente o
retrato do que o outro agente escreveu.

### Regras que continuam valendo
- AF e AJ só são escritas se estiverem **vazias**; nada é sobrescrito.
- AG é limpa **apenas** nas linhas em que escrevemos.
- Se AG tiver conteúdo de outra pessoa (na 03.09 havia 23 linhas com "Priscila"),
  **não limpar** antes de falar com ela.

### Decidir depois do log
1. O que o outro agente preencheu está certo? Se estiver errado, precisa de um
   script de sobrescrita — o único que faz isso é
   `5-scripts-planilha/corrigir-af-reclassificacao.gs`, que confere o valor
   antigo antes de trocar.
2. **240714100** (Bebida Láctea YoPRO+) — teve observação, foi alterado,
   reenviado e agora veio Aprovado. Tem duas linhas antigas com AD=11/08 e AF
   preenchida. O `Aprovado` deve cair em linha nova com AD=08/09. Se o log
   mostrar que ele pulou por AF preenchida, a linha foi reaproveitada e precisa
   de tratamento pontual.

---

## 3. Pasta que não existe no Drive — 241104800

Ao distribuir os 60 roteiros da Drika (15/09), 59 foram para o
`Roteiro_e_Audio` da sua pasta em `EM_ANDAMENTO/2026-08-AGOSTO`. **O
`241104800` (Jogo de Taças de Cristal Bohemia) não tem pasta de produto** —
busca por `241104800 type:folder` no Drive não retorna nada, em nenhuma conta.
Só existem o roteiro e a versão de agosto do documento.

O `.docx` está em `6-roteiros-drika_15-09-2026/`, pronto. Falta criar a pasta
do produto (com `Cenas_IA`, `Still`, `Imagem_Site`, `Final`, `Roteiro_e_Audio`)
ou descobrir se esse item saiu do lote.

---

## Também em aberto (sem data)

- Rodar `1-diarias/diaria-03.09/lancar-af-alteracoes.gs` — execução nunca
  confirmada. É seguro repetir: pula célula preenchida.
- Rodar `5-scripts-planilha/limpar-ag.gs` e ler o log — vai revelar o que
  preencheu a AG.
- Preencher `AD330 = 04/09/2026` (Fralda Pampers 240690600), que ficou em branco.
- Montar a planilha dos 7 itens de **régua de medidas** para o editor, depois que
  o Tiago inserir as medidas nos roteiros. Instrução ao editor: **incluir na
  segunda cena**.
- Levar à Lenny a proposta de separar a coluna AF em duas + validação de dados.
