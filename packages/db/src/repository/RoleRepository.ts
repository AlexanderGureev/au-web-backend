import { EntityRepository, Repository } from 'typeorm'
import { Role } from '../entity/Role'

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {
  async findRole(role: string) {
    const foundRole = await this.findOne({ role })
    return foundRole
  }
}
