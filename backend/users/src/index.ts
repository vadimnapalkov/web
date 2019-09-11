import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CqrsModule } from '@nestjs/cqrs'
import { RolesModule } from '@backend/roles'

import { User, Profile } from './entities'
import { Resolvers } from './resolvers'
import { CommandHandlers } from './commands/handlers'
import { UserRegisteredEvent } from './events/impl'
import { UserService } from './services'
import { UserSagas } from './sagas'

export * from './services'

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile]), CqrsModule, RolesModule],
  providers: [UserService, ...Resolvers, ...CommandHandlers, UserRegisteredEvent, UserSagas],
  exports: [UserService],
})
export class UsersModule {}
