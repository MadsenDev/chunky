# Chunky

Chunky is a small browser voxel sandbox experiment built with TypeScript, Vite, and Babylon.js.

## Goals

- Procedural chunk terrain
- One optimized mesh per chunk instead of one mesh per block
- Typed-array block storage
- Browser-first iteration
- Isolated modules that are easy for AI agents to extend

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Current architecture

```text
src/
  main.ts
  engine/
    scene.ts
    camera.ts
    input.ts
  world/
    World.ts
    Chunk.ts
    ChunkManager.ts
    TerrainGenerator.ts
    Mesher.ts
    BlockRegistry.ts
  workers/
    chunkWorker.ts
  storage/
    SaveManager.ts
  player/
    PlayerController.ts
```

The current implementation renders a 3×3 group of 16×16×16 chunks generated from a simple heightmap. Blocks are stored in `Uint16Array` chunk buffers and converted into visible-face chunk meshes for Babylon.js.
