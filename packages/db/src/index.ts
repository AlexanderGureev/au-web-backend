import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@au/config'
import { TypeOrmModule } from '@nestjs/typeorm'

export * from './entity'
export * from './repository'

import { Entities } from './entity'
import { Migrations } from './migrations'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get('DATABASE_URL'),
        entities: [...Entities],
        migrations: [...Migrations],
        migrationsRun: true,
        synchronize: true,
        logging: false,
      }),
    }),
  ],
})
export class DatabaseModule {}
