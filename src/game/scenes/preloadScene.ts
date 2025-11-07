// src/game/scenes/PreloadScene.ts
import Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {
  private loadingBar!: Phaser.GameObjects.Graphics;
  private progressBox!: Phaser.GameObjects.Graphics;
  private progressText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload(): void {
    // --- Simple loading bar setup ---
    const { width, height } = this.cameras.main;
    this.progressBox = this.add.graphics();
    this.progressBox.fillStyle(0x222222, 0.8);
    this.progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);

    this.loadingBar = this.add.graphics();
    this.progressText = this.add.text(width / 2, height / 2 + 60, 'Loading...', {
      font: '18px monospace',
      color: '#ffffff',
    }).setOrigin(0.5);

    // --- Display progress updates ---
    this.load.on('progress', (value: number) => {
      this.loadingBar.clear();
      this.loadingBar.fillStyle(0xffffff, 1);
      this.loadingBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30);
      this.progressText.setText(`Loading: ${Math.floor(value * 100)}%`);
    });

    this.load.on('complete', () => {
      this.loadingBar.destroy();
      this.progressBox.destroy();
      this.progressText.destroy();
    });

    // --- Load assets dynamically from the manifest file ---
    this.load.once('complete', () => {
      this.scene.start('EdenScene');
    });

    // Fetch the JSON manifest and load assets dynamically
    this.loadManifestAssets();
  }

  private async loadManifestAssets(): Promise<void> {
    try {
      const response = await fetch('assets_manifest.json');
      const manifest = await response.json();

      // Load sprites and tiles
      [...(manifest.sprites || []), ...(manifest.tiles || [])].forEach((asset: any) => {
        this.load.image(asset.key, asset.path);
      });

      // Load audio files
      (manifest.audio || []).forEach((sound: any) => {
        this.load.audio(sound.key, sound.path);
      });

      // Load sprite sheets if defined
      (manifest.spritesheets || []).forEach((sheet: any) => {
        this.load.spritesheet(sheet.key, sheet.path, {
          frameWidth: sheet.frameWidth,
          frameHeight: sheet.frameHeight,
        });
      });
    } catch (error) {
      console.error('Error loading manifest:', error);
    }
  }
}

export default PreloadScene;
