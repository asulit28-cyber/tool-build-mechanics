import { setupCanvas } from './src/canvas/setupCanvas.js';
import { startLoop } from './src/canvas/loop.js';
import { createInput } from './src/input/input.js';

const canvas = document.querySelector('#studio-canvas');
const context = setupCanvas(canvas);
const input = createInput(canvas);

startLoop(context, input);
