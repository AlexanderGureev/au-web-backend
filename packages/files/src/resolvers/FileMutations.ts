import { Args, Mutation } from '@nestjs/graphql'
import { UploadFileDto, DeleteFileDto } from '../dto'
import { CommandBus } from '@nestjs/cqrs'
import { UploadFileCommand, DeleteFileCommand } from '../commands/impl'
import { Injectable, UseGuards } from '@nestjs/common'
import { AccessGuard } from '@au/common'

@Injectable()
export class FileMutations {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(AccessGuard)
  @Mutation('uploadFile')
  async uploadFile(@Args('file') file: UploadFileDto) {
    const fileName = await this.commandBus.execute(new UploadFileCommand(file))
    return { fileName }
  }

  @UseGuards(AccessGuard)
  @Mutation('deleteFile')
  async deleteFile(@Args('fileName') fileName: DeleteFileDto) {
    await this.commandBus.execute(new DeleteFileCommand(fileName))
    return { fileName }
  }
}
