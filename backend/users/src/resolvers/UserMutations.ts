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
    try {
      const accessToken = await this.commandBus.execute(new RegisterUserCommand(email, password, firstName, lastName))
      return { success: true, access_token: accessToken }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  @Mutation('login')
  async login(@Args('input') { email, password }: LoginUserDto) {
    try {
      const accessToken = await this.commandBus.execute(new LoginUserCommand(email, password))
      return { success: true, access_token: accessToken }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  @ResourceAccess('profile', ActionType.update, PossessionType.own)
  @Mutation('updateProfile')
  async updateProfile(@CurrentUser() { id }: TokenData, @Args('input') { firstName, lastName }: UpdateProfileDto) {
    try {
      await this.commandBus.execute(new UpdateProfileCommand(id, firstName, lastName))
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }
}
