import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { RoleType, ActionType, PossessionType } from '../enums'

export interface Permission {
  resource: PossessionType
  action: ActionType
}

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column('jsonb', { default: [], nullable: true })
  permissions: Permission[] = []

  @Column('enum', { enum: RoleType, unique: true })
  role: string
}
