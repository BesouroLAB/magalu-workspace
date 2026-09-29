R = 'REINSERÇÃO CENAS IA'
RA = 'REINSERÇÃO CENAS IA/Alteração'
RAU = 'REINSERÇÃO CENAS IA/áudio'
A = 'Alteração'
AU = 'Alteração áudio'
D, AD = '24.09', '24/09/2026'
ACAD = 'Abertura da Lu – A cena está ambientada em uma academia, porém o produto é um brinquedo, tornando a ambientação incoerente com a finalidade do produto.'
PAT = 'Precisa reajustar a cena. Porque a única vez que aparece a opção em azul, o texto está em cima, tampando todos os detalhes do patinete. Sendo que, tem bastante espaço sobrando na parte de cima do vídeo.'
ITENS = [
    (D, AD, '240881100', 'Caixa de Som Bright Audio DW 2000 Bluetooth Amplificada Portátil 1200W USB', R, '', '', '0:03 - Iluminação diferente'),
    (D, AD, '241384300', 'Liquidificador Britânia BLQ900A Plástico 600W 2,1L Preto', RA, 'lettering: espaço entre a vírgula e "da" (0:02)', '',
     '0:02 - A palavra "da" tá colada na vírgula, precisa dar um espaço.\nA parte onde encaixa a jarra parece diferente.\n0:05 - A tampa tá diferente\n0:13 - A IA escreveu Britânia duas vezes no liquidificador. No original não tem. As lâminas estão bem altas.\n0:16 - As lâminas estão diferentes.\n0:24 - O botão tá diferente. A IA alucinou o texto da base.\n0:39 - A parte onde encaixa a jarra parece diferente.'),
    (D, AD, '240413400', 'Bicicleta Infantil Aro 12 Verden 10509 Princy Rosa e Roxa com Rodinhas', R, 'abertura da Lu ambientada em academia', '',
     ACAD + '\n0:03 -Tá com dois freios, mas o original tem apenas um.\n0:08 - O guidão tá diferente. Tá com dois freios, mas o original tem apenas um. A parte onde encaixa a roda tá diferente tbm.\n0:17 - Tá com dois freios, mas o original tem apenas um.'),
    (D, AD, '241543900', 'Esteira Ergométrica Elétrica Go New XEKE Dobrável Vel. Máxima 6km/h', R, '', '',
     '00:11 – A esteira aparece com uma largura muito menor do que a real, comprometendo a percepção das dimensões do produto.'),
    (D, AD, '241298000', 'Monitor Gamer Acer X49 Xbmipphuzx Curvo Ultrawide 49" Quad HD 5K Preto X Predator Series UM.SXXAA.X02', RAU,
     'trocar as imagens de tela com violência (0:09 e 0:33)',
     'DRIKA — VERIFICAR: 0:20 a Lu fala "zero vírgula zero três milissegundo". Conferir o valor na ficha e a leitura (plural "milissegundos"); se precisar, corrigir roteiro e regravar',
     '0:00 - O monitor tá diferente. A base e os pés estão diferentes do modelo original.\n0:09 - Ele tá proporcionalmente menor. O original tem 119,81cm de largura. A Lateral esquerda tá diferente. Substituir imagem da tela, porque os personagens do jogo estão em conflito, atirando, e dá zoom neste momento.\n0:16 - Os pés estão bem inclinados.\n0:20 - A Lu fala: "zero vírgula zero três milissegundo".\n0:21 - Os pés estão errados. O monitor tá visivelmente menor.\n0:33 - Na cena de cima, precisa substituir a imagem da tela, porque tem violência explicita. E na cena debaixo, os pés do monitor tão diferentes\n0:39 - Monitor visivelmente menor.\n0:44 - A base e os pés estão diferentes do modelo original.'),
    (D, AD, '240351200', 'Patinete Infantil 3 Rodas Gato Lullie Sport', RA, 'abertura da Lu ambientada em academia + reposicionar o texto da opção azul', '',
     ACAD + '\n0:20 - ' + PAT),
    (D, AD, '241324600', 'Frigideira Antiaderente Rochedo de Alumínio Stone Pro Preto e Cinza 24cm', R, '', '',
     '0:05 - Tem a letra T no adesivo de temperatura, mas no original não tem.\n0:10 - Aqui a frigideira tá no fogo, sendo balançada, sem nada dentro.'),
    (D, AD, '240891500', 'Berço Portátil Desmontável Baby Style Joly Cinza', A, 'refazer as réguas no padrão da weekly', '',
     'As linhas das réguas de medidas estão diferentes do padrão alinhado na weekly.'),
    (D, AD, '234980800', 'Frigideira Antiaderente Tramontina de Alumínio Paris Chumbo 20cm com Espátula', R, '', '',
     '0:16 - A frigideira e a espátula estão quase do mesmo tamanho. Mas a frigideira é maior que ela.'),
    (D, AD, '234980900', 'Frigideira Antiaderente Tramontina de Alumínio Paris Vermelha 20cm com Espátula', R, '', '', '0:08 - O cabo tá diferente'),
    (D, AD, '236835500', 'Frigideira Antiaderente Multiflon de Alumínio com Espátula Color Amarela 22cm', AU, '',
     'DRIKA — locução muito pausada aos 00:10; regravar o miolo',
     '00:10 – A locução está sendo realizada de forma muito pausada, prejudicando a fluidez e deixando a fala incoerente.'),
    (D, AD, '238549600', 'Faqueiro Tramontina 36 Peças para Churrasco Amazonas 66960134', R, 'mostrar também talheres de mesa, chá, café e sobremesa', '',
     'Esse faqueiro é bem diversificado. Vem talheres de mesa, chá, café, churrasco e sobremesa. Mas eles foram ambientados apenas para churrasco. O ideal seria mostrar as outras opções tbm.'),
    (D, AD, '240212400', 'Patinete Infantil 3 Rodas Bandeirante Skatenet Preto e Rosa', A, 'reposicionar o texto da opção azul', '', PAT),
    (D, AD, '240212100', 'Patinete Infantil 3 Rodas Bandeirante Skatenet Preto e Vermelho', A, 'reposicionar o texto da opção azul', '', PAT),
    (D, AD, '240213300', 'Bicicleta de Equilíbrio Infantil Bandeirante Unicórnio Branca', R, 'abertura da Lu ambientada em academia', '',
     ACAD + '\n00:03 - As manoplas aparecem na cor rosa, porém o correto é azul.'),
]
