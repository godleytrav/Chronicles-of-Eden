import Phaser from 'phaser';

// -----------------------------------------------------------------------------
// PreloadScene is responsible for loading all assets required before the player
// can enter the world. Phaser calls `preload` first, followed by `create` when
// the assets are ready, giving us hooks to show progress and transition away.
// -----------------------------------------------------------------------------
export default class PreloadScene extends Phaser.Scene {
  private progressBar!: Phaser.GameObjects.Graphics;

  private progressBox!: Phaser.GameObjects.Graphics;

  private loadingText!: Phaser.GameObjects.Text;

  private percentText!: Phaser.GameObjects.Text;

  constructor() {
    super('PreloadScene');
  }

  preload(): void {
    const { width, height } = this.cameras.main;

    // -----------------------------------------------------------------------
    // Setup a simple loading UI so players can see progress while assets load.
    // -----------------------------------------------------------------------
    this.progressBox = this.add.graphics();
    this.progressBox.fillStyle(0x222222, 0.8);
    this.progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);

    this.progressBar = this.add.graphics();

    this.loadingText = this.add
      .text(width / 2, height / 2 - 60, 'Loading Chronicles of Eden', {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    this.percentText = this.add
      .text(width / 2, height / 2, '0%', {
        fontFamily: 'Arial',
        fontSize: '20px',
        color: '#f5f5f5',
      })
      .setOrigin(0.5);

    // -----------------------------------------------------------------------
    // Phaser emits progress events during the preload lifecycle. We use them
    // to expand the progress bar and update the percentage text.
    // -----------------------------------------------------------------------
    this.load.on('progress', (value: number) => {
      this.progressBar.clear();
      this.progressBar.fillStyle(0xffffff, 1);
      this.progressBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30);
      this.percentText.setText(`${Math.round(value * 100)}%`);
    });

    // -----------------------------------------------------------------------
    // When all assets finish loading we gently fade out the UI before launching
    // the next scene so the transition feels smooth.
    // -----------------------------------------------------------------------
    this.load.once('complete', () => {
      this.time.delayedCall(200, () => this.fadeOutLoader());
    });

    // -----------------------------------------------------------------------
    // Register all of the assets needed for the early game experience.
    // -----------------------------------------------------------------------
    this.load.image('adam_idle', 'assets/sprites/adam_idle.png');
    this.load.image('eden_grass_01', 'assets/tiles/eden_grass_01.png');
    this.load.image('tree_01', 'assets/tiles/tree_01.png');
    this.load.audio('eden_theme', 'assets/audio/eden_theme.mp3');
  }

  create(): void {
    // `create` runs after `preload` has completed. The loader fade occurs in
    // fadeOutLoader so that any asynchronous tweens can execute cleanly here.
  }

  private fadeOutLoader(): void {
    const uiElements = [this.progressBar, this.progressBox, this.loadingText, this.percentText];

    this.tweens.add({
      targets: uiElements,
      alpha: 0,
      duration: 400,
      ease: 'Quad.easeIn',
      onComplete: () => {
        uiElements.forEach((element) => element.destroy());
        this.scene.start('EdenScene');
      },
    });
  }
}
