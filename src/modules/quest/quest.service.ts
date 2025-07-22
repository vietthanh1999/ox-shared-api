import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Quest } from './quest.entity';

@Injectable()
export class QuestService {
  constructor(
    @InjectRepository(Quest)
    private readonly questRepository: Repository<Quest>,
    private readonly dataSource: DataSource,
  ) {}

  findAll() {
    return this.questRepository.find();
  }

  findOne(id: string) {
    return this.questRepository.findOneBy({ id });
  }

  create(data: Partial<Quest>) {
    const quest = this.questRepository.create(data);
    return this.questRepository.save(quest);
  }

  update(id: string, data: Partial<Quest>) {
    return this.questRepository.update(id, data);
  }

  remove(id: string) {
    return this.questRepository.delete(id);
  }

  async createBulk(quests: Partial<Quest>[]) {
    const entities = this.questRepository.create(quests);
    return this.questRepository.save(entities);
  }

  async assignQuestToPC(pcId: string) {
    return this.dataSource.transaction(async manager => {
      // Lấy quest đầu tiên chưa ai nhận, lock hàng này
      const quest = await manager
        .getRepository(Quest)
        .createQueryBuilder('quest')
        .setLock('pessimistic_write')
        .where('quest.status = :status', { status: 'pending' })
        .andWhere('quest.pc IS NULL')
        .getOne();

      if (!quest) return null;

      quest.status = 'running';
      quest.pc = pcId;
      await manager.save(quest);
      return quest;
    });
  }
} 