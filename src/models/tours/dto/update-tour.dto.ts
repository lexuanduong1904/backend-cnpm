import { CreateImageDto } from '@/models/images/dto/create-image.dto';
import { IsOptional } from 'class-validator';

export class UpdateTourDto {
  @IsOptional()
  title: string;

  @IsOptional()
  description: string;

  @IsOptional()
  destination: string;

  @IsOptional()
  startLocation: string;

  @IsOptional()
  transportation: string;

  @IsOptional()
  quantity: number;

  @IsOptional()
  price: number;

  @IsOptional()
  startDate: Date;

  @IsOptional()
  endDate: Date;

  @IsOptional()
  images: Omit<CreateImageDto, 'tourId'>[] | [];
}
