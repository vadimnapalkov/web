import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector, ModuleRef } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { findKey } from 'lodash'
import { UserService } from '@backend/users'
import { RoleType } from '@backend/roles'

@Injectable()
export class ResourceGuard implements CanActivate {
  private userService: UserService

  constructor(private readonly reflector: Reflector, private readonly moduleRef: ModuleRef) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const req = ctx.getContext()

    const resourceAccess = this.reflector.get('ResourceAccess', context.getHandler())
    if (resourceAccess) {
      if (!req.user) return false
      this.userService = this.moduleRef.get(UserService, { strict: false })
      const user = await this.userService.findById(req.user.id)
      const userAccess = findKey(user.role.permissions, resourceAccess)

      if (user.role.name !== RoleType.support && !userAccess) return false
    }
    return true
  }
}
