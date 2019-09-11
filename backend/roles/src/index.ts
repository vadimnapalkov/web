import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Role } from './entities'
import { RolesService } from './services'

export * from './enums'
export * from './entities'
export * from './services'

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RolesService],
  exports: [TypeOrmModule.forFeature([Role]), RolesService],
})
export class RolesModule {}
