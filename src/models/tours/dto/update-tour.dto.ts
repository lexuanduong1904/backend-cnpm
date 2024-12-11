import { IsOptional } from 'class-validator';

export class UpdateTourDto {
  @IsOptional()
  title: string;

  @IsOptional()
  description: string;

  @IsOptional()
  quantity: number;

  @IsOptional()
  price: number;

  @IsOptional()
  startDate: Date;

  @IsOptional()
  endDate: Date;
}
