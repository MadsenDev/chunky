import { BlockId } from './BlockRegistry';

export const CHUNK_SIZE = 16;
export const CHUNK_VOLUME = CHUNK_SIZE * CHUNK_SIZE * CHUNK_SIZE;

export type ChunkPosition = Readonly<{ x: number; y: number; z: number }>;

export class Chunk {
  readonly blocks = new Uint16Array(CHUNK_VOLUME);
  dirty = true;

  constructor(readonly position: ChunkPosition) {}

  getBlock(x: number, y: number, z: number): BlockId {
    if (!this.inBounds(x, y, z)) return BlockId.Air;
    return this.blocks[this.index(x, y, z)] as BlockId;
  }

  setBlock(x: number, y: number, z: number, block: BlockId): void {
    if (!this.inBounds(x, y, z)) return;
    this.blocks[this.index(x, y, z)] = block;
    this.dirty = true;
  }

  worldX(localX: number): number {
    return this.position.x * CHUNK_SIZE + localX;
  }

  worldY(localY: number): number {
    return this.position.y * CHUNK_SIZE + localY;
  }

  worldZ(localZ: number): number {
    return this.position.z * CHUNK_SIZE + localZ;
  }

  private inBounds(x: number, y: number, z: number): boolean {
    return x >= 0 && x < CHUNK_SIZE && y >= 0 && y < CHUNK_SIZE && z >= 0 && z < CHUNK_SIZE;
  }

  private index(x: number, y: number, z: number): number {
    return x + CHUNK_SIZE * (z + CHUNK_SIZE * y);
  }
}

export function chunkKey(position: ChunkPosition): string {
  return `${position.x},${position.y},${position.z}`;
}
