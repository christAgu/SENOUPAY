# Logo Senou Pay

Assets extraits du board officiel "Identité de marque — Senou Pay" (v1.0, 2026), confirmé à la fois via le projet Claude Design et le PDF exporté du même board. Ces fichiers remplacent les anciens placeholders bleu/émeraude — la palette réelle validée est violet/prune (voir [BRANDING.md](../../V2/BRANDING.md)).

- `senou-pay-mark.svg` — le glyphe seul (astérisque à trois traits, violet `#C06CE8`, arrondis), utilisable indépendamment du wordmark (favicon, avatar, watermark).
- `senou-pay-app-icon.svg` — icône d'application (carré arrondi ~24% de rayon, dégradé violet `#C874ED → #A34FD4`, glyphe blanc `#FCFAFE`), base pour générer les tailles iOS/Android (1024×1024, etc.).
- `senou-pay-logo-light.svg` — wordmark horizontal pour fond clair (fond blanc cassé `#FCFAFE`, texte prune `#241B2E`, glyphe violet). Correspond à la déclinaison claire du board.
- `senou-pay-logo-dark.svg` — wordmark horizontal pour fond sombre (fond prune `#241B2E`, texte blanc cassé, glyphe violet). Correspond à la déclinaison sombre du board.
- `senou-pay-logotype-principal.svg` — lockup hero complet (glyphe + "Senou Pay" empilé + baseline "Payer, envoyer, suivre son argent — en toute simplicité."), reproduisant le panneau principal du board.

Autres tokens de marque extraits du même board, rangés à côté de `assets/logo/` :
- [`assets/colors/palette.css`](../colors/palette.css) et [`assets/colors/palette.json`](../colors/palette.json) — couleurs et polices en variables/JSON directement consommables dans le code.
- [`assets/icons/`](../icons/) — les 5 icônes de la section "Iconographie & UI" du board (carte, envoi, validation, statistiques, utilisateur), trait 2px violet, bouts arrondis.

Le board de marque complet (palette, typographie, ton de voix, boutons, iconographie) reste consultable dans le projet Claude Design d'origine : [Identité Senou Pay](https://claude.ai/design/p/9ffc329c-4465-4c3b-9e3a-f1ec198901c6?file=Identite+Senou+Pay.dc.html).

À faire quand des exports de production seront nécessaires : générer les PNG/tailles d'app icon (App Store, Play Store, favicon) à partir de `senou-pay-app-icon.svg`.
