import { FreeCamera } from '@babylonjs/core';
import { InputState } from '../engine/input';

export class PlayerController {
  constructor(
    private readonly camera: FreeCamera,
    private readonly input: InputState,
  ) {}

  update(): void {
    if (this.input.isPressed('Space')) this.camera.position.y += 0.2;
    if (this.input.isPressed('ShiftLeft')) this.camera.position.y -= 0.2;
  }
}
