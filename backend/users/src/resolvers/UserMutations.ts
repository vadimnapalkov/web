import { Args, Mutation } from '@nestjs/graphql'
import { CommandBus } from '@nestjs/cqrs'
import { Injectable } from '@nestjs/common'
import { ResourceAccess, CurrentUser } from '@backend/common'
import { ActionType, PossessionType } from '@backend/roles'

import { RegisterUserCommand, LoginUserCommand, UpdateProfileCommand } from '../commands/impl'
import { TokenData } from '../interfaces'
import { RegisterUserDto, UpdateProfileDto, LoginUserDto } from '../dto'

@Injectable()
export class UserMutations {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation('register')
  async register(@Args('input') { email, password, firstName, lastName }: RegisterUserDto) {
    return this.commandBus.execute(new RegisterUserCommand(email, password, firstName, lastName))
  }

  @Mutation('login')
  async login(@Args('input') { email, password }: LoginUserDto) {
    return this.commandBus.execute(new LoginUserCommand(email, password))
  }

  @ResourceAccess('profile', ActionType.update, PossessionType.own)
  @Mutation('updateProfile')
  async updateProfile(@CurrentUser() { id }: TokenData, @Args('input') { firstName, lastName }: UpdateProfileDto) {
    return this.commandBus.execute(new UpdateProfileCommand(id, firstName, lastName))
  }
}
