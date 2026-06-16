import { BlockId } from './BlockRegistry';
import { CHUNK_SIZE, Chunk } from './Chunk';

export class TerrainGenerator {
  generate(chunk: Chunk): Chunk {
    for (let x = 0; x < CHUNK_SIZE; x += 1) {
      for (let z = 0; z < CHUNK_SIZE; z += 1) {
        const wx = chunk.worldX(x);
        const wz = chunk.worldZ(z);
        const height = this.heightAt(wx, wz);

        for (let y = 0; y < CHUNK_SIZE; y += 1) {
          const wy = chunk.worldY(y);
          if (wy > height) continue;
          if (wy === height) chunk.setBlock(x, y, z, BlockId.Grass);
          else if (wy >= height - 3) chunk.setBlock(x, y, z, BlockId.Dirt);
          else chunk.setBlock(x, y, z, BlockId.Stone);
        }
      }
    }
    chunk.dirty = true;
    return chunk;
  }

  private heightAt(x: number, z: number): number {
    const rolling = Math.sin(x * 0.12) * 3 + Math.cos(z * 0.1) * 3;
    const detail = Math.sin((x + z) * 0.04) * 2;
    return Math.floor(10 + rolling + detail);
  }
}
