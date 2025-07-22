import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Account } from '../account/account.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Quest {
  @ApiProperty({ example: 'uuid-v4' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'account-uuid' })
  @Column()
  accountId: string;

  @ApiProperty({ type: () => Account })
  @ManyToOne(() => Account)
  account: Account;

  @ApiProperty({ example: 'Campaign Name' })
  @Column()
  campaignName: string;

  @ApiProperty({
    example: [
      { name: 'Quest1', status: 'pending', startTime: '2024-06-01T00:00:00Z', type: 'type1' }
    ],
    type: 'array',
    items: { type: 'object' },
  })
  @Column('json')
  metadata: Array<{ name: string; status: string; startTime: string; type: string }>;

  @ApiProperty({ example: 'pending' })
  @Column()
  status: string;

  @ApiProperty({ example: 'Error message', required: false })
  @Column({ nullable: true })
  message: string;

  @Column({ nullable: true })
  pc?: string;
} 