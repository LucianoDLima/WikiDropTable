# PT-BR Wiki Translator

## Introdução

O PT-BR Wiki Translator é uma aplicação direta no navegador feita para auxiliar usuários na tradução de páginas da wiki em inglês do RuneScape 3. Ela automaticamente traduz predefinições específicas e suas combinações de parâmetros e seus valores. Vale ressaltar que esta ferramenta não é feita para traduzir páginas inteiras, e sim predefinições que possuem traduções fixas.

## Guia de uso

### Tradução
Coloque o código-fonte da predefinição em inglês desejada na área de texto à esquerda.

```
{{Infobox Recipe
|name = Luck of the Dwarves
|ticks = 3
|skill = Magic
|level = 87
|skillXP = 97
|geValue = gemw
|members = yes
}}
```

A predefinição acima será traduzida para:

```
{{Infobox criar
|nome = Sorte dos Anões
|ticks = 3
|habilidade = Magia
|nível = 87
|habilidade_exp = 97
|mercado = gemw
|membros = Sim
}}
```

Parâmetros não-suportados ou então que não possuem tradução fixa (como textos de examinar ou notas de referência) ficarão sem traduzir.

```
{{DropsTableHead}}
{{DropsLine|name=Soul rune|quantity=125-175|rarity=Common}}
{{DropsLine|name=Dark animica stone spirit|quantity=60-95|namenotes=<ref name="Stone spirits" group="d">Light and dark animica stone spirits are dropped together in the same quantities.</ref>|rarity=Common}}
{{DropsTableBottom}}
```

Quando traduzido para Português, ficará:

```
{{ObjetoLargadoCabeçalho}}
{{ObjetoLargado|nome=Runa da alma|quantidade=125-175|raridade=comum}}
{{ObjetoLargado|nome=Espírito da pedra de animica sombria|quantidade=60-95|nomeNotas=<ref name="Stone spirits" group="d">Light and dark animica stone spirits are dropped together in the same quantities.</ref>|raridade=comum}}
{{ObjetoLargadoRodapé}}
```

#### Predefinições suportadas
- Drops
  * [Monsters and general](https://runescape.wiki/w/Template:DropsLine)
  * [Events and rewards](https://runescape.wiki/w/Template:DropsLineRW)
  * [Woodcutting](https://runescape.wiki/w/Template:DropsLineWC)
  * [Archeology](https://runescape.wiki/w/Template:DropsLineArch)
  * [Thieving](https://runescape.wiki/w/Template:DropsLineThiev)
  * [Hunter](https://runescape.wiki/w/Template:DropsLineHunt)
- Infoboxes. 
  * [Recipe - Criação](https://runescape.wiki/w/Template:Infobox_Recipe)
  * [Item - Objeto](https://runescape.wiki/w/Module:Infobox_Item)
  * [Summon Pouch - Algibeiras de Evocação](https://runescape.wiki/w/Template:Infobox_Summoning_pouch)
  * [Summon Scrolls - Pergaminhos de Evocação](https://runescape.wiki/w/Template:Infobox_Summoning_scroll)
  * [Familiar - Familiar](https://runescape.wiki/w/Template:Infobox_familiar)
  * [Monster - Monstro](https://runescape.wiki/w/Template:Infobox_Monster_new)
  * [NPC](https://runescape.wiki/w/Template:Infobox_NPC)
  * [Shop - Loja](https://runescape.wiki/w/Template:Infobox_Shop)
  * [Weapons group - Grupo de armas](https://runescape.wiki/w/Template:Infobox_weapon_group)
  * [Eq infotable - Tabela equipamento](https://runescape.wiki/w/Template:Equipment_bonuses_infotable)
  * [Eqinforow - Tabela eq linha](https://runescape.wiki/w/Template:Equipment_bonuses_inforow)


### Histórico de Atualizações (H.A.)
A interface do `H.A.` existe para ajudar os usuários a encontrar o texto de atualizações correto no site do RuneScape.

Após clicar no botão, escolha onde procurar por uma data:
- Na Wiki PT-Br (para checkar se já existe uma página de atualização para uma certa data);
- No site do RuneScape (para procurar pelo texto da atualização desejada); ou
- Ambos ao mesmo tempo!

Escolha o mês, dia e ano. Então, clique em "Pesquisar" para abrir a(s) página(s) desejada(s). 

### Mercado Geral (M.G.)
A interface do `M.G.` existe para levar os usuários diretamente até a página do M.G. de dado item para facilitar encontrar o texto de examinar de itens negociáveis.

Após clicar no botão, digite o nome de um item no campo de texto no topo.

É insensível a capitalização, e após encontrar o item desejado, basta clicar no ícone ao lado do nome do item

### Opções
- Aparência: troca entre modos de cores escuras e claras;
- Língua: troca os rótulos entre Português e Inglês;
- Mercado Geral:
  - Mostrar ícones: ativa ícones de itens na lista de pesquisa do M.G.;
  - Usar detalhado: ativa ícones em detalhe ao invés de sprites da mochila;
- Interface: ativa uma animação extra para abertura e fechamento de janelas laterais.
- Área de texto:
  - Hyperlinks: ativa hiperlinks para as páginas da wiki das predefinições;
  - Untranslated: ativa realçamento de termos não-traduzidos.

## Bugs conhecidos
* *Tão vazio; quanta surpresa.*