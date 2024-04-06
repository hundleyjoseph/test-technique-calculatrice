Lien du site statique : https://hundleyjoseph.github.io/test-technique-calculatrice/

## Description du projet 

Projet visant a concevoir et recréer une calculatrice avec des fonctionnalités de base tout en ayant une interface réactive et conviviale.

## Table des matières

- [Technologies utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Calculatrice](#calculatrice)
- [Description des boutons](#description-des-boutons)
- [License](#license)


## Technologies utilisées

- React et Next.js pour la réalisation
- CSS implémenté avec le framework "Tailwindcss"

## Installation

1. Cloner le projet : `git clone https://github.com/hundleyjoseph/test-technique-calculatrice.git`
2. Se déplacer vers le répertoire du projet : `cd test-technique-calculatrice`
3. Utiliser l'une des commandes suivantes pour démarrer le serveur de développement :

    ```bash
    npm run dev
    # ou
    yarn dev
    # ou
    pnpm dev
    # ou
    bun dev
    ```

4. Par défaut, l'adresse du serveur est `http://localhost:3000/`

## Calculatrice

### Description des boutons

|  Bouton    | Utilisation                             |
|:----:|-----------------------------------------------------|
|  AC  | Efface toute la saisie                              |
|  π   | Utilisation de la constance PI                      |
|  ^   | Permet d'élever un nombre à une puissance           |
|  ⌫   | Bouton de retour                                    |
|  !   | Calcul de la factorielle                            |
|  ( )  | Parenthèses                                    |
|  %   | Calcul du pourcentage d'un nombre                   |
|  √   | Calcul de la racine d'un nombre                     |
|  +/- | Changer le signe d'un nombre                        |
|  Mod | Calculer le reste d'une division (modulo)           |
|  + - × ÷ | Opérateurs standards                          |
|  0 - 9   | Chiffres standards    |
|  =   | Afficher le résultat pour l'utiliser    |
|  .   | Utiliser des nombres décimaux                       |  

 
Lorsqu'un calcul n'est pas valide et que l'on appuie sur le bouton '=', on voit le message 'Erreur'.

Le CSS est adapté pour un environnement Web ou mobile





