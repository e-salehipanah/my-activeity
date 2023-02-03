import { IsOptional, IsString } from 'class-validator';

export class CreateDateDto {
  @IsString()
  public date: string;

  @IsOptional()
  @IsString()
  public description: string;

  @IsOptional()
  @IsString()
  public start: string;

  @IsOptional()
  @IsString()
  public end: string;
}
