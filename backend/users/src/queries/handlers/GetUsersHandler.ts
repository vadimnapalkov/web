import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { UserService } from '../../services'
import { GetUsersQuery } from '../impl'

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(private readonly userService: UserService) {}

  async execute() {
    const [rows, count] = await this.userService.findAll()
    return {
      rows,
      count,
    }
  }
}
