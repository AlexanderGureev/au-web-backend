import { Module } from '@nestjs/common'
import { UploadScalar } from './scalars/upload.scalar'
import { Resolvers } from './resolvers'
import { CommandHandlers } from './commands/handlers'
import { CqrsModule } from '@nestjs/cqrs'

@Module({
  imports: [CqrsModule],
  providers: [UploadScalar, ...Resolvers, ...CommandHandlers],
  exports: [UploadScalar],
})
export class FilesModule {}
