import { Module } from '@nestjs/common'
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer'
import { MailService } from './mail.service'
import { ConfigService, ConfigModule } from '@au/config'

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: config.get('MAIL_URL'),
        defaults: {
          from: 'Test app "WEB"',
        },
        template: {
          dir: __dirname + '/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
