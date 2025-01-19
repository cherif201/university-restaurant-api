import { IsEmail, isEnum, IsNotEmpty, IsString, IsEnum, isNotEmpty} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { role } from '@prisma/client';

export class AuthdtoSignUp {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEnum(role)
  @IsNotEmpty()
  role: role;
}

export class AuthdtoSignIn {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class AuthdtoChangePass {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}