
import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { CreateRepositoryDto } from '../dtos/create-repository.dto';
import { RepositoryService } from '../services/repository.service';
@Controller('repository')
export class RepositoryController {
    constructor( private readonly repositoryService: RepositoryService ) {}
    @Get()
    getAll() {
        return this.repositoryService.findAll();
    }

    @Post()
    create(@Body() createRepositoryDto: CreateRepositoryDto) {
      return this.repositoryService.create(createRepositoryDto);
    }

    @Get('query')
    async findRepoQuery(
        @Query('state') state: string,
        @Query('percentage') percentage: number,
        @Query('fromDate') fromDate: Date,
        @Query('toDate') toDate: Date
    ) {
      const repositories = await this.repositoryService.findRepoByQuery(state, percentage, fromDate, toDate)
      return { repositories }
    }

    @Get(':id')
    getTribeById(@Param('id', ParseIntPipe ) id: number) {
      return this.repositoryService.findOneId( id );
    }
}
