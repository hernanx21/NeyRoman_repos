import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateMetricDto{

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    readonly id_repository:number;

    @IsNumber()
    @IsNotEmpty()
    readonly coverage:number;

    @IsNumber()
    @IsNotEmpty()
    readonly bugs:number;

    @IsNumber()
    @IsNotEmpty()
    readonly vulnerabilities:number;

    @IsNumber()
    @IsNotEmpty()
    readonly hostpot:number;

    @IsNumber()
    @IsNotEmpty()
    readonly code_smells:number;
}
