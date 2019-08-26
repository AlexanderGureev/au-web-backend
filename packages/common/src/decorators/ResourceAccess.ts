import { SetMetadata } from '@nestjs/common'
import { RoleEnums } from '@au/entities'

const { PossessionType } = RoleEnums

export const ResourceAccess = (
  resource: string,
  action: string,
  possession: string = PossessionType.own,
) => SetMetadata('ResourceAccess', { resource, action, possession })
