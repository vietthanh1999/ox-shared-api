import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { WalletHoldService } from './wallet-hold.service';
import { WalletHold } from './wallet-hold.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('wallet-holds')
@Controller('wallet-holds')
export class WalletHoldController {
  constructor(private readonly walletHoldService: WalletHoldService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách ví hold' })
  @ApiResponse({ status: 200, description: 'Danh sách ví hold', type: [WalletHold] })
  findAll() {
    return this.walletHoldService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết ví hold' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Chi tiết ví hold', type: WalletHold })
  findOne(@Param('id') id: string) {
    return this.walletHoldService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Tạo ví hold mới' })
  @ApiBody({ type: WalletHold })
  @ApiResponse({ status: 201, description: 'Ví hold đã tạo', type: WalletHold })
  create(@Body() data: Partial<WalletHold>) {
    return this.walletHoldService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật ví hold' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: WalletHold })
  @ApiResponse({ status: 200, description: 'Ví hold đã cập nhật', type: WalletHold })
  update(@Param('id') id: string, @Body() data: Partial<WalletHold>) {
    return this.walletHoldService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xoá ví hold' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Ví hold đã xoá' })
  remove(@Param('id') id: string) {
    return this.walletHoldService.remove(id);
  }
} 