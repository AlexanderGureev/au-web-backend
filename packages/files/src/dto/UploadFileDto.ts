export class UploadFileDto {
  public readonly filename: string
  public readonly mimetype: string
  public readonly encoding: string
  public readonly createReadStream: any
}
