#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

declare -a DIRS=(
  "src"
  "src/routes"
  "src/game"
  "src/game/scenes"
  "src/game/core"
  "src/game/ui"
  "assets"
  "assets/sprites"
  "assets/tiles"
  "assets/audio"
  "assets/video"
  "assets/ui"
  "assets/fonts"
  "assets/textures"
  "docs"
)

for dir in "${DIRS[@]}"; do
  mkdir -p "$ROOT_DIR/$dir"
  touch "$ROOT_DIR/$dir/.gitkeep"
done

# Create placeholder files if they do not exist.
[[ -f "$ROOT_DIR/README.md" ]] || cat <<'README' > "$ROOT_DIR/README.md"
# Chronicles of Eden

A mythic-inspired interactive experience built with Phaser and React, combining narrative exploration with resource-based gameplay.
README

[[ -f "$ROOT_DIR/.gitignore" ]] || cat <<'GITIGNORE' > "$ROOT_DIR/.gitignore"
node_modules/
dist/
.env
.cache/
*.cache
GITIGNORE

[[ -f "$ROOT_DIR/src/index.html" ]] || cat <<'HTML' > "$ROOT_DIR/src/index.html"
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Chronicles of Eden</title>
  </head>
  <body>
    <div id="game-container">
      <!-- Game canvas will be mounted here by Phaser -->
    </div>
    <script type="module" src="./app.ts"></script>
  </body>
</html>
HTML

[[ -f "$ROOT_DIR/src/app.ts" ]] || cat <<'APP' > "$ROOT_DIR/src/app.ts"
// Entry point for the Chronicles of Eden TypeScript application.
// This placeholder imports Phaser and sets up the environment for future scenes.
import Phaser from 'phaser';

console.debug('Chronicles of Eden app initialized with Phaser placeholder.', Phaser);
APP

[[ -f "$ROOT_DIR/docs/design_bible.md" ]] || touch "$ROOT_DIR/docs/design_bible.md"
[[ -f "$ROOT_DIR/docs/changelog.md" ]] || touch "$ROOT_DIR/docs/changelog.md"

printf 'Project structure ensured.\n'
