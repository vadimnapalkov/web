import { Query, Args } from '@nestjs/graphql'
import { Injectable } from '@nestjs/common'
import { AuthAccess, ResourceAccess, CurrentUser } from '@backend/common'
import { ActionType, PossessionType } from '@backend/roles'

import { UserService } from '../services'
import { TokenData } from '../interfaces'

@Injectable()
export class UserQueries {
  constructor(private readonly userService: UserService) {}

  @AuthAccess()
  @Query()
  me(@CurrentUser() user: TokenData) {
    return this.userService.findById(user.id)
  }

  @ResourceAccess('profile', ActionType.read, PossessionType.any)
  @Query()
  user(@Args('id') id: number) {
    return this.userService.findById(id)
  }

  @ResourceAccess('profile', ActionType.read, PossessionType.any)
  @Query()
  async users() {
    const [rows, count] = await this.userService.findAll()
    return {
      rows,
      count,
    }
  }
}
