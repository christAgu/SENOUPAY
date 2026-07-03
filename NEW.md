# NEW.md — Guide de duplication du prototype Senou Pay

Ce document liste, dans l'ordre où elles ont été prises, toutes les décisions
techniques et de style qui ont produit le prototype actuel (`V2/web/`), pour
qu'une nouvelle page ou un nouvel écran puisse être construit en suivant
exactement les mêmes conventions.

## 0. Contraintes de départ

- **Aucun outil de build, aucun npm/Node.** HTML/CSS/JS vanilla uniquement,
  chargés directement via `<script src="...">` / `<link rel="stylesheet">`.
  Toute librairie externe doit donc être chargeable en `<script>`/`import()`
  CDN, sans étape de compilation.
- **Aucun backend.** L'état applicatif (utilisateur, montant en cours, etc.)
  vit dans `localStorage`, via `js/state.js`.
- Le prototype se lance avec un simple serveur statique :
  ```
  cd V2/web && python3 -m http.server 8000
  ```

## 1. Structure des fichiers

```
V2/web/
  index.html            écran Landing
  auth.html              écran Connexion / Inscription
  send-money.html        écran Envoyer de l'argent (accessible sans compte)
  css/
    variables.css         tokens de marque (couleurs, typo, espacements, rayons)
    base.css               reset + layout racine (.app-frame, .page-container)
    components.css         composants génériques réutilisables sur plusieurs écrans
    screens.css             styles propres à un écran donné, un bloc par écran
  js/
    state.js                localStorage (get/set/clear), préfixe senoupay_
    pricing.js               conversion XOF <-> EUR (taux fixe + spread)
    format.js                formatage d'affichage (formatXof, formatEur)
    components/
      header.js               rendu du header partagé (logo + nav + CTA)
      amount-swap.js           calculateur bidirectionnel XOF/EUR + AutoAnimate
    screens/
      landing.js, auth.js, send-money.js   logique propre à chaque écran
  assets/
    colors/     palette exportée (JSON + CSS) depuis le board de marque
    logo/        déclinaisons du logo (mark, wordmark, icône d'app, clair/sombre)
    icons/        pictos SVG maison (drapeaux, swap, user...) — recréés à la main
                   quand aucun fichier source n'était fourni
    images/      photos/logos fournis par l'utilisateur (voir §7)
```

**Règle de rangement CSS** : une classe qui sert sur ≥ 2 écrans va dans
`components.css` (nom générique, ex. `.card`, `.field-label`,
`.amount-panel`) ; une classe propre à un seul écran va dans `screens.css`,
sous le bloc `/* ===== NomEcran (fichier.html) ===== */` correspondant. Ne
jamais préfixer une classe par le nom d'un écran (`landing-*`) si elle est en
fait réutilisée ailleurs — c'est la source de bug la plus fréquente rencontrée
pendant ce projet (ex. `.card--narrow` a remplacé un sélecteur
`.landing-section .card` qui ne s'appliquait pas sur `send-money.html`).

## 2. Design tokens (`css/variables.css`)

Toutes les couleurs/tailles viennent du board de marque officiel, jamais en
dur ailleurs :

```css
--color-primary: #C06CE8;      /* Violet Senou — accent, CTA principal */
--color-secondary: #241B2E;    /* Prune — fonds sombres, structure */
--color-tertiary: #C9A9D4;     /* Lavande — bordures, éléments secondaires */
--color-surface-soft: #E7D8F1; /* Lilas — fonds de section */
--color-bg: #FCFAFE;           /* Blanc cassé — fond général */
--color-text-primary: #241B2E;
--color-text-secondary: #6C6478; /* Ardoise */
--color-border: #E7D8F1;

--font-display: 'Space Grotesk', ...;  /* titres, montants */
--font-body: 'Hanken Grotesk', ...;    /* texte courant */

--space-1..8: 4/8/12/16/24/32px;       /* échelle d'espacement */
--radius-pill / --radius-card / --radius-icon / --radius-sm;
```

Polices chargées une seule fois, en haut de `base.css`, via `@import` Google
Fonts (pas de balise `<link>` dupliquée par page).

## 3. Étapes suivies pour construire la page (dans l'ordre réel)

1. **Variables + reset** : `variables.css` puis `base.css` (`* { box-sizing:
   border-box }`, `.app-frame` pleine largeur, `.page-container` centré
   `max-width: 1200px` avec padding responsive).
2. **Écran Landing** : header + hero, puis Auth, en suivant le plan
   `FRONTEND_V2.md`.
3. **Passage d'un simulateur mobile figé à un layout web responsive** :
   suppression du cadre `.app-frame` à largeur fixe (420px), remplacé par
   `.page-container` fluide avec breakpoints.
4. **Découplage du parcours visiteur** : un visiteur non connecté doit
   pouvoir tester l'envoi d'argent sans créer de compte → `send-money.html`
   dédié, atteint directement depuis le bouton "Envoyer" de la landing (pas
   de redirection forcée vers `auth.html`).
5. **Passe d'optimisation** : chasse aux duplications (fonctions dupliquées
   sous deux noms, markup de header copié-collé 3 fois, classes CSS
   page-préfixées réutilisées ailleurs). Tout ce qui est partagé remonte dans
   `components.css` / `js/components/` / `js/format.js`.
