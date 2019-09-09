import { Args, Mutation } from '@nestjs/graphql'
import { RegisterUserDto, UpdateProfileDto, LoginUserDto } from '../dto'
import { CommandBus } from '@nestjs/cqrs'
import { RegisterUserCommand, LoginUserCommand } from '../commands/impl'
import { Injectable } from '@nestjs/common'
import { ResourceAccess } from '@backend/common'
import { ActionType, PossessionType } from '@backend/roles'

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
  async updateProfile(@Args('input') input: UpdateProfileDto) {
    throw new Error('To be implemented UserMutations.updateProfile (ノಥ,_｣ಥ)ノ彡┻━┻')
  }
}
