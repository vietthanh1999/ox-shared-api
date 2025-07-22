import { ApiProperty } from '@nestjs/swagger';

export class WalletDto {
  @ApiProperty({ required: true })
  address: string;

  @ApiProperty({ required: true })
  privateKey: string;

  @ApiProperty({ required: true })
  mnemonic: string;
}
