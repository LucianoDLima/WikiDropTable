# RS3 Wiki Helper Tool

The RS3 Wiki Helper Tool is a browser application designed to assist users in translating pages from the Runescape 3 Wiki. It simplifies the translation process by automatically translating specific template parameters and all the runescape 3 items. Please note that this tool is not intended for translating entire pages but rather templates with fixed translations plus the game items.

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
In this example, the translation is applied to specific parameters that have fixed translations. For instance, the parameter **_name_** is always translated to **_nome_**, **_skill_** becomes **_habilidade_**, and so on. However, not all parameters are translated since some are used the same in both languages. For example, "ticks" remains as "ticks" in Portuguese.

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

As you can see, the tool translates everything except the text between **_>_** and **_<_** tags. This limitation exists because such text is usually specific to individual objects. For example, if we used **_nomeNotas=<>..._** with **_Runa da alma_**, the text would need to be entirely different. More generic content like character stories or object histories cannot be translated using this tool, for that you should use your own knowledge and other tools like google translator (don't use google translator for everything, though, please. Have common sense).

Making it short, this app is designed to assist in translating templates and the corresponding items within those templates, nothing else!

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
