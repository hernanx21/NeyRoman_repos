import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TribeService } from 'src/tribe/services/tribe.service';
import { Repository } from 'typeorm';
import { CreateRepositoryDto } from '../dtos/create-repository.dto';
import { RepositoryEntity } from '../entity/repository.entity';

@Injectable()
export class RepositoryService {

    constructor(
        @InjectRepository(RepositoryEntity)
        private readonly repositoryRepository: Repository<RepositoryEntity>,
        private readonly tribuService: TribeService 
      ) {}
      
    private repositories = {
        repositories: [
            {id: 1,state: 604},
            {id: 2,state: 605},
            {id: 3,state: 606}
        ]};
    
    findAll(){
        return this.repositories;
    }

    async create(createRepositoryDto: CreateRepositoryDto){
        try {
        let tribu = await this.tribuService.findOneId(createRepositoryDto.id_tribe);
        if(tribu){
                let createRepository = this.repositoryRepository.create(createRepositoryDto);
                createRepository.tribe=tribu;
                await this.repositoryRepository.save( createRepository );
                return createRepository;
        }else throw new HttpException(`Tribu ${createRepositoryDto.id_tribe} no encontrada`, HttpStatus.NOT_FOUND);

    } catch (error) {
        throw new HttpException('No se creó el registro, intente más tarde.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
        
    }
    async findOneId(id: number) {

        let findRepository = await this.repositoryRepository.findOne({  relations: ['metric'], where: { id: id } });
       if (!findRepository) {
        throw new HttpException(`El repositorio ${id} no se encuentra registrado.`, HttpStatus.NOT_FOUND);
       }

       return findRepository;
    }

    async findRepoByQuery(state: string, percentage: number, fromDate: Date, toDate: Date) {
        const queryBuilder = this.repositoryRepository.createQueryBuilder('repository').leftJoinAndSelect('repository.metric', 'metric');

        if (state) {
            queryBuilder.andWhere('repository.state = :state', { state });
        }
        if (percentage) {
            queryBuilder.andWhere('metric.coverage = :percentage', { percentage });
        }
        if (fromDate) {
            queryBuilder.andWhere('repository.create_time >= :fromDate', { fromDate });
        }
        if (toDate) {
            queryBuilder.andWhere('repository.create_time <= :toDate', { toDate });
        }
        const repositories = await queryBuilder.getMany();

        return repositories;
    }
    
}
