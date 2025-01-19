import { IsString, IsOptional, IsEmail, IsEnum } from 'class-validator';
import { role } from '@prisma/client';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsEnum(role)
  role?: role;
}
