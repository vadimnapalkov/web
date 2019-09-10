import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { merge } from 'lodash'
import { Role, RoleType } from '@backend/roles'

import { User } from '../entities'
import { NewUser } from '../interfaces'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(user: NewUser) {
    await this.userRepository.save(user)
  }

  async update(user: User, params) {
    await this.userRepository.save(merge(user, params))
  }

  findAll() {
    return this.userRepository.findAndCount({ relations: ['profile'] })
  }

  findById(id: number): Promise<User> {
    return this.userRepository.findOne({ id }, { relations: ['profile', 'role'] })
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email })
  }

  findRole(name: RoleType): Promise<Role> {
    return this.roleRepository.findOne({ name })
  }
}
