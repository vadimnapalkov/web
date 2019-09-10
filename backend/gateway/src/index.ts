import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'

import { ApplicationModule } from './app'

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule)

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(process.env.PORT || 3000)
}

bootstrap()

export * from './config'
