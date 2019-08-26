import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { Connection } from 'typeorm'
import { AuthService } from '@au/auth'
import { User } from '@au/entities'

interface ICredentials {
  user: object
  isAuth: boolean
}
interface IReq extends Request {
  credentials: ICredentials
  signedCookies: any
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly connection: Connection,
    private readonly authService: AuthService,
  ) {}

  async use(req: IReq, res: Response, next: NextFunction) {
    try {
      const session = await this.authService.restoreUserSession(
        req.signedCookies,
      )
      if (!session || !session.email) {
        return next()
      }

      const user = await this.connection
        .getRepository(User)
        .findOne({ email: session.email }, { relations: ['role'] })

      if (!user) {
        return next()
      }

      req.credentials = {
        user,
        isAuth: true,
      }
      next()
    } catch (error) {
      console.log(error)
      next()
    }
  }
}
