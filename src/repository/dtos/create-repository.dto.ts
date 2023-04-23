import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateRepositoryDto{

    @IsNotEmpty()
    @IsNumber()
    readonly id_tribe: number;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(1)
    readonly state: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(1)
    readonly status: string;
}
