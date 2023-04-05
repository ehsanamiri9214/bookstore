import { InsertResult, Repository } from 'typeorm';

export abstract class BaseService<T> {
  private readonly repo: Repository<T>;

  constructor(repo: Repository<T>) {
    this.repo = repo;
  }

  create(createDto: any): Promise<T | T[]> {
    return this.repo.save(createDto);
  }

  upsert(createDto: any, conflictItems: string[]): Promise<InsertResult> {
    return this.repo.upsert(createDto, conflictItems);
  }

  bulkInsert(createDto: any[]) {
    return this.repo.createQueryBuilder().insert().values(createDto).execute();
  }

  find(options: object, relations?: string[]): Promise<T> {
    return this.repo.findOne({ where: { ...options }, relations });
  }

  findMany(options: object, skip = 0, take = 1) {
    return this.repo.find({ where: { ...options }, skip, take });
  }

  findManyByOrder(
    alias: string,
    options: object,
    skip = 0,
    take = 1,
    order = 'ASC',
  ) {
    return this.repo
      .createQueryBuilder(alias)
      .select()
      .where({ ...options })
      .orderBy(order)
      .skip(skip)
      .take(take)
      .getMany();
  }

  findAll(options: object, relations?: string[]) {
    return this.repo.find({ where: { ...options }, relations });
  }

  update(condition: object, updateDto: any) {
    return this.repo.update(condition, updateDto);
  }

  delete(condition: object, soft = true) {
    return soft ? this.repo.softDelete(condition) : this.repo.delete(condition);
  }

  async clear() {
    const entities = await this.findMany(null, null, 10000);
    return this.repo.remove(entities);
  }

  count(options?: object) {
    return this.repo.count({ where: { ...options } });
  }
}
