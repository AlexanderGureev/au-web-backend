import { Module, Scope } from '@nestjs/common'
import { ProfileDataLoaderService } from './profileDataloader.service'
import { Connection } from 'typeorm'

const profileDataLoaderFactory = {
  inject: [Connection],
  provide: ProfileDataLoaderService,
  useFactory: ProfileDataLoaderService.create,
  scope: Scope.REQUEST,
}

@Module({
  providers: [profileDataLoaderFactory],
  exports: [profileDataLoaderFactory],
})
export class DataLoaderModule {}
