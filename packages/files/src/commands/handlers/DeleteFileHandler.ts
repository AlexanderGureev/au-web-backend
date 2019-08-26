import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { DeleteFileCommand } from '../impl'
import path from 'path'
import fs from 'fs'
import { UPLOAD_DIR } from '../../constants'

const AVA_DEFAULT = 'ava_default.png'
@CommandHandler(DeleteFileCommand)
export class DeleteFileHandler implements ICommandHandler<DeleteFileCommand> {
  async execute(command: DeleteFileCommand) {
    try {
      const { fileName } = command
      if (fileName === AVA_DEFAULT) {
        return fileName
      }
      await fs.promises.unlink(path.join(UPLOAD_DIR, fileName))
      return fileName
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
