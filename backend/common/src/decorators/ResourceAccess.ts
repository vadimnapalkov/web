import { SetMetadata } from '@nestjs/common'
import { PossessionType, ActionType } from '@backend/roles'

export const ResourceAccess = (resource: string, action: ActionType, possession: PossessionType = PossessionType.own) =>
  SetMetadata('resourceAccess', { resource, action, possession })
