import { Module, Scope } from '@nestjs/common'
import { ProfileDataLoaderService } from './profileDataloader.service'
import { Connection } from 'typeorm'
import { DatabaseModule } from '@au/db'

const profileDataLoaderFactory = {
  inject: [Connection],
  provide: ProfileDataLoaderService,
  useFactory: ProfileDataLoaderService.create,
  scope: Scope.REQUEST,
}

@Module({
  imports: [DatabaseModule],
  providers: [profileDataLoaderFactory],
  exports: [profileDataLoaderFactory],
})
export class DataLoaderModule {}
