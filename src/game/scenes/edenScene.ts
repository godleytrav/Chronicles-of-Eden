import Phaser from 'phaser';

type WASDKeys = {
  W: Phaser.Input.Keyboard.Key;
  A: Phaser.Input.Keyboard.Key;
  S: Phaser.Input.Keyboard.Key;
  D: Phaser.Input.Keyboard.Key;
};

export default class EdenScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Sprite;

  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  private wasd!: WASDKeys;

  private backgroundMusic?: Phaser.Sound.BaseSound;

  constructor() {
    super('EdenScene');
  }

  create(): void {
    const { width, height } = this.scale;
    const gridSize = 10;
    const centerCoord = Math.floor(gridSize / 2);
    const tileWidth = 96;
    const tileHeight = 48;
    const originX = width / 2;
    const originY = height / 2 - tileHeight;

    this.cameras.main.setBackgroundColor(0x9ccfff);

    // -----------------------------------------------------------------------
    // Build a lightweight isometric grid using the Eden grass tile. Each tile
    // gets a depth based on its Y position so that objects overlap correctly.
    // -----------------------------------------------------------------------
    const positions: Phaser.Math.Vector2Like[] = [];
    for (let x = 0; x < gridSize; x += 1) {
      for (let y = 0; y < gridSize; y += 1) {
        const isoX = originX + (x - y) * (tileWidth / 2);
        const isoY = originY + (x + y) * (tileHeight / 2);
        const tile = this.add.image(isoX, isoY, 'eden_grass_01');
        tile.setOrigin(0.5, 0.5);
        tile.setDepth(isoY);
        positions.push({ x, y });
      }
    }

    // -----------------------------------------------------------------------
    // Scatter a handful of trees across random tiles to add some variation to
    // the otherwise flat garden layout.
    // -----------------------------------------------------------------------
    const randomTiles = Phaser.Utils.Array.Shuffle(
      positions.filter((pos) => !(pos.x === centerCoord && pos.y === centerCoord))
    );
    const treeCount = 6;
    for (let i = 0; i < treeCount && i < randomTiles.length; i += 1) {
      const { x, y } = randomTiles[i];
      const isoX = originX + (x - y) * (tileWidth / 2);
      const isoY = originY + (x + y) * (tileHeight / 2) - 32;
      const tree = this.add.image(isoX, isoY, 'tree_01');
      tree.setOrigin(0.5, 1);
      tree.setDepth(isoY + 64);
    }

    // -----------------------------------------------------------------------
    // Place the player sprite at the center of the garden. The camera will
    // follow this sprite to create a smooth exploration experience.
    // -----------------------------------------------------------------------
    const centerTile = { x: centerCoord, y: centerCoord };
    const centerX = originX + (centerTile.x - centerTile.y) * (tileWidth / 2);
    const centerY = originY + (centerTile.x + centerTile.y) * (tileHeight / 2) - 16;
    this.player = this.add.sprite(centerX, centerY, 'adam_idle');
    this.player.setOrigin(0.5, 1);
    this.player.setDepth(this.player.y + 64);

    this.cameras.main.startFollow(this.player, false, 0.1, 0.1);
    this.cameras.main.setLerp(0.12, 0.12);

    // -----------------------------------------------------------------------
    // Configure arrow-key and WASD controls so movement feels familiar to all
    // players regardless of preference.
    // -----------------------------------------------------------------------
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys({
      W: Phaser.Input.Keyboard.KeyCodes.W,
      A: Phaser.Input.Keyboard.KeyCodes.A,
      S: Phaser.Input.Keyboard.KeyCodes.S,
      D: Phaser.Input.Keyboard.KeyCodes.D,
    }) as WASDKeys;

    // -----------------------------------------------------------------------
    // The garden's ambiance is supported with a gentle looping music track.
    // -----------------------------------------------------------------------
    this.backgroundMusic = this.sound.add('eden_theme', { loop: true, volume: 0.6 });
    this.backgroundMusic.play();

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.backgroundMusic?.stop();
    });
    this.events.once(Phaser.Scenes.Events.DESTROY, () => {
      this.backgroundMusic?.destroy();
    });

    // -----------------------------------------------------------------------
    // Apply a subtle vignette overlay so the center of the scene glows softly
    // and the edges darken, hinting at a divine spotlight on the player.
    // -----------------------------------------------------------------------
    const vignette = this.add.renderTexture(0, 0, width, height);
    vignette.setOrigin(0, 0);
    for (let i = 0; i < 6; i += 1) {
      const margin = i * 40;
      const alpha = 0.04 + i * 0.04;
      vignette.fill(0x000000, alpha, margin, margin, width - margin * 2, height - margin * 2);
    }
    vignette.setBlendMode(Phaser.BlendModes.MULTIPLY);
    vignette.setDepth(1000);

    // -----------------------------------------------------------------------
    // Helper comment block for future expansion ideas:
    // - Planting seeds that grow over time and respond to player care.
    // - Collecting fruits and resources to feed NPCs or unlock new areas.
    // - Introducing friendly NPCs with dialogue trees managed by DialogueManager.
    // - Seasonal changes that alter tile textures, lighting, and available quests.
    // -----------------------------------------------------------------------
  }

  update(_time: number, delta: number): void {
    const speed = 160;
    let vx = 0;
    let vy = 0;

    if (this.cursors.left.isDown || this.wasd.A.isDown) {
      vx -= speed;
    }
    if (this.cursors.right.isDown || this.wasd.D.isDown) {
      vx += speed;
    }
    if (this.cursors.up.isDown || this.wasd.W.isDown) {
      vy -= speed;
    }
    if (this.cursors.down.isDown || this.wasd.S.isDown) {
      vy += speed;
    }

    const deltaSeconds = delta / 1000;
    this.player.x += vx * deltaSeconds;
    this.player.y += vy * deltaSeconds;

    // Keep depth sorted so the player appears in front of lower tiles.
    this.player.setDepth(this.player.y + 64);
  }
}
