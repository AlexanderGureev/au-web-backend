import { NestFactory } from '@nestjs/core'
import { ApplicationModule } from './app'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    ApplicationModule,
  )

  app.useStaticAssets(join(__dirname, '..', 'public'))
  await app.listen(process.env.PORT || 3000)
}

bootstrap()
