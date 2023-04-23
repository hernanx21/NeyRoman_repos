import { Controller, Get, Body, Post, ParseIntPipe, Delete, Param, Patch } from '@nestjs/common';
import { CreateOrganizationDto } from '../dtos/create-organization.dto';
import { UpdateOrganizationDto } from '../dtos/update-organization.dto';
import { OrganizationService } from '../services/organization.service';

@Controller('organization')
export class OrganizationController {
    constructor( private readonly organizationService: OrganizationService ) {}
    @Get()
    getAll() {
        return this.organizationService.findAll();
    }

    @Post()
    create(@Body() createOrganizationDto: CreateOrganizationDto) {
      return this.organizationService.create(createOrganizationDto);
    }

    @Patch(':id')
    update(
      @Param('id', ParseIntPipe ) id: number, 
      @Body() updateOrganizationDto: UpdateOrganizationDto
    ) {
      return this.organizationService.update( id, updateOrganizationDto );
    }
    
    @Delete(':id')
    remove(@Param('id', ParseIntPipe ) id: number) {
      return this.organizationService.delete( id );
    }
}