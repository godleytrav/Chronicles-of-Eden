#!/usr/bin/env bash
set -euo pipefail

# Recreate core project structure for Chronicles of Eden.
mkdir -p src/routes src/game/scenes src/game/core src/game/ui
mkdir -p assets/sprites assets/tiles assets/audio assets/video assets/ui assets/fonts assets/textures
mkdir -p docs

# Ensure git tracks all directories.
touch src/.gitkeep src/routes/.gitkeep src/game/.gitkeep src/game/scenes/.gitkeep src/game/core/.gitkeep src/game/ui/.gitkeep
touch assets/.gitkeep assets/sprites/.gitkeep assets/tiles/.gitkeep assets/audio/.gitkeep assets/video/.gitkeep assets/ui/.gitkeep assets/fonts/.gitkeep assets/textures/.gitkeep
touch docs/.gitkeep

# Stub required files if missing.
[[ -f README.md ]] || cat <<'DOC' > README.md
# Chronicles of Eden

A narrative-driven game prototype scaffolded with Phaser and modern web tooling.
DOC

[[ -f .gitignore ]] || cat <<'IGNORE' > .gitignore
node_modules/
dist/
.env
.cache/
IGNORE

[[ -f src/index.html ]] || cat <<'HTML' > src/index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Chronicles of Eden</title>
  </head>
  <body>
    <canvas id="game-canvas"></canvas>
    <!-- The Phaser game mounts onto this canvas. -->
  </body>
</html>
HTML

[[ -f src/app.ts ]] || cat <<'TS' > src/app.ts
// Entry point for the Chronicles of Eden Phaser application.
import Phaser from 'phaser';

// Placeholder export to satisfy the initial project scaffold.
export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
};
TS

[[ -f docs/design_bible.md ]] || : > docs/design_bible.md
[[ -f docs/changelog.md ]] || : > docs/changelog.md

echo "Project structure ensured."
