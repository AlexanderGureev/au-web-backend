import { Injectable } from '@nestjs/common'
import * as dotenv from 'dotenv'
import * as fs from 'fs'

@Injectable()
export class ConfigService {
  private readonly keys: string[] = [
    'MAIL_URL',
    'DATABASE_URL',
    'REDIS_URL',
    'CLIENT_URL',
    'COOKIE_SECRET',
  ]
  private readonly envConfig: { [key: string]: string }

  constructor(filePath: string) {
    if (process.env.NODE_ENV === 'production') {
      this.envConfig = this.keys.reduce(
        (acc, key) => ({ ...acc, [key]: process.env[key] }),
        {},
      )
    } else {
      this.envConfig = dotenv.parse(fs.readFileSync(filePath))
    }
  }

  get(key: string): string {
    return this.envConfig[key]
  }
}
