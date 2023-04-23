import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateTribeDto } from '../dtos/tribe.dto';
import { TribeService } from '../services/tribe.service';

@Controller('tribe')
export class TribeController {
    constructor( private readonly tribeService: TribeService ) {}
    @Post()
    create(@Body() tribeDto: CreateTribeDto) {
      return this.tribeService.create(tribeDto);
    }
    
    @Get(':id')
    getTribeById(@Param('id', ParseIntPipe ) id: number) {
      return this.tribeService.findTribe( id );
    }
}
