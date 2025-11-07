// src/game/scenes/edenScene.ts
import Phaser from 'phaser';

export class EdenScene extends Phaser.Scene {
  constructor() {
    super({ key: 'EdenScene' });
  }

  create(): void {
    const { width, height } = this.scale;

    // --- Background grass ---
    const grass = this.add.image(width / 2, height / 2, 'eden_grass');
    grass.setOrigin(0.5);
    grass.setScale(3); // makes it fill more of the screen

    // --- Tree sprite ---
    const tree = this.add.image(width / 2 + 150, height / 2 - 100, 'eden_tree');
    tree.setOrigin(0.5);
    tree.setScale(2);

    // --- Eve sprite ---
    const eve = this.add.image(width / 2, height / 2, 'eve');
    eve.setOrigin(0.5);
    eve.setScale(2);

    // --- Background music ---
    const theme = this.sound.add('theme', { loop: true, volume: 0.5 });
    theme.play();
  }
}

export default EdenScene;
