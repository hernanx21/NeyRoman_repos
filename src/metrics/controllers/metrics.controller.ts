import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateMetricDto } from '../dtos/create-metric.dto';
import { MetricService } from '../services/metrics.service';

@Controller('metric')
export class MetricController {

    constructor( private readonly metricService:MetricService ) {}
    @Post()
    create(@Body() createMetricDto: CreateMetricDto) {
      return this.metricService.create(createMetricDto);
    }

    @Get(':id')
    getTribeById(@Param('id', ParseIntPipe ) id: number) {
      return this.metricService.findOneId( id );
    }
}
