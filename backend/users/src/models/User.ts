import { AggregateRoot } from '@nestjs/cqrs'
import { UserRegisteredEvent } from '../events/impl'

export class User extends AggregateRoot {
  constructor(private readonly email: string) {
    super()
  }

  registered() {
    this.apply(new UserRegisteredEvent(this.email))
  }
}
