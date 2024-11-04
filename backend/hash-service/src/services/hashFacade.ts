import { Hash } from "../entity/hash-entity";
import { HashDataSource } from "../config/data-source";
import { v4 as uuidv4 } from "uuid";

class hashFacade {
  private hashRepository = HashDataSource.getRepository(Hash);

  async createHash(pasteId: number): Promise<string> {
    let unique = false;
    let newHash = "";

    while (!unique) {
      newHash = Buffer.from(uuidv4()).toString("base64").substring(0, 8);
      const existingHash = await this.hashRepository.findOne({ where: { hash: newHash } });
      if (!existingHash) {
        unique = true;
      }
    }

    const hashEntry = new Hash();
    hashEntry.hash = newHash;
    hashEntry.pasteId = pasteId;
    await this.hashRepository.save(hashEntry);

    return newHash;
  }

  async deleteHash(pasteId: number): Promise<string> {
    const hashToDelete = await this.hashRepository.findOne({ where: { pasteId } });
    if (!hashToDelete) {
      throw new Error(`Hash with paste ID ${pasteId} not found.`);
    }
    await this.hashRepository.delete(hashToDelete.id);
    return `Hash with paste ID ${pasteId} deleted successfully.`;
  }

  async getHash(pasteId: number): Promise<string> {
    const foundHash = await this.hashRepository.findOne({ where: { pasteId } });
    if (!foundHash) {
      throw new Error("Hash not found.");
    }
    return foundHash.hash;
  }

  async getPasteId(hash: string): Promise<number> {
    const foundHash = await this.hashRepository.findOne({ where: { hash } });
    if (!foundHash) {
      throw new Error("Hash not found.");
    }
    return foundHash.pasteId;
  }
}

export default new hashFacade();
