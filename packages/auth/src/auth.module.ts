import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RedisModule } from 'nestjs-redis'
import { ConfigModule, ConfigService } from '@au/config'

@Module({
  imports: [
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        url: config.get('REDIS_URL'),
      }),
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
