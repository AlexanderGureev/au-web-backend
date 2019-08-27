import { EntityRepository, Repository } from 'typeorm'
import { User } from '../entity/User'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findById(id: number) {
    const user = await this.findOne({ id })
    return user
  }
  async findUser(email) {
    const user = await this.createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect('user.password')
      .getOne()
    return user
  }
  async saveUser(user) {
    const { password, ...userData } = await this.save(user)
    return userData
  }
  async createUser(user) {
    const userData = await this.create({
      ...user,
      registeredAt: new Date(),
      lastLogonAt: new Date(),
    })
    return userData
  }
}
