import { Module } from '@nestjs/common';
import { MetricService } from './services/metrics.service';
import { MetricController } from './controllers/metrics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricEntity } from './entity/metrics.entity';

@Module({
  providers: [MetricService],
  controllers: [MetricController],
  imports:[
    TypeOrmModule.forFeature([MetricEntity])
  ]
})
export class MetricModule {}
