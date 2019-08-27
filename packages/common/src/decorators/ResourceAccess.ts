import { SetMetadata } from '@nestjs/common'
import { PossessionType } from '@au/db'

export const ResourceAccess = (
  resource: string,
  action: string,
  possession: string = PossessionType.own,
) => SetMetadata('ResourceAccess', { resource, action, possession })
