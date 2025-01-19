import { Module } from '@nestjs/common';
import { DailyMenuService } from './daily-menu.service';
import { DailyMenuController } from './daily-menu.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [],
  controllers: [DailyMenuController],
  providers: [DailyMenuService, PrismaService],
})
export class DailyMenuModule {}
