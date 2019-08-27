import {
  NestModule,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from 'graphql-iso-date'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import { join } from 'path'

import { AuthMiddleware } from '@au/common'
import { FilesModule } from '@au/files'
import { ConfigModule, ConfigService } from '@au/config'
import { AuthModule } from '@au/auth'
import { UsersModule } from '@au/api'
import { DatabaseModule } from '@au/db'

const root = join(__dirname, '..', '..')

@Module({
  imports: [
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
    DatabaseModule,
    ConfigModule,
    FilesModule,
    UsersModule,
    AuthModule,
  ],
})
export class ApplicationModule implements NestModule {
  constructor(private readonly config: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        compression(),
        cookieParser(this.config.get('COOKIE_SECRET')),
        AuthMiddleware,
      )
      .forRoutes({ path: '/graphql', method: RequestMethod.ALL })
  }
}
