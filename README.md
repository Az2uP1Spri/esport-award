# ESPORT AWARD - Prototype

Prototype de site de vote pour une cérémonie fictive d'esport.

## Stack Technique

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **EJS** - Moteur de templates
- **HTML/CSS/JavaScript** - Front-end vanilla

## Installation

1. Installer les dépendances :
```bash
npm install
```

2. Démarrer le serveur :
```bash
npm start
```

3. Ouvrir dans le navigateur :
```
http://localhost:3000
```

## Structure du Projet

```
.
├── app.js                 # Serveur Express
├── package.json           # Dépendances npm
├── data/
│   └── esportData.js     # Données mock (jeux, catégories, nominés)
├── views/
│   ├── index.ejs         # Page d'accueil
│   ├── vote.ejs          # Page de vote
│   ├── about.ejs         # Page à propos
│   └── partials/
│       ├── header.ejs    # En-tête
│       └── footer.ejs    # Pied de page
└── public/
    ├── css/
    │   └── style.css     # Styles futuristes
    └── js/
        └── vote.js       # Logique de vote (front-end)
```

## Fonctionnalités

- **Page d'accueil** (`/`) - Hero section avec appel à l'action
- **Page de vote** (`/vote`) - Interface de vote avec cartes de nominés
- **Page à propos** (`/about`) - Informations sur le projet

### Système de Vote (Prototype)

- Les votes sont **simulés côté front-end uniquement**
- Aucune donnée n'est stockée en base de données
- Les votes sont sauvegardés dans le `localStorage` du navigateur
- Animation de toast de confirmation après chaque vote
- Sélection visuelle des cartes votées

## Notes Importantes

⚠️ **Ce projet est un prototype** :
- Pas de base de données
- Pas d'authentification
- Pas de backend pour les votes
- Tous les votes sont simulés côté client

## Personnalisation

Les données des jeux, joueurs et équipes sont dans `data/esportData.js`. Vous pouvez :
- Modifier les noms des placeholders
- Ajouter de nouveaux jeux/catégories
- Remplacer les chemins d'images par de vraies images dans `public/assets/`

## Licence

ISC

