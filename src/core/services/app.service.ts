import yenv from 'yenv';

export interface IDbConfig {
  host: string;
  port: number;
  entities: string[];
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
}

export interface IDBRedisConfig {
  host: string;
  port: number;
  password: string;
  maxRetriesPerRequest: number;
}

export class AppService {
  private static readonly env = yenv();

  static get PORT(): number {
    return this.env.PORT;
  }

  static get DB_CONFIG(): IDbConfig {
    console.log('sync', this.env.DB_SYNC);
    return {
      host: this.env.DB_HOST,
      port: this.env.DB_PORT,
      entities: [this.env.DB_ENTITIES],
      username: this.env.DB_USER,
      password: '' + this.env.DB_PASS,
      database: this.env.DB_NAME,
      synchronize: this.env.DB_SYNC,
      logging: this.env.DB_LOGG,
    };
  }

  static get DB_REDIS_CONFIG(): IDBRedisConfig {
    return {
      host: this.env.REDIS_HOST,
      port: this.env.REDIS_PORT,
      password: '' + this.env.REDIS_PASS,
      maxRetriesPerRequest: this.env.REDIS_MAX_RETRIES_PER_REQUEST,
    };
  }
}
