# Assets Senou Pay — prototype web (V2)

Inventaire des fichiers statiques utilisés par le prototype HTML/CSS/JS dans `V2/web/`.

## Structure

```
assets/
  colors/     palette de marque (JSON + CSS)
  icons/      pictos SVG maison (+ exports PNG)
  images/     photos et logos opérateurs / marketing
  logo/       déclinaisons du logo Senou Pay (SVG + exports PNG)
```

## `logo/`

Voir [`logo/README.md`](logo/README.md) pour le détail des déclinaisons (mark, app icon, wordmark clair/sombre, lockup hero).

| Fichier | Format | Usage |
|---|---|---|
| `senou-pay-mark` | SVG, PNG | Glyphe seul (favicon, avatar, header) |
| `senou-pay-app-icon` | SVG, PNG | Icône d'application (1024×1024 base) |
| `senou-pay-logo-light` | SVG, PNG | Wordmark horizontal — fond clair |
| `senou-pay-logo-dark` | SVG, PNG | Wordmark horizontal — fond sombre |
| `senou-pay-logotype-principal` | SVG, PNG | Lockup hero (glyphe + baseline) |

> **Source de vérité web** : les fichiers `.svg` (vectoriels, légers). Les `.png` sont des exports raster pour prévisualisation, App Store / Play Store, ou contextes ne supportant pas le SVG.

## `icons/`

| Fichier | Format | Usage |
|---|---|---|
| `icon-user` | SVG, PNG | Connexion / profil |
| `icon-check` | SVG, PNG | Confirmation de transfert |
| `icon-send` | SVG, PNG | Envoi d'argent |
| `icon-card` | SVG, PNG | Carte / paiement |
| `icon-bar-chart` | SVG, PNG | Statistiques |
| `icon-swap` | SVG, PNG | Bascule XOF/EUR (legacy) |
| `flag-benin` | SVG, PNG | Drapeau Bénin |
| `flag-france` | SVG, PNG | Drapeau France |

> Les pages HTML du prototype utilisent les `.svg`. Les `.png` sont disponibles en fallback ou pour la doc.

## `images/`

Photos et logos fournis pour les sections marketing et les opérateurs Mobile Money.

| Fichier | Description |
|---|---|
| `mobile-wallet.png` | Photo lifestyle — utilisatrice avec smartphone |
| `visa-card.png` | Rendu carte Visa Senou Pay (édition Prune) |
| `mtn-momo.png` | Logo MTN Mobile Money |
| `moov-money.png` | Logo Moov Money Flooz |
| `celtiis-cash.png` | Logo Celtiis Cash |

> Les anciennes variantes `.jpg`/`.jpeg` du même dossier peuvent coexister ; préférer les `.png` pour les nouvelles références HTML.

## `colors/`

- `palette.css` — variables `--senou-color-*` exportées du board de marque
- `palette.json` — même palette en JSON

La source de vérité active du prototype est `css/variables.css` (consommé par toutes les pages HTML).

## Ajouter un asset

1. Déposer le fichier source dans ce dossier (ou `images/` pour les photos/logos).
2. Utiliser un nom clair en kebab-case (`mon-fichier.png`).
3. Référencer le chemin depuis le HTML/CSS : `assets/images/mon-fichier.png`.
4. Mettre à jour ce fichier si l'asset est partagé entre plusieurs écrans.
