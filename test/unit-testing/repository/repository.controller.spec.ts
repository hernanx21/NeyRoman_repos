import { Test, TestingModule } from '@nestjs/testing';
import { RepositoryController } from '../../../src/repository/controllers/repository.controller';
import { RepositoryService } from '../../../src/repository/services/repository.service';
import { RepositoryEntity } from '../../../src/repository/entity/repository.entity';
import { CreateRepositoryDto } from 'src/repository/dtos/create-repository.dto';
jest.mock('../../../src/repository/services/repository.service');

describe('Repository Controller testing', () => {
  let repositoryController: RepositoryController;
  let module: TestingModule;
  let repositoryService: RepositoryService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [RepositoryController],
      providers: [RepositoryService],
    }).compile();

    repositoryController = module.get<RepositoryController>(RepositoryController);
    repositoryService = module.get<RepositoryService>(RepositoryService);
  });

  afterEach(() => {
    jest.resetAllMocks();
 });

  it('It should return metrics of a repository if succeful', () => {
    let expectedResult = {
      repositories: [
          {id: 1,state: 604},
          {id: 2,state: 605},
          {id: 3,state: 606}
      ]};

    jest.spyOn(repositoryService, 'findAll').mockReturnValue(expectedResult);

    expect(repositoryController.getAll()).toBe(expectedResult);
  });

  it('It should return a metric that was created if succeful', async () => {
    let expectedResult = new RepositoryEntity();
    let repositoryDto = new CreateRepositoryDto();

    jest.spyOn(repositoryService, 'create').mockResolvedValue(expectedResult);

    expect(await repositoryController.create(repositoryDto)).toBe(expectedResult);
  });

  it('It should return a repository with its metrics', async () => {
    let expectedResult = new RepositoryEntity();
    let repositoryId = 1;

    jest.spyOn(repositoryService, 'findOneId').mockResolvedValue(expectedResult);

    expect(await repositoryController.getTribeById(repositoryId)).toBe(expectedResult);
  });

  it('It should return a repository with its metrics by filters', async () => {
    let expectedArray: RepositoryEntity[] = [];
    let expectedResult = {
      "repositories": []
    };

    jest.spyOn(repositoryService, 'findRepoByQuery').mockResolvedValue(expectedArray);

    expect(await repositoryController.findRepoQuery('E', 100, new Date(), new Date())).toStrictEqual(expectedResult);
  });
});
