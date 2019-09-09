import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const req = ctx.getContext()

    const withAuthAccess = this.reflector.get('AuthAccess', context.getHandler())
    if (withAuthAccess) if (!req.user) return false

    return true
  }
}
