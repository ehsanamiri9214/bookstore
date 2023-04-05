import { registerAs } from '@nestjs/config';

export default registerAs('AUTH', () => ({
  AUTH_HEADER_PARAM: process.env.AUTH_HEADER_PARAM,
  AUTH_JWT_SECRET_KEY: process.env.AUTH_JWT_SECRET_KEY,
  AUTH_JWT_ACCESS_TOKEN_EXPIRE_TIME:
    process.env.AUTH_JWT_ACCESS_TOKEN_EXPIRE_TIME,
  AUTH_JWT_REFRESH_TOKEN_EXPIRE_TIME:
    process.env.AUTH_JWT_REFRESH_TOKEN_EXPIRE_TIME,
  KAVENEGAR_API_KEY: process.env.KAVENEGAR_API_KEY,
}));
