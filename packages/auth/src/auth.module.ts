import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { User } from '@au/entities'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RedisModule } from 'nestjs-redis'
import { ConfigModule, ConfigService } from '@au/config'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        url: config.get('REDIS_URL'),
      }),
    }),
    // JwtModule.register({
    //   secret: 'hard!to-guess_secret',
    //   signOptions: { expiresIn: 7200000 },
    // }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
