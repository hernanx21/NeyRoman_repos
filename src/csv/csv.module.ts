import { Module } from '@nestjs/common';
import { CsvService } from './services/csv.service';
import { CsvController } from './controllers/csv.controller';

@Module({
  providers: [CsvService],
  controllers: [CsvController]
})
export class CsvModule {}
