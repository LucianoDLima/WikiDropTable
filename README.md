# PT-BR Wiki Translator

## Overview

The RS3 Wiki Helper Tool is a browser application designed to assist users in translating pages from the Runescape 3 Wiki. It simplifies the translation process by automatically translating specific template parameters and all the runescape 3 items and NPCs. Please note that this tool is not intended for translating entire pages but rather templates with fixed translations plus the game items. You can see more on how to use in the section [How to use it](#how-to-properly-use-it).

## Features
- Translates most of the wiki infoboxes and parameters.
- Translates all the NPC and Item names.
- Searches for the correct page containing the updates from the selected day.
- Upcoming feature: Searches for the correct GE page containing the item so you can check the Examine text.


## How to properly use it

Here's an example of how the tool works using the Infobox recipe template:
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
In this example, the translation is applied to specific parameters that have fixed translations. For instance, the parameter **_"name"_** is always translated to **_"nome"_**, **_"skill"_** becomes **_"habilidade"_**, and so on. However, not all parameters are translated since some are used the same in both languages. For example, **_"ticks"_** remains the same in Portuguese.

Now an example of how **NOT** to use this tool. Consider the following template for monster drops::

```
{{DropsTableHead}}
{{DropsLine|name=Soul rune|quantity=125-175|rarity=Common}}
{{DropsLine|name=Dark animica stone spirit|quantity=60-95|namenotes=<ref name="Stone spirits" group="d">Light and dark animica stone spirits are dropped together in the same quantities.</ref>|rarity=Common}}
{{DropsTableBottom}}
```

When translated to portuguese, it becomes:
```
{{ObjetoLargadoCabeçalho}}
{{ObjetoLargado|nome=Runa da alma|quantidade=125-175|raridade=comum}}
{{ObjetoLargado|nome=Espírito da pedra de animica sombria|quantidade=60-95|nomeNotas=<ref name="Stone spirits" group="d">Light and dark animica stone spirits are dropped together in the same quantities.</ref>|raridade=comum}}
{{ObjetoLargadoRodapé}}
```

As you can see, the tool translates everything except the text between **_>_** and **_<_** tags. This limitation exists because such text is usually specific to individual objects. For example, if we used **_nomeNotas=<>..._** with **_Runa da alma_**, the text would need to be entirely different. More generic content like character stories, object examine texts or explanation of mechanics and so on cannot be translated using this tool, for that you should use your own knowledge and other tools like google translator (don't use google translator for everything, though, please. Have common sense).

In short, this app is designed to assist in translating templates and the corresponding items within those templates, nothing else!

## Templates currently supported

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
- Others.
  * [Update history - Histórico de atualização](https://runescape.wiki/w/Template:Update_history)

## Current known bugs

- If there are multiple items or NPCs in the same line, only the first one will be translated. This does not happen in parameters, however. For example:
  * **"[[Super prayer renewal potion (6)]], [[Ancient elven ritual shard]], [[Luck of the Dwarves]]"**, only the **Super prayer potion** will be translated, the rest is ignored as they are in the same line.
  
