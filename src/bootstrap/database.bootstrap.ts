import { DataSource } from 'typeorm';

import { AppService, IDbConfig } from '../core/services/app.service';
import IBootstrap from './bootstrap.interface';

//let appDataSource: DataSource;

export default class DatabaseBootstrap implements IBootstrap {
  private static appDataSource: DataSource;

  initialize(): Promise<any> {
    const dbConfig: IDbConfig = AppService.DB_CONFIG;

    const AppDataSource = new DataSource({
      type: "mysql",
      ...dbConfig,
      migrations: [],
      subscribers: [],
    });

    DatabaseBootstrap.appDataSource = AppDataSource;

    return AppDataSource.initialize();
  }

  close(): void {
    DatabaseBootstrap.appDataSource?.destroy();
  }

  static get dataSource(): DataSource {
    return DatabaseBootstrap.appDataSource;
  }
}
