import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { MailerService } from '@nest-modules/mailer'
import { MAIL_FROM } from '@backend/gateway'

import { WelcomeUserCommand } from '../impl'

@CommandHandler(WelcomeUserCommand)
export class WelcomeUserHandler implements ICommandHandler<WelcomeUserCommand> {
  constructor(private readonly mailerService: MailerService) {}

  async execute(command: WelcomeUserCommand) {
    const { email } = command

    await this.mailerService.sendMail({
      to: email, // sender address
      from: MAIL_FROM, // list of receivers
      subject: 'Test task mailer ✔', // Subject line
      text: 'welcome', // plaintext body
      html: '<b>welcome</b>', // HTML body content
    })
  }
}
