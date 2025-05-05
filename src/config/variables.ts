import * as dotenv from 'dotenv';

dotenv.config();

export default {
  DATABSE_URL:
    process.env.DATABASE_URL ||
    'mongodb://localhost:27017/predictorDB',
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION,
  NODE_ENV: process.env.NODE_ENV,
  BASE_URL: process.env.BASE_URL || 'http://localhost',
 
};
