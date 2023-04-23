
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

    @Get(':id')
    getTribeById(@Param('id', ParseIntPipe ) id: number) {
      return this.repositoryService.findOneId( id );
    }

    /*@Get()
    async findAll(
        @Query('state') state: string,
        @Query('percentage') percentage: number,
        @Query('fromDate') fromDate: Date,
        @Query('toDate') toDate: Date,
        @Param('id', ParseIntPipe ) id: number
    ) {
    const repositories = await this.repositoryService.findRepoByQuery(state, percentage, fromDate, toDate, id)
    return { repositories }
    }*/
}
