// update-daily-menu.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateDailyMenuDto {
  @ApiPropertyOptional({ description: 'New title for the daily menu' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'New description for the daily menu' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'New date for the daily menu', format: 'date-time' })
  @IsOptional()
  @IsDateString()
  date?: string; // or Date
}
