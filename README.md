# Mise en commun

Prototype front-end en français, construit en React avec Vite et CSS. La composition desktop reprend `Proto_1.png`. Les menus et sous-rubriques remplacent le contenu via l’état React, sans rechargement ni changement d’URL.

## Démarrer

Avec Node.js et npm installés :

```powershell
npm.cmd install
npm.cmd run dev
```

Ouvrir l’adresse indiquée par Vite, généralement http://127.0.0.1:5173.

```powershell
npm.cmd run build
npm.cmd run preview
```

`dist/` contient le site statique prêt à héberger. Aucun serveur applicatif ni service externe n’est nécessaire.

## Déploiement

Le site est publié sur https://denisbtl.github.io/passerelle/. À chaque push sur `main`, le workflow `.github/workflows/deploy.yml` construit le site et pousse `dist/` sur la branche `gh-pages`, que GitHub Pages sert. `vite.config.js` fixe `base` à `/passerelle/` ; les fichiers de `public/` référencés depuis le JSX passent par `asset()` (`src/assets.js`) pour recevoir ce préfixe. Si le dépôt est renommé, mettre à jour `base`.

## Organisation

- `src/data.js` : nom du projet, navigation, étapes, solutions, textes et cas d’usage.
- `src/App.jsx` : navigation interne, formulaires et ouverture des fenêtres de détail.
- `src/components/Header.jsx` : en-tête, navigation mobile et pied de page.
- `src/components/Journey.jsx` : parcours, cartes métier et connecteurs.
- `src/components/MobileStageExplorer.jsx` : frise tactile et projets filtrés par étape sur mobile et tablette.
- `src/components/IdeaForm.jsx` : dépôt d’idée, validation native et confirmation simulée.
- `src/components/ContentPanels.jsx` : projet, filtres des solutions, contact et participation.
- `src/components/SupportingSections.jsx` : explications et cas d’usage.
- `src/components/Dialog.jsx` : fenêtres accessibles et recherche locale.
- `src/styles.css` : charte graphique, composition desktop et adaptations responsive.
- `public/assets/` : images, icônes et polices locales.

Le nom se change dans `project.name`, au début de `src/data.js`. Mettre également à jour les métadonnées initiales dans `index.html` pour un changement définitif.

## Interactions

- Sur ordinateur, cliquer sur l’une des neuf étapes ouvre le formulaire et présélectionne l’étape.
- Sur mobile et tablette (jusqu’à 1 100 px), la frise défile latéralement. Toucher une icône affiche les projets associés sous la frise ; les flèches et le clavier permettent aussi de sélectionner une étape. Le bouton « Proposer une idée pour cette étape » ouvre le formulaire prérempli.
- Les projets et leurs statuts sont fictifs, signalés comme démonstrations et centralisés dans `ongoingProjects` de `src/data.js` pour être remplacés par les données réelles.
- Les champs d’une idée sont conservés en mémoire pendant les changements de rubrique.
- Les cartes de connexion et les cas d’usage ouvrent leur description.
- Les sous-rubriques du projet et les filtres de solutions actualisent le contenu sur place.
- La recherche parcourt les étapes et solutions, avec ou sans accents.
- Les formulaires utilisent la validation du navigateur et affichent une confirmation de démonstration.
- Aucune donnée saisie n’est envoyée, stockée durablement ou conservée après un rechargement.

Les connexions présentées sont des pistes illustratives, pas des intégrations actives. Aucun nom de partenaire réel n’est affiché.

## Visuels

Les neuf icônes métier, la photo de vigne, les deux photos des cas d’usage et les polices proviennent du dossier existant `C:\Users\denis\Desktop\landing_final_episode_2\assets`. Les fichiers utiles ont été copiés dans ce projet ; le site d’origine n’a pas été modifié. La photo du prototype est remplacée par le vignoble déjà présent dans ces ressources. Les licences des polices sont dans `public/assets/fonts/OFL-LICENSES.txt`.

## Vérification navigateur

Démarrer le serveur de développement, puis :

```powershell
npm.cmd run test:e2e
```

Le script utilise Chrome installé sur Windows. Définir `BROWSER_PATH` pour un autre exécutable Chromium, et éventuellement `BASE_URL` pour une autre adresse. Il contrôle la navigation sans rechargement, les filtres, les formulaires, les modales et la mise en page sur ordinateur et mobile. Les captures sont écrites dans `artifacts/`.
