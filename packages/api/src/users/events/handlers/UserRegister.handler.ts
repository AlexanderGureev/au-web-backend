import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { UserRegisterEvent } from '../impl'
import { MailService } from '@au/mail'

@EventsHandler(UserRegisterEvent)
export class UserRegisterHandler implements IEventHandler<UserRegisterEvent> {
  constructor(private readonly mailService: MailService) {}

  handle(event: UserRegisterEvent) {
    this.mailService.sendMail(event.email)
  }
}
