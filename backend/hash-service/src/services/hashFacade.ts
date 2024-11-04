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
}

export default new hashFacade();
