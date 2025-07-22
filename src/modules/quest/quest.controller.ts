import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { QuestService } from './quest.service';
import { Quest } from './quest.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('quests')
@Controller('quests')
export class QuestController {
  constructor(private readonly questService: QuestService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách quest' })
  @ApiResponse({ status: 200, description: 'Danh sách quest', type: [Quest] })
  findAll() {
    return this.questService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết quest' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Chi tiết quest', type: Quest })
  findOne(@Param('id') id: string) {
    return this.questService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Tạo quest mới' })
  @ApiBody({ type: Quest })
  @ApiResponse({ status: 201, description: 'Quest đã tạo', type: Quest })
  create(@Body() data: Partial<Quest>) {
    return this.questService.create(data);
  }

  @Post('bulk')
  @ApiOperation({ summary: 'Tạo nhiều quest cùng lúc' })
  @ApiBody({ schema: { example: { count: 3, quests: [ { accountId: '...', campaignName: '...', metadata: [], status: 'pending', message: '' } ] } } })
  @ApiResponse({ status: 201, description: 'Các quest đã tạo', type: [Quest] })
  async createBulk(@Body() body: { count: number, quests: Partial<Quest>[] }) {
    // Nếu truyền count và 1 quest mẫu, nhân bản ra count quest
    if (body.count && body.quests && body.quests.length === 1) {
      const quests = Array.from({ length: body.count }, () => ({ ...body.quests[0] }));
      return this.questService.createBulk(quests);
    }
    // Nếu truyền mảng quests cụ thể
    if (body.quests && Array.isArray(body.quests)) {
      return this.questService.createBulk(body.quests);
    }
    return [];
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật quest' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: Quest })
  @ApiResponse({ status: 200, description: 'Quest đã cập nhật', type: Quest })
  update(@Param('id') id: string, @Body() data: Partial<Quest>) {
    return this.questService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xoá quest' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Quest đã xoá' })
  remove(@Param('id') id: string) {
    return this.questService.remove(id);
  }
} 