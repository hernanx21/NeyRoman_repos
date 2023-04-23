import { Test, TestingModule } from '@nestjs/testing';
import { TribeController } from '../../../src/tribe/controllers/tribe.controller';
import { TribeService } from '../../../src/tribe/services/tribe.service';
import { TribeEntity } from '../../../src/tribe/entity/tribe.entity';
import { CreateTribeDto } from 'src/tribe/dtos/tribe.dto';
jest.mock('../../../src/tribe/services/tribe.service');

describe('Tribe Controller testing', () => {
  let tribeController: TribeController;
  let tribeService: TribeService;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TribeController],
      providers: [TribeService],
    }).compile();

    tribeController = app.get<TribeController>(TribeController);
    tribeService = app.get<TribeService>(TribeService);
  });

  afterEach(() => {
    jest.resetAllMocks();
 });

 it('It should return a tribe that was created if succeful', async () => {
  let expectedResult = new TribeEntity();
  let tribeDto = new CreateTribeDto();

  jest.spyOn(tribeService, 'create').mockResolvedValue(expectedResult);

  expect(await tribeController.create(tribeDto)).toBe(expectedResult);
});

it('It should return tribes of determined organization and its metrics if succeful', async () => {
  let expectedResult = {
    "repositories": [],
  }
  let tribeId = 1;

  jest.spyOn(tribeService, 'findTribe').mockResolvedValue(expectedResult);

  expect(await tribeController.getTribeById(tribeId)).toBe(expectedResult);
});

});
