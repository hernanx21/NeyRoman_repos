import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateTribeDto{
    
    @IsString()
    readonly name: string;

    @IsNumber()
    readonly status: number;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    readonly organization: number;
}
