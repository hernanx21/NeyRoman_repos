import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationController } from '../../../src/organization/controllers/organization.controller';
import { OrganizationService } from '../../../src/organization/services/organization.service';
import { OrganizationEntity } from '../../../src/organization/entity/organization.entity';
import { CreateOrganizationDto } from 'src/organization/dtos/create-organization.dto';
import { UpdateOrganizationDto } from 'src/organization/dtos/update-organization.dto';
jest.mock('../../../src/organization/services/organization.service');

describe('Metric Controller', () => {
  let organizationController: OrganizationController;
  let organizationService: OrganizationService;
  let HttpException = jest.fn();
  let HttpStatus = {
    OK: jest.fn(),
  };

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationController],
      providers: [OrganizationService],
    }).compile();

    organizationController = app.get<OrganizationController>(OrganizationController);
    organizationService = app.get<OrganizationService>(OrganizationService);
  });

  afterEach(() => {
    jest.resetAllMocks();
 });

  it('It should return a list of all organizations registered', async () => {
    let expectedResult: OrganizationEntity[] = [];

    jest.spyOn(organizationService, 'findAll').mockResolvedValue(expectedResult);

    expect(await organizationController.getAll()).toBe(expectedResult);
  });

  it('It should return a organization that was created if succeful', async () => {
    let expectedResult = new OrganizationEntity();
    let organizationDto = new CreateOrganizationDto();

    jest.spyOn(organizationService, 'create').mockResolvedValue(expectedResult);

    expect(await organizationController.create(organizationDto)).toBe(expectedResult);
  });

  it('It should return a organization that was updated if succeful', async () => {
    let organizationDto = new UpdateOrganizationDto();
    let organizationId = 1;
    let expectedResult = HttpException(`Organización ${organizationId} actualizada.`, HttpStatus.OK);

    jest.spyOn(organizationService, 'update').mockResolvedValue(expectedResult);

    expect(await organizationController.update(organizationId, organizationDto)).toBe(expectedResult);
  });

  it('It should return a organization that was deleted if succeful', async () => {
    let organizationId = 1;
    let expectedResult = HttpException(`Organización ${organizationId} eliminada.`, HttpStatus.OK);

    jest.spyOn(organizationService, 'delete').mockResolvedValue(expectedResult);

    expect(await organizationController.remove(organizationId)).toBe(expectedResult);
  });

});
