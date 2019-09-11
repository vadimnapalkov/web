import { PrimaryGeneratedColumn, Entity, Column, OneToOne, ManyToOne, JoinColumn, Index } from 'typeorm'
import { Profile } from './Profile'
import { Role } from '@backend/roles/src/entities'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Index({ unique: true })
  @Column()
  email: string

  @Column()
  password: string

  @Column()
  registeredAt: Date

  @Column()
  lastLoginAt: Date

  @OneToOne(type => Profile, profile => profile.user, { cascade: true })
  @JoinColumn()
  profile: Profile

  @ManyToOne(type => Role, { cascade: true })
  @JoinColumn()
  role: Role
}
