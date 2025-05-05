import { ConfigService } from "@nestjs/config";
import { MongooseModuleAsyncOptions } from "@nestjs/mongoose";
import { CacheModuleAsyncOptions } from '@nestjs/cache-manager'
import { redisStore } from 'cache-manager-redis-store'
import Redis from 'ioredis'

export const MongooseConnectionOptions: MongooseModuleAsyncOptions = {
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get<string>('MONGO_DB_URL'),
    }),
  }

  export const RedisOptions: CacheModuleAsyncOptions = {
    isGlobal: true,
    useFactory: async (configService: ConfigService) => {
   
      const store = await redisStore({
        host: configService.get<string>('REDIS_HOST', 'localhost'), 
        port: parseInt(configService.get<string>('REDIS_PORT', '6379')), 
        password: null, 
      });
  
      return {
        store: () => store,
      };
    },
    inject: [ConfigService],
  };