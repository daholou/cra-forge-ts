# Create React App Forge (TypeScript)
[![en](https://img.shields.io/badge/lang-en-yellow.svg)](https://github.com/daholou/cra-forge-ts/blob/main/README.md)

Ce projet est une base à partir de laquelle vous pouvez démarrer facilement 
une nouvelle application React en TypeScript. L'idée est de bénéficier du 
modèle de base [CRA](https://create-react-app.dev/), tout en ayant les 
éléments suivants disponibles dès le départ :
- Intégration [i18next](https://www.i18next.com/).
- Intégration [gh-pages](https://github.com/tschaub/gh-pages).
- Intégration [craco](https://github.com/dilanx/craco) pour permettre les 
  alias webpack avec CRA.
- Quelques composants React pour offrir une mise en page de base commune à 
  toutes les applications.
- Une structure de projet de base qui peut être étendue selon les besoins.

# Pour commencer
Voici les étapes à suivre pour commencer le développement d'une nouvelle 
application :

---
1. Clonez ce dépôt et renommez-le localement avec la commande `git clone 
   https://github.com/daholou/cra-forge-ts.git ma-nouvelle-app-ts`, où 
   `ma-nouvelle-app-ts` est le nom de votre projet.

---
2. Exécutez `yarn install`.

---
3. Exécutez le script d'installation automatique avec la commande `yarn run 
   auto-installer`. Gardez à l'esprit que vous devez avoir `node` et `git` 
   installés pour que le script fonctionne correctement.

---
4. Suivez simplement les instructions fournies pendant l'installation. Vous 
   devrez fournir un jeton d'accès personnel GitHub (avec au moins 
   l'autorisation repo) ainsi qu'un nom valide pour votre projet (par défaut,
   ce serait `ma-nouvelle-app-ts`, par exemple).

---
5. Une fois que le script d'installation est terminé sans erreurs, votre 
   projet devrait être prêt, ce qui signifie que :
   - Un dépôt portant le nom `ma-nouvelle-app-ts` devrait maintenant exister sur 
     votre compte GitHub.
   - Le dépôt `ma-nouvelle-app-ts` devrait comporter 3 branches :
     - `develop` : une branche pour les travaux en cours, comme d'habitude.
     - `main` : une fois qu'une fonctionnalité est prête dans `develop`, elle 
       peut être fusionnée dans cette branche, comme d'habitude.
     - `gh-pages` : vous devriez ignorer cette branche pendant le développement,
       elle a pour seul but de faciliter le déploiement vers GitHub Pages.
   - Le dépôt `ma-nouvelle-app-ts` devrait être déployé sur GitHub Pages, 
     grâce à la branche `gh-pages`.
   - L'action GitHub suivante devrait maintenant exister : à chaque push sur 
     la branche `main`, la branche `gh-pages` se met à jour automatiquement.

---
6. Pour protéger votre branche `main`, n'oubliez pas de définir `develop` comme 
   branche par défaut sur github.com.

