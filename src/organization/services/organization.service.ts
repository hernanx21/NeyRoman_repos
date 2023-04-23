import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrganizationDto } from '../dtos/create-organization.dto';
import { UpdateOrganizationDto } from '../dtos/update-organization.dto';
import { OrganizationEntity } from '../entity/organization.entity';

@Injectable()
export class OrganizationService {
    
    constructor(
        @InjectRepository(OrganizationEntity)
        private readonly organizationRepository: Repository<OrganizationEntity>,
      ) {}

      async findOrganization(id: number) {
        let findOrganization = await this.organizationRepository.findOne({ where: { id: id } });
          if (!findOrganization)
            findOrganization = null;
            
        return findOrganization;
      }

      findAll() {
            return this.organizationRepository.find();
      }

      async update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
        await this.organizationRepository.update(id, updateOrganizationDto);
        const updatedTodo = await this.organizationRepository.findOne({ where: { id: id } });
        if (updatedTodo) {
            throw new HttpException(`Organización ${id} actualizada.`, HttpStatus.OK);
        }
        throw new HttpException(`Organización con ID: ${id} no encontrada.`, HttpStatus.NOT_FOUND);
      }

      async create(createOrganizationDto: CreateOrganizationDto) {
        try {
          const createOrganization = this.organizationRepository.create(createOrganizationDto);
          await this.organizationRepository.save( createOrganization );
          return createOrganization;
        } catch (error) {
            throw new HttpException('¡Organización no creada, por favor, inténtelo más tarde!', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }

      async delete(id: number) {
        const organization = await this.organizationRepository.delete(id);
        if (!organization.affected) {
            throw new HttpException('Organización no encontrada.', HttpStatus.NOT_FOUND);
          }
          throw new HttpException('Organización eliminada.', HttpStatus.OK);
      }
}
