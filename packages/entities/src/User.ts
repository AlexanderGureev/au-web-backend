import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Profile } from './Profile'
import { Role } from './Role'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    unique: true,
  })
  email: string

  @Column({ select: false })
  password: string

  @OneToOne(type => Profile, profile => profile.user)
  profile: Profile

  @ManyToOne(type => Role)
  @JoinColumn()
  role: Role

  @Column({ nullable: true })
  roleId: number

  @Column()
  registeredAt: Date

  @Column()
  lastLogonAt: Date
}
