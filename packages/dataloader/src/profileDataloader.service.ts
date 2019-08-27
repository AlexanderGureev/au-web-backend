import DataLoader from 'dataloader'
import { Profile } from '@au/db'
import { IDataLoader } from './dataloader.interface'
import { Connection, In } from 'typeorm'

export class ProfileDataLoaderService implements IDataLoader<string, Profile> {
  public static async create(
    connection: Connection,
  ): Promise<ProfileDataLoaderService> {
    const dataLoader = new DataLoader<string, Profile>(async keys => {
      const loadedEntities = await connection
        .getRepository(Profile)
        .find({ where: { userId: In(keys) } })

      return keys.map(key =>
        loadedEntities.find(profile => profile.userId === Number(key)),
      )
    })
    return new ProfileDataLoaderService(dataLoader)
  }

  constructor(private readonly dataLoader: DataLoader<string, Profile>) {}

  public async load(id: string) {
    return this.dataLoader.load(id)
  }
}
