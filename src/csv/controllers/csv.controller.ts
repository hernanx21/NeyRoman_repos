import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { CsvService } from '../services/csv.service';

@Controller('csv')
export class CsvController {
    constructor( private readonly downlandService: CsvService ) {}
    @Get('/download/tribe/:id')
    async download(@Param('id', ParseIntPipe ) id: number , @Res () res){
        const response = await  this.downlandService.csvTribeById(id);
        res.header('Content-Type', 'text/csv');
        res.attachment(`tribe${id}.csv`);
        return res.send(response);
    }

}
