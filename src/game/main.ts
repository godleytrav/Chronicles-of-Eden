import Phaser from 'phaser';

import PreloadScene from './scenes/preloadScene';
import EdenScene from './scenes/edenScene';
import TheFallScene from './scenes/theFallScene';

// ---------------------------------------------------------
// Game configuration describing how Phaser should boot.
// ---------------------------------------------------------
const config: Phaser.Types.Core.GameConfig = {
  title: 'Chronicles of Eden',
  type: Phaser.AUTO, // Automatically choose WebGL or Canvas rendering.
  width: window.innerWidth,
  height: window.innerHeight,
  pixelArt: true, // Keep crisp pixels for retro-styled assets.
  parent: 'game-container',
  backgroundColor: '#000000',
  scene: [PreloadScene, EdenScene, TheFallScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

// ---------------------------------------------------------
// Instantiate the Phaser game with the configuration above.
// ---------------------------------------------------------
const game = new Phaser.Game(config);

// ---------------------------------------------------------
// Listen for browser resize events and update the game bounds
// to match the new window dimensions for a responsive canvas.
// ---------------------------------------------------------
const handleResize = () => {
  game.scale.resize(window.innerWidth, window.innerHeight);
};

window.addEventListener('resize', handleResize);

// ---------------------------------------------------------
// Launch the initial scene once the game is ready. The
// PreloadScene will handle asset loading before other scenes.
// ---------------------------------------------------------
window.addEventListener('load', () => {
  game.scene.start('PreloadScene');
});

export default game;
