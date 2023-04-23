import { RepositoryEntity } from "src/repository/entity/repository.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

@Entity({name:'metric'})
export class MetricEntity {
    @PrimaryColumn()
    id_repository:number;

    @Column({type: 'float',  nullable: false})
    coverage:number;
    
    @Column({type: 'integer', nullable: false})
    bugs:number;

    @Column({type: 'integer', nullable: false})
    vulnerabilities:number;
    
    @Column({type: 'integer', nullable: false})
    hostpot:number;

    @Column({type: 'integer', nullable: false})
    code_smells:number;

    @OneToOne(()=>RepositoryEntity  , (repository)=> repository.metric ) 
    @JoinColumn({ name: 'id_repository'}) 
    repository: RepositoryEntity;
}