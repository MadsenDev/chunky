import { Color3, Engine, HemisphericLight, Scene, Vector3 } from '@babylonjs/core';
import { createCamera } from './camera';
import { InputState } from './input';
import { PlayerController } from '../player/PlayerController';
import { World } from '../world/World';

export function createGame(canvas: HTMLCanvasElement): { engine: Engine; scene: Scene } {
  const engine = new Engine(canvas, true);
  const scene = new Scene(engine);
  scene.clearColor.set(0.53, 0.81, 0.92, 1);

  const camera = createCamera(scene, canvas);
  const input = new InputState();
  input.attach();
  const player = new PlayerController(camera, input);

  const light = new HemisphericLight('sun', new Vector3(0.4, 1, 0.3), scene);
  light.diffuse = new Color3(1, 0.96, 0.84);
  light.groundColor = new Color3(0.35, 0.32, 0.3);

  new World(scene).start();
  scene.onBeforeRenderObservable.add(() => player.update());
  engine.runRenderLoop(() => scene.render());
  window.addEventListener('resize', () => engine.resize());

  return { engine, scene };
}
