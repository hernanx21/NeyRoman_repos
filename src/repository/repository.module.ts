import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositoryEntity } from './entity/repository.entity';
import { RepositoryController } from './controllers/repository.controller';
import { RepositoryService } from './services/repository.service';
import { TribeModule } from 'src/tribe/tribe.module';

@Module({
  controllers: [RepositoryController],
  providers: [RepositoryService],
  imports:[
    TribeModule,
    TypeOrmModule.forFeature([RepositoryEntity])
  ],
})
export class RepositoryModule {}
