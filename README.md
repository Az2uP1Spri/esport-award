# ESPORT AWARD - Site Statique

Site statique de vote pour une cérémonie fictive d'esport, **100% compatible avec GitHub Pages**.

## 🎯 Caractéristiques

- **Site 100% statique** - HTML/CSS/JavaScript côté client uniquement
- **Aucun serveur requis** - Fonctionne directement avec GitHub Pages
- **Compatible GitHub Pages** - Déployable depuis la branche `main` / dossier `root`

## 📁 Structure du Projet

```
.
├── index.html          # Page d'accueil
├── vote.html          # Page de vote (catégories + tier list)
├── about.html         # Page à propos
├── css/
│   └── style.css     # Styles futuristes
├── js/
│   ├── main.js       # Navigation commune
│   └── vote.js       # Logique de vote + tier list
├── data/
│   └── esportData.js # Données des jeux, catégories, nominés
└── assets/
    └── games/        # Images des jeux
```

## 🚀 Utilisation Locale

### Option 1 : Ouvrir directement dans le navigateur
Ouvrez simplement `index.html` dans votre navigateur.

**Note :** Certains navigateurs peuvent bloquer les requêtes de fichiers locaux. Si vous rencontrez des problèmes, utilisez l'option 2.

### Option 2 : Serveur local simple

#### Avec Python 3 :
```bash
python -m http.server 8000
```
Puis ouvrez : `http://localhost:8000`

#### Avec Node.js (http-server) :
```bash
npx http-server -p 8000
```

#### Avec PHP :
```bash
php -S localhost:8000
```

## 🌐 Déploiement sur GitHub Pages

1. **Pousser le code sur GitHub** :
   ```bash
   git add .
   git commit -m "Convert to static site"
   git push origin main
   ```

2. **Activer GitHub Pages** :
   - Aller dans les **Settings** du repository
   - Section **Pages**
   - Source : **Deploy from a branch**
   - Branch : **main** / **root**
   - Cliquer sur **Save**

3. **Accéder au site** :
   - URL : `https://[votre-username].github.io/esport-award/`
   - Exemple : `https://az2up1spri.github.io/esport-award/`

## ✨ Fonctionnalités

### Page d'accueil (`index.html`)
- Hero section avec appel à l'action
- Navigation vers la page de vote

### Page de vote (`vote.html`)
- **Vote par catégories** :
  - Filtres par jeu (Tous les jeux, League of Legends, Valorant, etc.)
  - Cartes de nominés (joueurs/équipes) par catégorie
  - Sélection visuelle des votes
  - Résumé des votes enregistrés
  
- **Tier list meilleur jeu de l'année** :
  - Drag & drop des jeux dans les catégories S / A / B / C
  - Sauvegarde automatique dans localStorage

- **Système de vote** :
  - Votes simulés côté client uniquement
  - Sauvegarde dans `localStorage` du navigateur
  - Animation de confettis après chaque vote
  - Popup de confirmation

### Page à propos (`about.html`)
- Informations sur le projet

## 🔧 Technologies

- **HTML5** - Structure
- **CSS3** - Styles avec animations et gradients
- **JavaScript Vanilla** - Logique côté client
- **localStorage** - Persistance des votes localement

## 📝 Données

Les données des jeux, catégories et nominés sont dans `data/esportData.js` :

```javascript
const ESPORT_DATA = {
  games: [
    {
      id: "lol",
      name: "League of Legends",
      image: "./assets/games/league-of-legends.png",
      categories: [...]
    },
    // ...
  ]
};
```

Les scripts JS chargent ces données et génèrent le HTML dynamiquement.

## ⚠️ Notes Importantes

**Ce projet est un prototype** :
- ✅ Pas de base de données
- ✅ Pas d'authentification
- ✅ Pas de backend
- ✅ Tous les votes sont simulés côté client
- ✅ Les votes sont stockés uniquement dans le `localStorage` du navigateur

## 🎨 Personnalisation

### Modifier les données
Éditez `data/esportData.js` pour :
- Ajouter/modifier des jeux
- Ajouter/modifier des catégories
- Ajouter/modifier des nominés

### Modifier les styles
Éditez `css/style.css` pour personnaliser l'apparence.

### Ajouter des images
Placez les images dans `assets/games/`, `assets/players/`, `assets/teams/` et référencez-les dans `esportData.js`.

## 📄 Licence

ISC