6. **Élargissement du hero** : `.page-container` passé de 720px à 1200px et
   restructuration en grille 2 colonnes (`grid-template-columns: 1.15fr
   0.85fr` à partir de 900px) — un contenu marketing centré dans une colonne
   étroite sur grand écran n'est pas un bug de cache, c'est un vrai problème
   de layout à corriger avec une vraie grille.
7. **Détails de marque** : logo agrandi + légère rotation continue
   (`@keyframes brand-mark-spin`), bouton "Se connecter" passé de pilule à
   coin légèrement arrondi (`--radius-sm`) avec icône utilisateur.
8. **Calculateur de montant repensé** : deux blocs bien distincts
   (`.amount-panel` / `.amount-panel--result`) au lieu d'un aperçu texte
   quasi invisible, drapeaux Bénin/France en SVG maison, bouton de bascule
   central (`.amount-swap-btn`) qui échange réellement la position des deux
   blocs dans le DOM (voir §5).
9. **Sections marketing pleine largeur** : deux sections texte/image en
   alternance (portefeuille mobile, carte Visa), sorties de
   `.page-container` pour que l'image aille jusqu'au bord de l'écran (voir
   §6).
10. **Cohérence des boutons** : les CTA secondaires (carte Visa, Envoyer)
    réutilisent `.header-cta` plutôt que de dupliquer un style — voir §8 sur
    les variantes de couleur.
11. **Réseaux sociaux + logos opérateurs Mobile Money + logo en pied de
    page** : ajout progressif au footer, cf. §7 pour la provenance des
    images.

## 4. Composant Header partagé

Chaque écran a un point d'ancrage vide et configure le header **avant**
d'inclure `header.js` :

```html
<div id="app-header"></div>
<script>
  window.SENOU_HEADER_OPTIONS = { showBack: true };
  // ou : { ctaHtml: '<a href="auth.html" class="header-cta">...</a>' }
</script>
...
<script src="js/components/header.js"></script>
```

`renderHeader()` lit `window.SENOU_HEADER_OPTIONS` au `DOMContentLoaded` et
injecte le markup. Ça évite de dupliquer le HTML du header sur chaque page.

## 5. Calculateur bidirectionnel XOF/EUR (`amount-swap.js`)

Pattern à reproduire pour tout champ à double sens (montant envoyé /
montant reçu) :

- `js/pricing.js` expose `convertXofToEur()` et son inverse
  `convertEurToXof()` (même taux fixe `655.957`, même spread).
- `bindAmountSwap(xofInputId, eurInputId, swapBtnId)` gère un état
  `direction` (`xofToEur` / `eurToXof`), bascule `readOnly` sur le champ
  inactif, et **réordonne réellement les deux blocs dans le DOM** (le bloc
  actif passe en premier) via `appendChild` plutôt que par un hack CSS
  (`order` + `@keyframes`).
- L'animation de ce changement de position est déléguée à **AutoAnimate**
  (`@formkit/auto-animate`), importé en module ES via `import()` dynamique
  **directement dans le script classique** (pas besoin de `type="module"` sur
  la balise `<script>`, `import()` fonctionne partout) :
  ```js
  const autoAnimateReady = import('https://cdn.jsdelivr.net/npm/@formkit/auto-animate@0.9.0/index.min.js')
    .then((mod) => mod.autoAnimate)
    .catch(() => null);
  ```
  C'est la seule dépendance externe du prototype ; elle n'a pas de build UMD,
  uniquement un module ESM, d'où le `import()` plutôt qu'un `<script>` classique.

## 6. Pattern "section pleine largeur texte/image"

Utilisé pour les sections marketing après le hero (portefeuille mobile,
carte Visa) :

```html
<div class="landing-mobile-section">
  <div class="landing-mobile-copy"><div>...texte...</div></div>
  <div class="landing-mobile-image"><img ...></div>
</div>
```

- **Pas de `.page-container`** autour de cette div : la grille doit toucher
  le bord réel de l'écran, sinon le padding du conteneur laisse une bande
  blanche visible sur le côté de l'image.
- Grille `1fr` en mobile, `1fr 1fr` à partir de 900px, `gap: 0` en desktop
  (les deux moitiés se touchent).
- L'ordre des `<div>` dans le HTML détermine quelle moitié est à gauche —
  pour inverser texte/image d'une section à l'autre, inverser simplement
  l'ordre des deux blocs dans le markup (pas besoin de CSS `order`).
