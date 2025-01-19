import { IsBoolean, IsInt } from 'class-validator';

export class CreateUserPrefsDto {
  @IsBoolean()
  eatsSalad: boolean;

  @IsBoolean()
  eatsBread: boolean;

  @IsInt()
  userId: number;
}
