import Phaser from 'phaser';

import PreloadScene from './scenes/preloadScene';
import EdenScene from './scenes/edenScene';
import TheFallScene from './scenes/theFallScene';

// Configure the core Phaser game settings for Chronicles of Eden.
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO, // Automatically choose WebGL or Canvas depending on support.
  width: window.innerWidth,
  height: window.innerHeight,
  pixelArt: true, // Ensure sprite graphics retain crisp pixel edges when scaled.
  scene: [PreloadScene, EdenScene, TheFallScene], // Register all scenes, starting with the preload flow.
};

// Instantiate the Phaser game using the configuration above.
const game = new Phaser.Game(config);

// Listen for browser resize events to keep the game matched to the viewport.
const handleResize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  game.scale.resize(width, height);
  game.canvas.style.width = `${width}px`;
  game.canvas.style.height = `${height}px`;
};

window.addEventListener('resize', handleResize);

// Kick off the responsive sizing immediately so the canvas matches the initial layout.
handleResize();

export default game;
