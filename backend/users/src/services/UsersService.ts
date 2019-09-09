import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { merge } from 'lodash'

import { User } from '../entities'
import { NewUser } from '../interfaces'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: NewUser) {
    await this.userRepository.save(user)
  }

  async update(user: User, params) {
    await this.userRepository.save(merge(user, params))
  }

  findById(id: number): Promise<User> {
    return this.userRepository.findOne({ id }, { relations: ['profile'] })
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email })
  }
}
