import { EntityManager, QueryRunner } from 'typeorm';

import { IUnitOfWork } from './uow.interface';

export class UnitOfWork implements IUnitOfWork {
  private readonly queryRunner: QueryRunner;
  private transactionManager: EntityManager;

  constructor(manager: EntityManager) {
    this.queryRunner = manager.connection.createQueryRunner();
  }

  async start() {
    await this.queryRunner.startTransaction();
    this.setTransaction();
  }
  async complete(work: () => Promise<void>): Promise<void> {
    try {
      await work();
      await this.queryRunner.commitTransaction();
    } catch (error) {
      await this.queryRunner.rollbackTransaction();
    } finally {
      await this.queryRunner.release();
    }
  }
  getManager(): EntityManager {
    if (
      !this.transactionManager ||
      !(this.transactionManager instanceof EntityManager)
    ) {
      throw new Error("Transaction not started");
    }

    return this.transactionManager;
  }

  private setTransaction() {
    this.transactionManager = this.queryRunner.manager;
  }
}
