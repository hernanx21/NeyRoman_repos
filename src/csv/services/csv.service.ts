import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {  parse } from 'json2csv';
import axios ,{ AxiosInstance } from "axios";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CsvService {

    private readonly axios: AxiosInstance = axios
    private readonly csvpaser = parse;
    constructor(
        private envConfig: ConfigService
    ){}
    async csvTribeById(id: number){
        try {
            const { data } = await this.axios.get(`${this.envConfig.get('API_URL')}/tribe/${id}`);
                const csv = this.csvpaser(data.repositories)
                return csv;
        } catch (error) {
            throw new HttpException(`Ocurrió un error inesperado. Inténtelo de nuevo, más tarde.`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
