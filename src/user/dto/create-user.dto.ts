import { IsString, IsEmail, IsEnum, isNotEmpty, IsOptional } from 'class-validator';
import { role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from '@nestjs/class-validator';

export class CreateUserDto {
  @ApiProperty( { description: 'The username of the user' } )
  @IsString()
  @IsOptional()
  username: string;

  @ApiProperty( { description: 'The email of the user' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'enter your password' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'enter your role'})
  @IsEnum(role)
  @IsOptional()
  role: role;
}
