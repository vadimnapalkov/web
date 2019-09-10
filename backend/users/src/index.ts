import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User, Profile } from './entities'
import { CqrsModule } from '@nestjs/cqrs'
import { Resolvers } from './resolvers'
import { CommandHandlers } from './commands/handlers'
import { UserService } from './services'
import { RolesModule } from '@backend/roles'

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile]), CqrsModule, RolesModule],
  providers: [UserService, ...Resolvers, ...CommandHandlers],
})
export class UsersModule {}
