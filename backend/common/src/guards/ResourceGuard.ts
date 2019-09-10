import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { findKey } from 'lodash'

@Injectable()
export class ResourceGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context)
    const req = ctx.getContext()

    const resourceAccess = this.reflector.get('ResourceAccess', context.getHandler())
    if (resourceAccess) {
      if (!req.user) return false
      const userAccess = findKey(req.user.role.permissions, resourceAccess)
      if (!userAccess) return false
    }
    return true
  }
}
