import {  IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateOrganizationDto{
    @IsString()
    readonly name: string;
    
    @IsNumber()
    @IsPositive()
    readonly status: number;
}
