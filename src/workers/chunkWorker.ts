import { Chunk, ChunkPosition } from '../world/Chunk';
import { Mesher } from '../world/Mesher';
import { TerrainGenerator } from '../world/TerrainGenerator';

export type ChunkWorkerRequest = { position: ChunkPosition };

self.onmessage = (event: MessageEvent<ChunkWorkerRequest>) => {
  const chunk = new TerrainGenerator().generate(new Chunk(event.data.position));
  const mesh = Mesher.build(chunk);
  self.postMessage({ position: event.data.position, mesh });
};
