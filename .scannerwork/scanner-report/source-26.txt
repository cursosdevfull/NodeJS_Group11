import { NextFunction, Request, Response } from 'express';

import RedisBootstrap from '../../../bootstrap/RedisBootstrap';

export class CacheMiddleware {
  setParameters(key: string, params: Record<string, any>) {
    if (params) {
      for (let i in params) {
        key += `-${i}:${params[i]}`;
      }
    }
    return key;
  }

  build(key: string) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      let cacheKey = key;
      cacheKey = this.setParameters(cacheKey, req.query);
      cacheKey = this.setParameters(cacheKey, req.params);
      cacheKey = this.setParameters(cacheKey, req.body);

      const client = RedisBootstrap.connection;
      const value = await client.get(cacheKey);

      console.log('key', cacheKey);

      if (value) {
        console.log('Cache hit');
        res.send(JSON.parse(value));
      } else {
        console.log('Cache miss');
        res.locals.cacheKey = cacheKey;
        next();
      }
    };
  }
}
