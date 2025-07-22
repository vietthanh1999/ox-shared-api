import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Account } from '../account/account.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class WalletHold {
  @ApiProperty({ example: 'uuid-v4' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'account-uuid' })
  @Column()
  accountId: string;

  @ApiProperty({ type: () => Account })
  @ManyToOne(() => Account)
  account: Account;

  @ApiProperty({ example: 'ETH' })
  @Column()
  coinType: string;

  @ApiProperty({ example: '100.123456789012345678' })
  @Column('decimal', { precision: 36, scale: 18 })
  balance: string;

  @ApiProperty({ example: '0x123...' })
  @Column()
  address: string;
} 