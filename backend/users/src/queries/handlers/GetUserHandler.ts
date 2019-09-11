import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { UserService } from '../../services'
import { GetUserQuery } from '../impl'

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly userService: UserService) {}

  execute({ id }: GetUserQuery) {
    return this.userService.findById(id)
  }
}
