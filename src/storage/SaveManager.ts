import { Chunk, chunkKey, ChunkPosition } from '../world/Chunk';

const DB_NAME = 'chunky-world';
const STORE_NAME = 'chunks';

export class SaveManager {
  private dbPromise?: Promise<IDBDatabase>;

  async saveChunk(chunk: Chunk): Promise<void> {
    const db = await this.db();
    await this.transaction(db, 'readwrite', (store) => {
      store.put(chunk.blocks, chunkKey(chunk.position));
    });
  }

  async loadChunk(position: ChunkPosition): Promise<Uint16Array | undefined> {
    const db = await this.db();
    return this.transaction<Uint16Array | undefined>(db, 'readonly', (store, resolve, reject) => {
      const request = store.get(chunkKey(position));
      request.onsuccess = () => resolve(request.result as Uint16Array | undefined);
      request.onerror = () => reject(request.error);
    });
  }

  private db(): Promise<IDBDatabase> {
    this.dbPromise ??= new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = () => request.result.createObjectStore(STORE_NAME);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    return this.dbPromise;
  }

  private transaction<T = void>(
    db: IDBDatabase,
    mode: IDBTransactionMode,
    work: (store: IDBObjectStore, resolve: (value: T) => void, reject: (reason?: unknown) => void) => void,
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, mode);
      const store = tx.objectStore(STORE_NAME);
      tx.oncomplete = () => resolve(undefined as T);
      tx.onerror = () => reject(tx.error);
      work(store, resolve, reject);
    });
  }
}
