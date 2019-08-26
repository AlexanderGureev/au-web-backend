import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role } from '@au/entities'

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
})
export class RolesModule {}
