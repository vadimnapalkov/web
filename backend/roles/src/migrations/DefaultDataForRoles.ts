import { MigrationInterface, QueryRunner } from 'typeorm'
import { plainToClass } from 'class-transformer'

import { RoleType, ActionType, PossessionType } from '../enums'
import { Role } from '../entities'

export class DefaultDataForRoles1514404694792 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const permissionsForUser = [
      { resource: 'profile', possession: PossessionType.own, action: ActionType.create },
      { resource: 'profile', possession: PossessionType.own, action: ActionType.read },
      { resource: 'profile', possession: PossessionType.own, action: ActionType.update },
      { resource: 'profile', possession: PossessionType.own, action: ActionType.delete },
    ]

    const permissionsForSupport = [
      { resource: 'profile', possession: PossessionType.any, action: ActionType.create },
      { resource: 'profile', possession: PossessionType.any, action: ActionType.read },
      { resource: 'profile', possession: PossessionType.any, action: ActionType.update },
      { resource: 'profile', possession: PossessionType.any, action: ActionType.delete },
    ]

    await queryRunner.manager
      .getRepository<Role>(Role)
      .save(plainToClass(Role, { name: RoleType.user, permissions: permissionsForUser }))

    await queryRunner.manager
      .getRepository<Role>(Role)
      .save(plainToClass(Role, { name: RoleType.support, permissions: permissionsForSupport }))
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.manager.getRepository<Role>(Role).delete(plainToClass(Role, { name: RoleType.user }))

    await queryRunner.manager.getRepository<Role>(Role).delete(plainToClass(Role, { name: RoleType.support }))
  }
}
