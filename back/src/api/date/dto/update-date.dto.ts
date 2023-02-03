import { PartialType } from '@nestjs/mapped-types';
import { CreateDateDto } from './create-date.dto';
import { IsString, IsOptional } from 'class-validator';

export class UpdateDateDto extends PartialType(CreateDateDto) {
  @IsString()
  public date: string;

  @IsString()
  @IsOptional()
  public description: string;

  @IsString()
  @IsOptional()
  public start: string;

  @IsOptional()
  @IsString()
  public end: string;
}
