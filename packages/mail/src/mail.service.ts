import { Injectable } from '@nestjs/common'
import { MailerService } from '@nest-modules/mailer'

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendMail(email) {
    try {
      await this.mailerService.sendMail({
        to: email, // sender address
        from: 'websender000@gmail.com', // list of receivers
        subject: 'Successful registration ✔', // Subject line
        text: 'Welcome to the test application.', // plaintext body
        html: '<b>Welcome to the test application.</b>', // HTML body content
      })
    } catch (error) {
      console.log(error)
    }
  }
}
