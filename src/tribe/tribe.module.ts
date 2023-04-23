import { Module } from '@nestjs/common';
import { TribeService } from './services/tribe.service';
import { TribeController } from './controllers/tribe.controller';
import { TribeEntity } from './entity/tribe.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationModule } from 'src/organization/organization.module';

@Module({
  providers: [TribeService],
  controllers: [TribeController],
  imports:[
    OrganizationModule,
    TypeOrmModule.forFeature([TribeEntity])
  ],
  exports: [TribeService]
  
  
})
export class TribeModule {}
