import { Scene } from '@babylonjs/core';
import { chunkKey, Chunk, ChunkPosition } from './Chunk';
import { Mesher } from './Mesher';
import { TerrainGenerator } from './TerrainGenerator';

export class ChunkManager {
  private readonly chunks = new Map<string, Chunk>();
  private readonly generator = new TerrainGenerator();

  constructor(private readonly scene: Scene) {}

  loadInitialWorld(radius = 1): void {
    for (let x = -radius; x <= radius; x += 1) {
      for (let z = -radius; z <= radius; z += 1) {
        this.loadChunk({ x, y: 0, z });
      }
    }
  }

  loadChunk(position: ChunkPosition): Chunk {
    const key = chunkKey(position);
    const existing = this.chunks.get(key);
    if (existing) return existing;

    const chunk = this.generator.generate(new Chunk(position));
    this.chunks.set(key, chunk);
    const meshData = Mesher.build(chunk);
    const mesh = meshData.positions.length > 0 ? Mesher.createBabylonMesh(this.scene, `chunk-${key}`, meshData) : Mesher.createFallbackMesh(this.scene);
    mesh.metadata = { chunkKey: key };
    chunk.dirty = false;
    return chunk;
  }
}
