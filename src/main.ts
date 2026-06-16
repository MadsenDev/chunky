import './style.css';
import { createGame } from './engine/scene';

const canvas = document.querySelector<HTMLCanvasElement>('#game');
if (!canvas) {
  throw new Error('Missing #game canvas');
}

createGame(canvas);
