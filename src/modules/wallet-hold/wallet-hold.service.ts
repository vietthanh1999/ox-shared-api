import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletHold } from './wallet-hold.entity';

@Injectable()
export class WalletHoldService {
  constructor(
    @InjectRepository(WalletHold)
    private readonly walletHoldRepository: Repository<WalletHold>,
  ) {}

  findAll() {
    return this.walletHoldRepository.find();
  }

  findOne(id: string) {
    return this.walletHoldRepository.findOneBy({ id });
  }

  create(data: Partial<WalletHold>) {
    const wallet = this.walletHoldRepository.create(data);
    return this.walletHoldRepository.save(wallet);
  }

  update(id: string, data: Partial<WalletHold>) {
    return this.walletHoldRepository.update(id, data);
  }

  remove(id: string) {
    return this.walletHoldRepository.delete(id);
  }
} 