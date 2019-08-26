import { Module, Global } from '@nestjs/common'
import { ConfigService } from './config.service'
import { join } from 'path'

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(
        join(
          __dirname,
          '..',
          'files',
          `${process.env.NODE_ENV || 'development'}.env`,
        ),
      ),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
