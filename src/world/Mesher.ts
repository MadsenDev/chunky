import { Color4, Mesh, MeshBuilder, Scene, StandardMaterial, VertexData } from '@babylonjs/core';
import { BlockRegistry } from './BlockRegistry';
import { CHUNK_SIZE, Chunk } from './Chunk';

export type ChunkMeshData = {
  positions: number[];
  indices: number[];
  colors: number[];
};

type Face = {
  normal: [number, number, number];
  corners: [number, number, number][];
};

const faces: Face[] = [
  { normal: [1, 0, 0], corners: [[1, 0, 0], [1, 1, 0], [1, 1, 1], [1, 0, 1]] },
  { normal: [-1, 0, 0], corners: [[0, 0, 1], [0, 1, 1], [0, 1, 0], [0, 0, 0]] },
  { normal: [0, 1, 0], corners: [[0, 1, 1], [1, 1, 1], [1, 1, 0], [0, 1, 0]] },
  { normal: [0, -1, 0], corners: [[0, 0, 0], [1, 0, 0], [1, 0, 1], [0, 0, 1]] },
  { normal: [0, 0, 1], corners: [[1, 0, 1], [1, 1, 1], [0, 1, 1], [0, 0, 1]] },
  { normal: [0, 0, -1], corners: [[0, 0, 0], [0, 1, 0], [1, 1, 0], [1, 0, 0]] },
];

export class Mesher {
  static build(chunk: Chunk): ChunkMeshData {
    const data: ChunkMeshData = { positions: [], indices: [], colors: [] };

    for (let y = 0; y < CHUNK_SIZE; y += 1) {
      for (let z = 0; z < CHUNK_SIZE; z += 1) {
        for (let x = 0; x < CHUNK_SIZE; x += 1) {
          const block = chunk.getBlock(x, y, z);
          if (!BlockRegistry.isSolid(block)) continue;

          for (const face of faces) {
            const neighbor = chunk.getBlock(x + face.normal[0], y + face.normal[1], z + face.normal[2]);
            if (BlockRegistry.isSolid(neighbor)) continue;
            this.pushFace(data, chunk, x, y, z, face, BlockRegistry.get(block).color);
          }
        }
      }
    }

    return data;
  }

  static createBabylonMesh(scene: Scene, name: string, data: ChunkMeshData): Mesh {
    const mesh = new Mesh(name, scene);
    const vertexData = new VertexData();
    vertexData.positions = data.positions;
    vertexData.indices = data.indices;
    vertexData.colors = data.colors;
    vertexData.applyToMesh(mesh);

    const material = new StandardMaterial(`${name}-material`, scene);
    material.diffuseColor.set(1, 1, 1);
    material.specularColor.set(0, 0, 0);
    mesh.material = material;
    return mesh;
  }

  static createFallbackMesh(scene: Scene): Mesh {
    return MeshBuilder.CreateBox('empty-chunk-placeholder', { size: 0.01 }, scene);
  }

  private static pushFace(data: ChunkMeshData, chunk: Chunk, x: number, y: number, z: number, face: Face, color: [number, number, number]): void {
    const vertexOffset = data.positions.length / 3;
    for (const corner of face.corners) {
      data.positions.push(chunk.worldX(x) + corner[0], chunk.worldY(y) + corner[1], chunk.worldZ(z) + corner[2]);
      data.colors.push(...new Color4(color[0], color[1], color[2], 1).asArray());
    }
    data.indices.push(vertexOffset, vertexOffset + 1, vertexOffset + 2, vertexOffset, vertexOffset + 2, vertexOffset + 3);
  }
}
