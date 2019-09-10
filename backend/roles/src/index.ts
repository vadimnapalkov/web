import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role } from './entities'

export * from './enums'
export * from './entities'

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  exports: [TypeOrmModule.forFeature([Role])],
})
export class RolesModule {}
