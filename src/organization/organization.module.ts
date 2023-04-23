import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationController } from './controllers/organization.controller';
import { OrganizationEntity } from './entity/organization.entity';
import { OrganizationService } from './services/organization.service';

@Module({
  controllers: [OrganizationController],
  providers: [OrganizationService],
  imports:[
    TypeOrmModule.forFeature([OrganizationEntity])
  ],
  exports:[OrganizationService]
})
export class OrganizationModule {}
