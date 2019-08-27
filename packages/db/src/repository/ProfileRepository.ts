import { EntityRepository, Repository } from 'typeorm'
import { Profile } from '../entity/Profile'

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {
  async findById(id: number) {
    const profile = await this.findOne({ id })
    return profile
  }
  async createProfile(user) {
    const profile = await this.create({ user, avatarPath: 'ava_default.png' })
    return profile
  }
  async updateProfileById(id: number, profile) {
    await this.createQueryBuilder()
      .update(Profile, profile)
      .where('userId = :userId', { userId: id })
      .execute()

    const updatedProfile = await this.findOne({
      userId: id,
    })
    return updatedProfile
  }
}
