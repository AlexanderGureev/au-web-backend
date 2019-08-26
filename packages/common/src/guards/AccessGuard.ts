import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

@Injectable()
export class AccessGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    // const [, , ctx, req] = context.getArgs()
    // const user = ctx.user || req.user

    const ctx = GqlExecutionContext.create(context)
    const { credentials = null } = ctx.getContext().req

    if (credentials && credentials.isAuth) {
      return true
    }
    return false

    // if (
    //   req.headers.authorization &&
    //   req.headers.authorization.split(' ')[0] === 'Bearer'
    // ) {
    //   const token = req.headers.authorization.split(' ')[1]
    //   const payload = this.authService.verifyToken(token)

    //   if (payload) {
    //     req.user = payload
    //     return true
    //   }
    //   return false
    // }

    // return true
    // const withAuthAccess = this.reflector.get('AuthAccess', context.getHandler())

    // throw new Error('To be implemented AccessGuard.canActivate (╯°□°）╯︵ ┻━┻')
  }
}
