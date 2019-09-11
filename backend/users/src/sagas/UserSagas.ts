import { Saga, ICommand, ofType } from '@nestjs/cqrs'
import { Observable } from 'rxjs'
import { Injectable } from '@nestjs/common'
import { delay, map } from 'rxjs/operators'

import { UserRegisteredEvent } from '../events/impl'
import { IventToEmailCommand } from '../commands/impl'

@Injectable()
export class UserSagas {
  @Saga()
  userRegistered = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserRegisteredEvent),
      delay(3000),
      map(event => new IventToEmailCommand(event.email)),
    )
  }
}
