import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Account {
  @ApiProperty({ example: 'uuid-v4' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'mnemonic phrase' })
  @Column()
  mnemonic: string;

  @ApiProperty({ example: '0x123...' })
  @Column()
  walletAddress: string;

  @Column('json', { nullable: true })
  wallet?: Record<string, any>;

  @Column('json', { nullable: true })
  gmail?: Record<string, any>;

  @Column('json', { nullable: true })
  twitter?: Record<string, any>;

  @Column('json', { nullable: true })
  discord?: Record<string, any>;

  @Column('json', { nullable: true })
  telegram?: Record<string, any>;

  @Column({ nullable: true })
  profileId?: string;

  @Column({ nullable: true })
  profileName?: string;

  @ApiProperty({ example: 'PC-01', required: false, nullable: true })
  @Column({ nullable: true })
  pc?: string;
} 