- Variante "carte présentée sur fond doux" (`.landing-card-visual`) : au lieu
  du `object-fit: cover` plein cadre, l'image est centrée avec
  `object-fit: contain`, un padding, un fond `--color-surface-soft` et une
  ombre portée. **Piège de spécificité** : comme `.landing-mobile-image` et
  `.landing-mobile-image img` sont définies plus bas dans le fichier avec la
  même spécificité qu'un sélecteur à une classe, la variante doit utiliser un
  sélecteur à deux classes (`.landing-mobile-image.landing-card-visual`) pour
  être sûre de l'emporter quel que soit l'ordre des règles dans le fichier.

## 7. Provenance des assets (`assets/images/`, `assets/icons/`)

Aucun outil de ce projet ne peut extraire les données binaires d'une image
**collée directement dans le chat** — dans ce cas, l'icône est recréée à la
main en SVG (drapeaux Bénin/France, réseaux sociaux, logos App
Store/Google Play) plutôt que copiée pixel pour pixel.

Quand l'utilisateur dépose un **fichier** dans le dossier `assets/images/`
du dépôt (photo, logo d'opérateur, PDF), le fichier est directement
lisible et copié tel quel dans `V2/web/assets/images/` sous un nom clair :

```
cp "assets/images/<nom original>" V2/web/assets/images/<nom-clair>.ext
```

Cas particulier : un rendu de carte fourni en **PDF** a été converti en PNG
avec l'utilitaire macOS intégré `sips` (aucune dépendance à installer) :

```
sips -s format png "fichier.pdf" --out sortie.png
```

Puis recadré sur le sujet (ici la carte, en excluant le titre/texte de mise
en page du PDF) avec un crop centré :

```
sips -c <hauteur> <largeur> sortie.png --out sortie-recadree.png
```

## 8. Boutons : deux familles, avec inversion de couleur au survol

- **`.btn-primary`** (composants.css) : fond `--color-primary`, texte clair,
  pilule. Au survol, inversion complète (fond clair, texte + bordure
  `--color-primary`) via une transition `0.15s` sur `background-color`,
  `color`, `border-color`. Nécessite `border: 1.5px solid transparent` par
  défaut pour que l'apparition de la bordure au survol ne décale pas la
  taille du bouton (`box-sizing: border-box` est global dans `base.css`).
- **`.header-cta`** (screens.css) : contour translucide clair, pensé pour le
  hero sombre. Variante **`.header-cta--on-light`** : mêmes propriétés
  (padding, radius, poids, disposition), seules les couleurs sont inversées
  (bordure/texte `--color-secondary`) pour rester lisible sur fond clair. Au
  survol, les deux variantes inversent aussi fond/texte.
- Règle générale suivie sur ce projet : quand on demande "même style qu'un
  autre bouton", réutiliser la **même classe de base** plutôt que dupliquer
  les propriétés une par une, et n'ajouter une variante (`--on-light`, etc.)
  que pour ce qui doit réellement changer (ici : la couleur, pas la forme).

## 9. Points de vérification utilisés à chaque étape

Comme il n'y a pas d'outil de capture d'écran/navigateur dans cet
environnement, chaque changement est vérifié par :

```
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/<fichier>
grep -rn "<ancienne-classe-ou-fonction>" V2/web/   # doit être vide après un renommage
```

Ça confirme que les fichiers sont bien servis et qu'aucune référence à du
code supprimé/renommé ne traîne — pas que le rendu visuel est correct : le
retour utilisateur (capture d'écran, description) reste nécessaire pour
valider le rendu.

## 10. Pour dupliquer cette page / en créer une nouvelle

1. Copier `variables.css` et `base.css` tels quels (ce sont les fondations,
   elles ne changent pas d'un écran à l'autre).
2. Créer le nouveau fichier `.html` : `<div id="app-header"></div>` +
   `window.SENOU_HEADER_OPTIONS` + les mêmes 4 feuilles de style + les
   scripts partagés (`state.js`, `pricing.js`, `format.js`, `header.js`) en
   premier, script(s) spécifique(s) à l'écran en dernier.
3. Repérer si chaque nouveau bloc visuel existe déjà dans
   `components.css` (`.card`, `.amount-panel`, `.btn-primary`,
   `.field-label`...) avant d'écrire une nouvelle classe.
4. Toute classe réellement propre à l'écran va dans `screens.css`, dans un
   nouveau bloc `/* ===== NomEcran (fichier.html) ===== */` à la suite des
   blocs existants — ne pas mélanger avec les blocs d'autres écrans.
5. Pour une section marketing texte/image pleine largeur, copier le pattern
   du §6 ; pour un champ à double sens, copier le pattern du §5.
6. Vérifier avec les commandes du §9 avant de considérer l'écran terminé.
