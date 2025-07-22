import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AccountService } from './account.service';
import { Account } from './account.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('accounts')
@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách account' })
  @ApiResponse({ status: 200, description: 'Danh sách account', type: [Account] })
  findAll() {
    return this.accountService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết account' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Chi tiết account', type: Account })
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Tạo account mới' })
  @ApiBody({ type: Account })
  @ApiResponse({ status: 201, description: 'Account đã tạo', type: Account })
  create(@Body() data: Partial<Account>) {
    return this.accountService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật account' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: Account })
  @ApiResponse({ status: 200, description: 'Account đã cập nhật', type: Account })
  update(@Param('id') id: string, @Body() data: Partial<Account>) {
    return this.accountService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xoá account' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Account đã xoá' })
  remove(@Param('id') id: string) {
    return this.accountService.remove(id);
  }
} 