# Un client ReactJS pour l'application SyncFood

### SyncFood front est une application web côté client qui permet d'utiliser la plateforme SyncFood

## Prérequis

Pour faire fonctionner SyncFood-Front vous aurez au préalable besoin des élements suivant
- [NodeJS](https://nodejs.org)
- git
- [SyncFood-api](https://github.com/SyncFoodTeam/SyncFood-api)

## Mise en place de l'application

### Cloner le projet
```
git clone https://github.com/SyncFoodTeam/SyncFood-front
```

### Installer les dépendances
```
npm i --legacy-peer-deps
```
### Lancer l'application en mode développement

```
npm start
```
Un nouvel onglet s'ouvrira automatiquement dans votre naviguateur   
Dans le cas contraire accédez à l'url [http://localhost:3000](http://localhost:3000)

## Mise en production de l'application

```
npm i --legacy-peer-deps
```
```
npm run build
````
Le dossier build contient la version optimisé de l'application, prête à être mise en production via un serveur web adequat (ex: apache ou nginx)

