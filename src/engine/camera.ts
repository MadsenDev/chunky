import { FreeCamera, Scene, Vector3 } from '@babylonjs/core';

export function createCamera(scene: Scene, canvas: HTMLCanvasElement): FreeCamera {
  const camera = new FreeCamera('player-camera', new Vector3(8, 24, -28), scene);
  camera.setTarget(new Vector3(8, 8, 8));
  camera.attachControl(canvas, true);
  camera.speed = 0.55;
  camera.angularSensibility = 2500;
  camera.keysUp.push(87);
  camera.keysDown.push(83);
  camera.keysLeft.push(65);
  camera.keysRight.push(68);
  return camera;
}
