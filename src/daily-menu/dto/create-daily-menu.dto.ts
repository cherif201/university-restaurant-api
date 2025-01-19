// create-daily-menu.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateDailyMenuDto {
  @ApiProperty({ description: 'Title of the daily menu' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Description of the daily menu' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({ description: 'Date for which the menu applies (defaults to now)', type: String, format: 'date-time' })
  @IsOptional()
  @IsDateString()
  date?: string; 
}
