import { User } from './User'
import { PrimaryGeneratedColumn, Column, OneToOne, Entity } from 'typeorm'

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstName: string

  @Column()
  lastName: string

  @OneToOne(type => User, user => user.profile)
  user: User
}
