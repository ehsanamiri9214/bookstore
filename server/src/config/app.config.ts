import { registerAs } from '@nestjs/config';

export default registerAs('APP', () => ({
  APP_ENV: process.env.APP_ENV,
  APP_HTTP_PORT: +process.env.APP_HTTP_PORT,
  APP_HTTPS_PORT: +process.env.APP_HTTPS_PORT,
}));
