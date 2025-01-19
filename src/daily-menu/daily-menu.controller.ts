import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { DailyMenuService } from './daily-menu.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreateDailyMenuDto } from './dto/create-daily-menu.dto';
import { UpdateDailyMenuDto } from './dto/update-daily-menu.dto';

@ApiTags('daily-menu')
@Controller('daily-menu')
export class DailyMenuController {
  constructor(private readonly dailyMenuService: DailyMenuService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Create a daily menu (CHEF only)' })
  @ApiResponse({ status: 201, description: 'Daily menu created successfully.' })
  async create(@Body() dto: CreateDailyMenuDto, @Req() req: Request) {
    const user = req.user as any; // or a typed User interface
    // Convert dto.date if needed:
    const parsedDate = dto.date ? new Date(dto.date) : undefined;
    return this.dailyMenuService.create(
      user,
      dto.title,
      dto.description,
      parsedDate,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all daily menus' })
  async findAll() {
    return this.dailyMenuService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single daily menu by ID' })
  @ApiParam({ name: 'id', type: Number })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.dailyMenuService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Update a daily menu (CHEF only)' })
  @ApiParam({ name: 'id', type: Number })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDailyMenuDto,
    @Req() req: Request,
  ) {
    const user = req.user as any;
    const parsedDate = dto.date ? new Date(dto.date) : undefined;
    return this.dailyMenuService.update(
      user,
      id,
      dto.title,
      dto.description,
      parsedDate,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Delete a daily menu (CHEF only)' })
  @ApiParam({ name: 'id', type: Number })
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const user = req.user as any;
    return this.dailyMenuService.remove(user, id);
  }
}
