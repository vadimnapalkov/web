import { MigrationInterface, QueryRunner } from 'typeorm'
import { plainToClass } from 'class-transformer'

import { RoleType, ActionType, PossessionType } from '../enums'
import { Role } from '../entities'

export class FillData1514404694792 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const permissionsForUser = [
      { resource: PossessionType.own, action: ActionType.create },
      { resource: PossessionType.own, action: ActionType.read },
      { resource: PossessionType.own, action: ActionType.update },
      { resource: PossessionType.own, action: ActionType.delete },
    ]

    const permissionsForSupport = [
      { resource: PossessionType.any, action: ActionType.create },
      { resource: PossessionType.any, action: ActionType.read },
      { resource: PossessionType.any, action: ActionType.update },
      { resource: PossessionType.any, action: ActionType.delete },
    ]

    await queryRunner.manager
      .getRepository<Role>(Role)
      .save(plainToClass(Role, { name: 'User', permissions: permissionsForUser, role: RoleType.user }))

    await queryRunner.manager
      .getRepository<Role>(Role)
      .save(plainToClass(Role, { name: 'Support', permissions: permissionsForSupport, role: RoleType.support }))
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.manager
      .getRepository<Role>(Role)
      .delete(plainToClass(Role, { name: 'User', role: RoleType.user }))

    await queryRunner.manager
      .getRepository<Role>(Role)
      .delete(plainToClass(Role, { name: 'Support', role: RoleType.support }))
  }
}
