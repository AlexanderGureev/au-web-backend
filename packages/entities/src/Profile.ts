import { User } from './User'
import {
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  Entity,
} from 'typeorm'

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', default: '' })
  firstName: string

  @Column({ type: 'varchar', default: '' })
  lastName: string

  @Column()
  avatarPath: string

  @OneToOne(type => User, user => user.profile, {
    cascade: true,
  })
  @JoinColumn()
  user: User

  @Column()
  userId: number
}
