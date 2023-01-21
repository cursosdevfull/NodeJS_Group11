import IORedis from 'ioredis';
import yenv from 'yenv';

import { AppService, IDBRedisConfig } from '../core/services/app.service';
import IBootstrap from './bootstrap.interface';

const env = yenv();

export default class RedisBootstrap implements IBootstrap {
  private static client: IORedis;

  initialize(): Promise<any> {
    return new Promise((resolve, reject) => {
      const dbConfig: IDBRedisConfig = AppService.DB_REDIS_CONFIG;
      const client = new IORedis(dbConfig);

      client
        .on('connect', () => {
          console.log('Redis client connected');
          resolve(true);
        })
        .on('error', (error: Error) => {
          console.log('Redis client error', error);
          reject(error);
        });

      RedisBootstrap.client = client;
    });
  }

  close(): void {
    if (!RedisBootstrap.client) return;
    RedisBootstrap.client.disconnect();
  }

  static get connection(): IORedis {
    return this.client;
  }

  static async set(key: string, value: string, ttlInMiliseconds?: number) {
    const redisTtl = ttlInMiliseconds ?? env.REDIS_TTL_HOURS * 60 * 60 * 1000;
    await this.client.set(key, value, 'PX', redisTtl);
  }

  static async clear(prefix: string = '') {
    const keys = await this.client.keys(`${prefix}*`);
    if (keys.length > 0) {
      await this.client.del(keys);
    }
  }
}
