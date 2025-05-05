import { ConfigService } from "@nestjs/config";
import { MongooseModuleAsyncOptions } from "@nestjs/mongoose";

export const MongooseConnectionOptions: MongooseModuleAsyncOptions = {
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get<string>('MONGO_DB_URL'),
    }),
  }