import { Injectable } from '@nestjs/common'
import { RedisService } from 'nestjs-redis'
import { v4 } from 'uuid'

@Injectable()
export class AuthService {
  private readonly sessionOptions: {} = { httpOnly: true, signed: true }
  private readonly redisClient

  constructor(private readonly redisService: RedisService) {
    this.redisClient = this.redisService.getClient()
  }

  async restoreUserSession(signedCookies) {
    if (!signedCookies || !signedCookies.sessionid) {
      return null
    }
    const session = await this.redisClient.get(
      `session:${signedCookies.sessionid}`,
    )
    return JSON.parse(session)
  }

  async createSession(res, user) {
    const id = v4()
    const session = {
      userId: user.id,
      email: user.email,
      id,
    }
    await this.redisClient.set(`session:${id}`, JSON.stringify(session))
    res.cookie('sessionid', id, this.sessionOptions)
    return session
  }

  async deleteSession({ signedCookies }, res) {
    res.clearCookie('sessionid')
    await this.redisClient.del(`session:${signedCookies.sessionid}`) // handle the case when removing cookies returns 0
  }
}
