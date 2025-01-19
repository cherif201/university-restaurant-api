import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateUserPrefsDto {
  @IsOptional()
  @IsBoolean()
  eatsSalad?: boolean;

  @IsOptional()
  @IsBoolean()
  eatsBread?: boolean;
}
