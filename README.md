_**Para a versão em português, [clique aqui](README-PTBR.md).**_

# PT-BR Wiki Translator

## Overview

The PT-BR Wiki Translator is a browser application designed to assist users in translating pages from the main RuneScape 3 Wiki. It automatically translates specific templates and it's parameter/value combinations. Please note that this tool isn't intended for translating entire pages, but rather templates with fixed translations.

## Usage guide

### Translation
Place the desired english template source-code into the text area on the left.

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

The above template will be translated to:

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

Unsupported parameters or those that don't have fixed values (like examine texts or reference notes) are left untranslated.

```
{{DropsTableHead}}
{{DropsLine|name=Soul rune|quantity=125-175|rarity=Common}}
{{DropsLine|name=Dark animica stone spirit|quantity=60-95|namenotes=<ref name="Stone spirits" group="d">Light and dark animica stone spirits are dropped together in the same quantities.</ref>|rarity=Common}}
{{DropsTableBottom}}
```

When translated to Portuguese, it becomes:
```
{{ObjetoLargadoCabeçalho}}
{{ObjetoLargado|nome=Runa da alma|quantidade=125-175|raridade=comum}}
{{ObjetoLargado|nome=Espírito da pedra de animica sombria|quantidade=60-95|nomeNotas=<ref name="Stone spirits" group="d">Light and dark animica stone spirits are dropped together in the same quantities.</ref>|raridade=comum}}
{{ObjetoLargadoRodapé}}
```

#### Templates currently supported
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


### Update History (U.H.)
The `U.H.` interface exists to help users find the correct update text on the RuneScape website (in Portuguese).

After clicking the button, choose where to search for a date:
- On the PT-BR Wiki (to maybe check if there's already an update page created for a given date); 
- On the RuneScape website (to search for the desired update text); or 
- Both at once!

Choose the month, day and year. Then, click "Search" to open the desired page(s).

### Grand Exchange (G.E.)
The `G.E.` interface exists to take users directly to the desired item's G.E. page for them to easily find tradeable item examine texts.

After clicking the button, type the Portuguese name of the desired item into the input field at the top.

It's case-insensitive, and after finding the item you're looking for, just click the icon next to it's name.

### Options
- Appearence: changes between dark and light visual modes;
- Language: changes between Portuguese and English labels;
- Grand Exchange:
  - Show icons: toggles item icons on the G.E. item search list;
  - Use detailed: toggles the use of detailed icons instead of inventory sprites.
- Interface: toggles an extra animation for proper opening and closing of the side windows.
- Text area:
  - Hyperlinks: toggles template hyperlinks to their Wiki pages;
  - Untranslated: toggles highlighting of untranslated text.

## Current known bugs
* *Such empty; much wow.*