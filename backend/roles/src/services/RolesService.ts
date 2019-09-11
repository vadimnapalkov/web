import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Role } from '../entities'
import { RoleType } from '../enums'

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  findRole(name: RoleType): Promise<Role> {
    return this.roleRepository.findOne({ name })
  }
}
