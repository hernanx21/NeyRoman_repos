import { TribeEntity } from "src/tribe/entity/tribe.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'organization'})
export class OrganizationEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type: 'varchar', length: 50, nullable: false})
    name:string;
    
    @Column({type: 'integer', nullable: false})
    status:number;

    @OneToMany(
        ()=>TribeEntity,
        (tribes)=>tribes.organization,
        {cascade:true}
        )
    tribes?:TribeEntity[];
}
