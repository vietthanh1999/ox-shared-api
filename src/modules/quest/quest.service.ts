import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quest } from './quest.entity';

@Injectable()
export class QuestService {
  constructor(
    @InjectRepository(Quest)
    private readonly questRepository: Repository<Quest>,
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
} 