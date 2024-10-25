import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { JwtGuard } from './auth/guards/jwt.guard';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalGuards(new JwtGuard(app.get(Reflector)));
  await app.listen(3000);
}
bootstrap();
