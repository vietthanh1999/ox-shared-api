import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletHold } from './wallet-hold.entity';
import { WalletHoldService } from './wallet-hold.service';
import { WalletHoldController } from './wallet-hold.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WalletHold])],
  providers: [WalletHoldService],
  controllers: [WalletHoldController],
  exports: [WalletHoldService],
})
export class WalletHoldModule {} 