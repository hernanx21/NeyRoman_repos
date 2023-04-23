import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationModule } from './organization/organization.module';
import { TribeModule } from './tribe/tribe.module';
import { RepositoryModule } from './repository/repository.module';
import { MetricModule } from './metrics/metrics.module';
import { CsvModule } from './csv/csv.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'cockroachdb',
      url: process.env.DATABASE_URL,
      ssl: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
      retryDelay: 3000,
      retryAttempts: 10,
      logging: false,
    }),
    OrganizationModule,
    TribeModule,
    RepositoryModule,
    MetricModule,
    CsvModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
