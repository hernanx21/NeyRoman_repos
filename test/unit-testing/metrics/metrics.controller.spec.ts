import { Test, TestingModule } from '@nestjs/testing';
import { MetricController } from '../../../src/metrics/controllers/metrics.controller';
import { MetricService } from '../../../src/metrics/services/metrics.service';
import { MetricEntity } from '../../../src/metrics/entity/metrics.entity';
import { CreateMetricDto } from 'src/metrics/dtos/create-metric.dto';
jest.mock('../../../src/metrics/services/metrics.service');

describe('Metric Controller', () => {
  let metricController: MetricController;
  let module: TestingModule;
  let metricService: MetricService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [MetricController],
      providers: [MetricService],
    }).compile();

    metricController = module.get<MetricController>(MetricController);
    metricService = module.get<MetricService>(MetricService);
  });

  afterEach(() => {
    jest.resetAllMocks();
 });

  it('It should return metrics of a repository if succeful', async () => {
    let expectedResult = new MetricEntity();
    let repositoryId = 1;

    jest.spyOn(metricService, 'findOneId').mockResolvedValue(expectedResult);

    expect(await metricController.getTribeById(repositoryId)).toBe(expectedResult);
  });

  it('It should return a metric that was created if succeful', async () => {
    let expectedResult = new MetricEntity();
    let metricDto = new CreateMetricDto();

    jest.spyOn(metricService, 'create').mockResolvedValue(expectedResult);

    expect(await metricController.create(metricDto)).toBe(expectedResult);
  });
});
