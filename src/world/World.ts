import { Scene } from '@babylonjs/core';
import { ChunkManager } from './ChunkManager';

export class World {
  readonly chunks: ChunkManager;

  constructor(scene: Scene) {
    this.chunks = new ChunkManager(scene);
  }

  start(): void {
    this.chunks.loadInitialWorld(1);
  }
}
