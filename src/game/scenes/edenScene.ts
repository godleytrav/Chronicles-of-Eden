import Phaser from 'phaser';

/**
 * EdenScene renders the lush Garden of Eden hub area.
 * It showcases an isometric lawn, interactive foliage, and atmospheric audio
 * to set the tone for the Chronicles of Eden adventure.
 */
export class EdenScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;

  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  private wasdKeys?: {
    up: Phaser.Input.Keyboard.Key;
    down: Phaser.Input.Keyboard.Key;
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
  };

  private backgroundMusic?: Phaser.Sound.BaseSound;

  private vignetteOverlay?: Phaser.GameObjects.Graphics;

  private resizeHandler?: (gameSize: Phaser.Structs.Size) => void;

  private readonly gridSize = 10;

  private readonly tileWidth = 128;

  private readonly tileHeight = 64;

  private readonly moveSpeed = 220;

  constructor() {
    super({ key: 'EdenScene' });
  }

  public create(): void {
    this.createIsometricGround();
    this.placeTrees();
    this.createPlayer();
    this.createCamera();
    this.registerInput();
    this.playBackgroundMusic();
    this.createVignetteOverlay();
    this.handleResize();

    const bounds = this.getWorldBounds();
    this.physics.world.setBounds(bounds.x, bounds.y, bounds.width, bounds.height);

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.backgroundMusic?.stop();
      if (this.resizeHandler) {
        this.scale.off(Phaser.Scale.Events.RESIZE, this.resizeHandler, this);
      }
    });
  }

  public update(): void {
    if (!this.player) {
      return;
    }

    const direction = this.getMovementVector();
    if (direction.lengthSq() > 0) {
      const velocity = direction.normalize().scale(this.moveSpeed);
      this.player.setVelocity(velocity.x, velocity.y);
      this.player.setFlipX(velocity.x < 0);
    } else {
      this.player.setVelocity(0, 0);
    }
  }

  private createIsometricGround(): void {
    const { centerX, centerY } = this.getGroundCenter();

    for (let row = 0; row < this.gridSize; row += 1) {
      for (let col = 0; col < this.gridSize; col += 1) {
        const isoX = centerX + (col - row) * (this.tileWidth / 2);
        const isoY = centerY + (col + row) * (this.tileHeight / 2);

        const tile = this.add.image(isoX, isoY, 'eden_grass_01');
        tile.setOrigin(0.5, 0.5);
        tile.setDepth(isoY);
      }
    }
  }

  private placeTrees(): void {
    const positions: Array<{ row: number; col: number }> = [];
    const totalTrees = Phaser.Math.Between(3, 6);

    while (positions.length < totalTrees) {
      const row = Phaser.Math.Between(0, this.gridSize - 1);
      const col = Phaser.Math.Between(0, this.gridSize - 1);
      if (!positions.some((pos) => pos.row === row && pos.col === col)) {
        positions.push({ row, col });
      }
    }

    const { centerX, centerY } = this.getGroundCenter();

    positions.forEach(({ row, col }) => {
      const isoX = centerX + (col - row) * (this.tileWidth / 2);
      const isoY = centerY + (col + row) * (this.tileHeight / 2) - 64;

      const tree = this.add.image(isoX, isoY, 'tree_01');
      tree.setOrigin(0.5, 1);
      tree.setDepth(isoY + 10);
    });
  }

  private createPlayer(): void {
    const { centerX, centerY } = this.getGroundCenter();

    const row = Math.floor(this.gridSize / 2);
    const col = Math.floor(this.gridSize / 2);

    const isoX = centerX + (col - row) * (this.tileWidth / 2);
    const isoY = centerY + (col + row) * (this.tileHeight / 2) - 32;

    this.player = this.physics.add
      .sprite(isoX, isoY, 'adam_idle')
      .setDepth(isoY + 5)
      .setCollideWorldBounds(true);

    const body = this.player.body as Phaser.Physics.Arcade.Body;
    body.setSize(32, 16, true);
  }

  private createCamera(): void {
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    this.cameras.main.setZoom(1);
  }

  private registerInput(): void {
    this.cursors = this.input.keyboard.createCursorKeys();

    this.wasdKeys = {
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };
  }

  private getMovementVector(): Phaser.Math.Vector2 {
    const direction = new Phaser.Math.Vector2(0, 0);

    const cursors = this.cursors;
    const wasd = this.wasdKeys;

    if (cursors?.left?.isDown || wasd?.left.isDown) {
      direction.x -= 1;
    }
    if (cursors?.right?.isDown || wasd?.right.isDown) {
      direction.x += 1;
    }
    if (cursors?.up?.isDown || wasd?.up.isDown) {
      direction.y -= 1;
    }
    if (cursors?.down?.isDown || wasd?.down.isDown) {
      direction.y += 1;
    }

    return direction;
  }

  private playBackgroundMusic(): void {
    const existing = this.sound.get('eden_theme');
    if (existing) {
      this.backgroundMusic = existing;
      if (!existing.isPlaying) {
        existing.play({ loop: true, volume: 0.5 });
      }
      return;
    }

    this.backgroundMusic = this.sound.add('eden_theme', {
      loop: true,
      volume: 0.5,
    });

    this.backgroundMusic.play();
  }

  private createVignetteOverlay(): void {
    const { width, height } = this.scale;
    this.vignetteOverlay = this.add.graphics();
    this.resizeVignetteOverlay(width, height);
    this.vignetteOverlay.setScrollFactor(0);
    this.vignetteOverlay.setDepth(1000);
    this.vignetteOverlay.setBlendMode(Phaser.BlendModes.MULTIPLY);
    this.vignetteOverlay.setPosition(0, 0);
  }

  private resizeVignetteOverlay(width: number, height: number): void {
    if (!this.vignetteOverlay) {
      return;
    }

    const ringCount = 5;
    const maxInset = Math.min(width, height) * 0.2;

    this.vignetteOverlay.clear();

    for (let i = 0; i < ringCount; i += 1) {
      const t = i / (ringCount - 1);
      const inset = maxInset * t;
      const alpha = 0.15 + t * 0.35;
      const radius = Math.min(width, height) / 3;

      this.vignetteOverlay.fillStyle(0x000000, alpha);
      this.vignetteOverlay.fillRoundedRect(
        -inset,
        -inset,
        width + inset * 2,
        height + inset * 2,
        radius + inset
      );
    }
  }

  private handleResize(): void {
    this.resizeHandler = (gameSize) => {
      this.resizeVignetteOverlay(gameSize.width, gameSize.height);
    };

    this.scale.on(Phaser.Scale.Events.RESIZE, this.resizeHandler, this);
  }

  private getGroundCenter(): { centerX: number; centerY: number } {
    return {
      centerX: this.cameras.main.centerX,
      centerY: this.cameras.main.centerY + 100,
    };
  }

  private getWorldBounds(): Phaser.Geom.Rectangle {
    const width = (this.gridSize + this.gridSize) * (this.tileWidth / 2);
    const height = (this.gridSize + this.gridSize) * (this.tileHeight / 2);
    const { centerX, centerY } = this.getGroundCenter();

    return new Phaser.Geom.Rectangle(centerX - width / 2, centerY - this.tileHeight, width, height);
  }
}

/**
 * Future Expansion Notes:
 * - Introduce farming plots that allow planting seeds and harvesting fruit.
 * - Scatter interactive resources (wood, water) with collection mini-games.
 * - Populate the garden with friendly NPCs that offer story-driven quests.
 * - Layer dynamic weather systems and day/night cycles to enrich immersion.
 */

export default EdenScene;
