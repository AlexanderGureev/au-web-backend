import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'

@Injectable()
export class ResourceGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const resourceAccess = this.reflector.get<any>(
      'ResourceAccess',
      context.getHandler(),
    )

    if (!resourceAccess) {
      return true
    }

    const ctx = GqlExecutionContext.create(context)
    const {
      credentials: { user },
    } = ctx.getContext().req

    const hasRoleAndPossession = (
      { resource, action, possession },
      { role },
    ) => {
      if (possession !== role.name) {
        return false
      }
      return role.permissions.some(
        permission => permission[resource] && permission[resource] === action,
      )
    }

    return hasRoleAndPossession(resourceAccess, user)
  }
}
