export const BlockId = {
  Air: 0,
  Grass: 1,
  Dirt: 2,
  Stone: 3,
  Wood: 4,
} as const;

export type BlockId = (typeof BlockId)[keyof typeof BlockId];

export type BlockDefinition = {
  id: BlockId;
  name: string;
  solid: boolean;
  color: [number, number, number];
};

const blocks = new Map<BlockId, BlockDefinition>([
  [BlockId.Air, { id: BlockId.Air, name: 'Air', solid: false, color: [0, 0, 0] }],
  [BlockId.Grass, { id: BlockId.Grass, name: 'Grass', solid: true, color: [0.27, 0.62, 0.2] }],
  [BlockId.Dirt, { id: BlockId.Dirt, name: 'Dirt', solid: true, color: [0.45, 0.28, 0.14] }],
  [BlockId.Stone, { id: BlockId.Stone, name: 'Stone', solid: true, color: [0.42, 0.42, 0.42] }],
  [BlockId.Wood, { id: BlockId.Wood, name: 'Wood', solid: true, color: [0.55, 0.33, 0.16] }],
]);

export class BlockRegistry {
  static get(id: BlockId): BlockDefinition {
    const block = blocks.get(id);
    if (!block) {
      throw new Error(`Unknown block id: ${id}`);
    }
    return block;
  }

  static isSolid(id: BlockId): boolean {
    return this.get(id).solid;
  }
}
