import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'

@Injectable()
export class ResourceGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    // const ctx = GqlExecutionContext.create(context)
    // const cont = ctx.getContext()
    // const withAuthAccess = this.reflector.get('resourceAccess', context.getHandler())
    // console.log(withAuthAccess)
    return true
    // throw new Error('To be implemented ResourceGuard.canActivate')
  }
}
