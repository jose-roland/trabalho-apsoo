import {
  Repository,
  EntityTarget,
  FindManyOptions,
  FindOneOptions,
  ObjectLiteral,
  DeepPartial,
} from "typeorm";
import { AppDataSource } from "../datasource.ts";

export class BaseRepository<T extends ObjectLiteral> {
  protected repository: Repository<T>;

  constructor(entity: EntityTarget<T>) {
    this.repository = AppDataSource.getRepository<T>(entity);
  }

  async save(data: Partial<T>): Promise<T> {
    // Garante que o argumento não é array
    if (Array.isArray(data)) {
      throw new Error("save() só aceita um único objeto.");
    }
    return await this.repository.save(data as DeepPartial<T>);
  }

  async remove(data: Partial<T>): Promise<void> {
    await this.repository.remove(data as T);
  }

  async findById(
    id: number | string,
    options?: Omit<FindOneOptions<T>, "where">
  ): Promise<T | null> {
    return await this.repository.findOne({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      where: { id } as any,
      ...options,
    });
  }

  async list(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.repository.find(options);
  }
}
