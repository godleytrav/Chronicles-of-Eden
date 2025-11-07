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

