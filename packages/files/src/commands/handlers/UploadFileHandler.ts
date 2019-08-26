import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UploadFileCommand } from '../impl'
import path from 'path'
import fs from 'fs'
import stream from 'stream'
import { promisify } from 'util'
import { UPLOAD_DIR } from '../../constants'

const pipeline = promisify(stream.pipeline)

@CommandHandler(UploadFileCommand)
export class UploadFileHandler implements ICommandHandler<UploadFileCommand> {
  async execute(command: UploadFileCommand) {
    try {
      const { filename, createReadStream } = await command.file

      const fName =
        path.basename(filename, path.extname(filename)) +
        '-' +
        Date.now() +
        path.extname(filename)

      await pipeline(
        createReadStream(),
        fs.createWriteStream(path.join(UPLOAD_DIR, fName)),
      )
      return fName
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
