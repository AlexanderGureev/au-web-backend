import {
  NestModule,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from 'graphql-iso-date'
import cookieParser from 'cookie-parser'
import { join } from 'path'

import { UsersModule } from '@au/users'
import { AuthMiddleware } from '@au/middleware'
import { RolesModule } from '@au/roles'
import { FilesModule } from '@au/files'
import { ConfigModule, ConfigService } from '@au/config'
import { AuthModule } from '@au/auth'

const root = join(__dirname, '..', '..')

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get('DATABASE_URL'),
        entities: [root + '/entities/**/*.js'],
        migrations: [root + '/**/migrations/**.js'],
        migrationsRun: true,
        synchronize: true,
        logging: false,
      }),
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        path: '/graphql',
        typePaths: [root + '/**/*.graphql'],
        installSubscriptionHandlers: false,
        resolvers: {
          Date: GraphQLDate,
          Time: GraphQLTime,
          DateTime: GraphQLDateTime,
        },
        rootValue: ({ req }) => req,
        formatError: error => {
          return error
        },
        introspection: true,
        cors: {
          credentials: true,
          origin: [config.get('CLIENT_URL')],
        },
        playground: {
          settings: {
            'request.credentials': 'include',
          },
        },
        uploads: {
          maxFileSize: 10000000, // 10 MB
          maxFiles: 5,
        },
        context: ({ req, res }) => ({ req, res }),
      }),
    }),
    ConfigModule,
    FilesModule,
    UsersModule,
    RolesModule,
    AuthModule,
  ],
})
export class ApplicationModule implements NestModule {
  constructor(private readonly config: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cookieParser(this.config.get('COOKIE_SECRET')), AuthMiddleware)
      .forRoutes({ path: '/graphql', method: RequestMethod.ALL })
  }
}
