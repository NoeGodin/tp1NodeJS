# Compte rendu TP1

## Étape 1
Elle consistait à tester Postman et s'est bien déroulée.

## Étape 2
L'étape 2 ne m'a pas posé trop de problèmes.
Mon commit pour cette étape n'est pas réellement complet, puisque c'est seulement lors de l'étape 3 que je me suis rendu compte que je n'utilisais pas `JSON.parse(string)` pour récupérer l'objet JS.

## Étape 3
J'ai eu un peu plus de mal avec cette étape.
J'ai pris du temps à comprendre que `readFile` de `node:fs/promises` renvoyait une chaîne de caractères et qu'il fallait utiliser `JSON.stringify` pour transformer l'objet JS en JSON.

## Étape 4
Je n'ai pas compris ce que l'on attendait du hash et j'ai été contraint à demander de l'aide à mes camarades car je ne comprenais pas ce que l'on était censé générer.

## Étape bonus
J'ai effectué cette étape plusieurs jours après le TP. Ce temps de pause m'a permis de mieux comprendre les exercices et de rectifier les erreurs que j'avais pu laisser dans mon code, comme le hachage qui ne respectait pas les consignes données.
