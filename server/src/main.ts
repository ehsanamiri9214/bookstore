import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { IAppConfig } from 'src/interfaces';
import { AppModule } from 'src/modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const appConfig = configService.get<IAppConfig>('APP');
  const port = appConfig.APP_HTTP_PORT;
  const appEnv = appConfig.APP_ENV.toLowerCase();
  const isDev = appEnv === 'dev';

  app.enableCors({
    origin: isDev
      ? // ? ['http://localhost:3000', 'http://192.168.1.102:3000']
        '*'
      : null,
  });

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, stopAtFirstError: true }),
  );
  app.setGlobalPrefix('api/v1');

  await app.listen(port);
  console.log(`Port: ${port}`);
  console.log(`Env: ${appEnv}`);
}

bootstrap();
