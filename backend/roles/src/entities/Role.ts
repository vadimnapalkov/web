import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { RoleType, ActionType, PossessionType } from '../enums'

export interface Permission {
  resource: string
  action: ActionType
  possession: PossessionType
}

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number

  @Column('enum', { enum: RoleType, unique: true })
  name: RoleType

  @Column('jsonb', { default: [], nullable: true })
  permissions: Permission[] = []
}
