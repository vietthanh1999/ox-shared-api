import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  findAll() {
    return this.accountRepository.find();
  }

  findOne(id: string) {
    return this.accountRepository.findOneBy({ id });
  }

  create(data: Partial<Account>) {
    const account = this.accountRepository.create(data);
    return this.accountRepository.save(account);
  }

  update(id: string, data: Partial<Account>) {
    return this.accountRepository.update(id, data);
  }

  remove(id: string) {
    return this.accountRepository.delete(id);
  }
} 