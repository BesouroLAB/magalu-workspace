# Prompt — conferência dos 60 áudios da Drika (Whisper local)

Abra uma sessão nova do Claude Code em `C:\Users\Tiago\Desktop\PROJETOS\magalu-work`
e cole o bloco abaixo.

Nada sai da máquina. O método transcreve e compara palavra a palavra: pega
palavra trocada, faltando ou sobrando, e pronúncia errada que virou **outra
palavra** (o caso "LEVEAR" em vez de "levar"). Não pega erro de fonema sutil —
o Whisper tende a "corrigir" para a palavra certa. É fila de escuta, não veredito.

---

```
Preciso conferir 60 áudios de locução contra os roteiros que os originaram,
localmente, sem mandar nada pra fora.

ONDE ESTÁ TUDO
- Áudios: 4-audios/Áudios-Drika/ (3 subpastas: Audios-Drika-01, -02, -03)
  60 arquivos .mp3, nomeados iac_<SKU>.mp3 (às vezes com espaço: "iac_ 237985200.mp3")
- Roteiros: 6-roteiros-drika_15-09-2026/ — 60 .docx, SKU no nome do arquivo
- Casamento 1:1 por SKU, já conferido: nenhum áudio sem roteiro nem o contrário.
- Ignore 4-audios/corrigidos-rampim_10.09 — não é deste lote.

FERRAMENTA
pip install faster-whisper. Já verifiquei que resolve nesta máquina: traz o PyAV
junto, então lê mp3 sem precisar de ffmpeg no sistema, e não precisa de torch.
WhisperModel("small", device="cpu", compute_type="int8")
transcribe(..., language="pt", vad_filter=True, word_timestamps=True)
Se "small" errar muito nome de marca, suba para "medium".
Salve cada transcrição em 4-audios/transcricoes/<SKU>.txt ASSIM QUE SAIR, antes
de comparar qualquer coisa — se o processo parar no meio, não quero recomeçar do zero.

TEXTO FALADO DO ROTEIRO — a parte que mais importa acertar
O .docx tem muita coisa que NÃO é falada. Só é falado:
- as linhas que começam com "-", entre a linha de underscores (____) e o bloco
  que começa com 👤

NÃO é falado, exclua:
- linhas "Imagem: ..."   (descrição de cena)
- linhas "TL: ..."       (lettering na tela)
- o cabeçalho inteiro    (Cliente, Roteirista, Produto, Categoria, Duração, Palavras)
- todo o bloco de análise a partir de 👤
  (❓ 🎯 ⚓ 🚫 ✅ ✂️ e as linhas "Cena N → responde...")

Se você comparar o áudio com o roteiro inteiro, toda semelhança vai dar ~30% e
o resultado não serve pra nada. Antes de rodar os 60, mostre pra mim o texto
falado extraído de 2 ou 3 arquivos pra eu confirmar que ficou certo.

DICAS FONÉTICAS
O roteiro traz a pronúncia entre parênteses logo depois da palavra:
"LEGO City (círi)", "food truck (fúd trãc)", "Bluey (blui)", "Wap (váp)".
Tire o parêntese do texto esperado, mas registre cada um numa coluna à parte —
é onde a locução tem mais chance de ter escorregado.

NORMALIZAÇÃO ANTES DE COMPARAR
- minúsculas, sem acento, sem pontuação
- o roteiro escreve número por extenso ("duzentas e dezesseis peças") e o Whisper
  costuma devolver dígito ("216 peças"). Trate como iguais, ou jogue numa
  categoria separada de divergência de baixa prioridade — não misture com as
  divergências de verdade.

SAÍDA
Planilha .xlsx em 4-audios/, uma linha por SKU, ordenada da PIOR para a melhor
semelhança — essa ordem é a minha fila de escuta. Colunas:
SKU | Produto | Arquivo mp3 | Duração | Semelhança % | Palavras do roteiro que
não apareceram | Palavras que apareceram e não estavam no roteiro | Trechos
divergentes (roteiro vs transcrição, lado a lado) | Dicas fonéticas do roteiro |
Transcrição completa | OK? (coluna vazia, pra eu marcar)

SEJA FRANCO
Diga quantos ficaram com semelhança alta (provavelmente OK) e quantos merecem
escuta. Se algum arquivo transcrever vazio, muito curto ou com ruído evidente,
marque separado — pode ser problema no arquivo, não na locução.

NÃO faça nada no Google Drive. É tudo local.
```

---

> Também existe o caminho do Gemini, que ouve o áudio de verdade e julga
> pronúncia e prosódia (a chave já existe nos `.env` de `magalu-ai-suite` e
> `magalu-dashboard`). Ficou de fora porque mandaria os mp3 do cliente pra fora
> da máquina. Se um dia quiser, é só pedir que eu monto.
