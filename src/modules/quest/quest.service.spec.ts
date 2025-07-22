import { Test, TestingModule } from '@nestjs/testing';
import { QuestService } from './quest.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Quest } from './quest.entity';
import { DataSource, Repository } from 'typeorm';

describe('QuestService', () => {
  let service: QuestService;
  let repo: Repository<Quest>;
  let dataSource: DataSource;

  beforeEach(async () => {
    const repoMock = {
      find: jest.fn(),
      findOneBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };
    const dataSourceMock = {
      transaction: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestService,
        { provide: getRepositoryToken(Quest), useValue: repoMock },
        { provide: DataSource, useValue: dataSourceMock },
      ],
    }).compile();
    service = module.get<QuestService>(QuestService);
    repo = module.get<Repository<Quest>>(getRepositoryToken(Quest));
    dataSource = module.get<DataSource>(DataSource);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('assignQuestToPC', () => {
    it('should assign a quest to a PC and not duplicate', async () => {
      const quest = {
        id: '1',
        status: 'pending',
        pc: null,
        accountId: 'acc1',
        account: undefined,
        campaignName: 'camp',
        metadata: [],
        message: '',
      } as unknown as Quest;
      const managerMock = {
        getRepository: () => ({
          createQueryBuilder: () => ({
            setLock: () => ({
              where: () => ({
                andWhere: () => ({
                  getOne: async () => quest,
                }),
              }),
            }),
          }),
        }),
        save: jest.fn().mockResolvedValue({ ...quest, status: 'running', pc: 'PC-01' }),
      };
      (dataSource.transaction as jest.Mock).mockImplementation(async cb => cb(managerMock));
      const result = await service.assignQuestToPC('PC-01');
      expect(result).not.toBeNull();
      if (result) {
        expect(result.status).toBe('running');
        expect(result.pc).toBe('PC-01');
      }
      expect(managerMock.save).toHaveBeenCalledWith({ ...quest, status: 'running', pc: 'PC-01' });
    });

    it('should return null if no quest available', async () => {
      const managerMock = {
        getRepository: () => ({
          createQueryBuilder: () => ({
            setLock: () => ({
              where: () => ({
                andWhere: () => ({
                  getOne: async () => null,
                }),
              }),
            }),
          }),
        }),
        save: jest.fn(),
      };
      (dataSource.transaction as jest.Mock).mockImplementation(async cb => cb(managerMock));
      const result = await service.assignQuestToPC('PC-01');
      expect(result).toBeNull();
      expect(managerMock.save).not.toHaveBeenCalled();
    });
  });
}); 