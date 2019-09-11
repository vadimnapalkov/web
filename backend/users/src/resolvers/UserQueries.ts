import { Query, Args } from '@nestjs/graphql'
import { Injectable } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { AuthAccess, ResourceAccess, CurrentUser } from '@backend/common'
import { ActionType, PossessionType } from '@backend/roles'

import { GetUserQuery, GetUsersQuery } from '../queries/impl'
import { UserService } from '../services'
import { TokenData } from '../interfaces'

@Injectable()
export class UserQueries {
  constructor(private readonly userService: UserService, private readonly queryBus: QueryBus) {}

  @AuthAccess()
  @Query()
  me(@CurrentUser() user: TokenData) {
    return this.queryBus.execute(new GetUserQuery(user.id))
  }

  @ResourceAccess('profile', ActionType.read, PossessionType.any)
  @Query()
  user(@Args('id') id: number) {
    return this.queryBus.execute(new GetUserQuery(id))
  }

  @ResourceAccess('profile', ActionType.read, PossessionType.any)
  @Query()
  async users() {
    return this.queryBus.execute(new GetUsersQuery())
  }
}
