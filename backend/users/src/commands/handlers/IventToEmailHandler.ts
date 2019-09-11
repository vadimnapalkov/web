import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { MailerService } from '@nest-modules/mailer'
import { MAIL_FROM } from '@backend/gateway'

import { IventToEmailCommand } from '../impl'

@CommandHandler(IventToEmailCommand)
export class IventToEmailHandler implements ICommandHandler<IventToEmailCommand> {
  constructor(private readonly mailerService: MailerService) {}

  async execute(command: IventToEmailCommand) {
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
