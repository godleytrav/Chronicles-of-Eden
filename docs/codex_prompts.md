## 🧱 PROMPT 0 — PROJECT FILE STRUCTURE SETUP

> **Prompt for Codex:**
>
> Create the following directory and file structure inside the repository `Chronicles-of-Eden`.
>
> ```
> Chronicles-of-Eden/
> │
> ├── README.md
> ├── .gitignore
> ├── setup_project.sh
> │
> ├── src/
> │   ├── index.html
> │   ├── app.ts
> │   ├── vite.config.ts
> │   │
> │   ├── routes/
> │   │   ├── home.tsx
> │   │   └── game.tsx
> │   │
> │   └── game/
> │       ├── main.ts
> │       ├── scenes/
> │       │   ├── preloadScene.ts
> │       │   ├── edenScene.ts
> │       │   ├── gardenWorkScene.ts
> │       │   └── theFallScene.ts
> │       │
> │       ├── core/
> │       │   ├── player.ts
> │       │   ├── inputHandler.ts
> │       │   ├── dialogueManager.ts
> │       │   └── resourceSystem.ts
> │       │
> │       └── ui/
> │           ├── hud.ts
> │           ├── inventory.ts
> │           └── menu.ts
> │
> ├── assets/
> │   ├── sprites/
> │   ├── tiles/
> │   ├── audio/
> │   ├── video/
> │   ├── ui/
> │   ├── fonts/
> │   └── textures/
> │
> └── docs/
>     ├── design_bible.md
>     ├── codex_prompts.md
>     └── changelog.md
> ```
>
> Each directory should include an empty `.gitkeep` file so Git tracks the folder.
>
> Generate the following files with short placeholder comments inside:
> - `README.md` – short project description
> - `.gitignore` – ignore node_modules, dist, .env, and cache files
> - `setup_project.sh` – script that recreates this structure locally
> - `src/index.html` – base HTML shell that mounts the game canvas
> - `src/app.ts` – entry TypeScript file importing Phaser
> - `docs/design_bible.md` – empty file for creative notes
> - `docs/changelog.md` – empty log for version tracking
>
> Ensure the structure is clean, nested, and consistent with TypeScript project conventions.


⚙️ PROMPT 1 — src/game/main.ts
Prompt for Codex:
Create a TypeScript entry file for a Phaser 3 game called Chronicles of Eden.
Configure Phaser in AUTO mode.
Set width and height to window.innerWidth and window.innerHeight.
Enable pixel art mode.
Import and add three scenes:
PreloadScene
EdenScene
TheFallScene
Launch PreloadScene first.
Include:
Resize listener that updates the game scale on window resize.
Comments explaining each section.

🌿 PROMPT 2 — src/game/scenes/preloadScene.ts
Prompt for Codex:
Create a Phaser 3 scene class named PreloadScene.
Preload the following assets from /assets/:
sprites/adam_idle.png
tiles/eden_grass_01.png
tiles/tree_01.png
audio/eden_theme.mp3
Display a loading bar and percentage text in the center of the screen.
When all assets are loaded, fade out the loading screen and start the EdenScene.
Include comments explaining the preload lifecycle in Phaser.

🌳 PROMPT 3 — src/game/scenes/edenScene.ts
Prompt for Codex:
Create a Phaser 3 scene class named EdenScene for the Garden of Eden.
Isometric grid layout (10x10) using eden_grass_01.png tiles.
Place a tree_01.png at a few random positions.
Add the player sprite adam_idle.png at the center.
Enable arrow-key and WASD movement.
Camera should follow the player smoothly.
Add background music (eden_theme.mp3).
Display a soft vignette overlay to simulate divine lighting.
Include a helper comment block describing how to expand this scene later (planting, collecting, NPCs, etc.).

🧍 PROMPT 4 — src/game/core/player.ts
Prompt for Codex:
Create a TypeScript Player class for Phaser.
Extends Phaser.Physics.Arcade.Sprite.
Has properties for speed and animation states.
Adds keyboard controls (arrow keys and WASD).
Handles idle, walk, and interact states.
Includes an update() method called from the scene to control player behavior.
Add clear comments for each section so new developers can understand the logic.

🕹️ PROMPT 5 — src/game/core/inputHandler.ts
Prompt for Codex:
Create a helper class named InputHandler for managing keyboard and mobile input.
Support both keyboard and touch joystick (future feature).
Return a vector {x, y} based on movement input.
Integrate cleanly with Player class update logic.

💬 PROMPT 6 — src/game/core/dialogueManager.ts
Prompt for Codex:
Create a dialogue management system for displaying God’s dialogue or story narration.
showDialogue(text: string) displays text box at the bottom of the screen.
Auto-wrap long lines.
Fade-in / fade-out transitions.
Use Phaser.GameObjects.Text.
Include keyboard/tap input to advance dialogue.

🌈 PROMPT 7 — src/game/scenes/theFallScene.ts
Prompt for Codex:
Create a cinematic scene class TheFallScene.
Fade in a darkened version of Eden background.
Play a Firefly or Sora-generated video cutscene (placeholder: /assets/video/the_fall.mp4).
After playback, fade to black and show text:
"And so, the world was changed forever."
End scene (for now) with this.scene.pause() and a console message “The Fall sequence complete.”

🎵 PROMPT 8 — src/game/core/resourceSystem.ts
Prompt for Codex:
Create a simple resource system.
Tracks player’s fruit, wood, and water quantities.
Add collect(resource: string, amount: number) and get(resource: string) methods.
Persist data in localStorage (temporary save).
Add comments on how to expand this for crafting and inventory.

📜 PROMPT 9 — src/game/ui/hud.ts
Prompt for Codex:
Create a HUD overlay to display:
Player resources (fruit, wood, water)
Current objective text
God dialogue notifications
Use clean typography and alignment.

🌐 PROMPT 10 — src/routes/game.tsx
Prompt for Codex:
Create a React component GameRoute that mounts the Phaser game inside a PWA route.
Use a <div id="game-container"></div>.
Initialize Phaser once on component mount.
Ensure resizing works properly.
Include a back button to return to /home.



