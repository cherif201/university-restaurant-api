import { Module } from '@nestjs/common';
import { UserPrefsService } from './user-prefs.service';
import { UserPrefsController } from './user-prefs.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [UserPrefsController],
  providers: [UserPrefsService, PrismaService],
})
export class UserPrefsModule {}
