import { CreateImageDto } from '@/models/images/dto/create-image.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTourDto {
  @IsNotEmpty({ message: 'Title is not empty!' })
  title: string;

  @IsNotEmpty({ message: 'Description is not empty!' })
  description: string;

  @IsNotEmpty({ message: 'Destination is not empty!' })
  destination: string;

  @IsNotEmpty({ message: 'Start Location is not empty!' })
  startLocation: string;

  @IsNotEmpty({ message: 'Transportation is not empty!' })
  transportation: string;

  @IsNotEmpty({ message: 'Quantity is not empty!' })
  quantity: number;

  @IsNotEmpty({ message: 'Price is not empty!' })
  price: number;

  @IsNotEmpty({ message: 'Start date is not empty!' })
  startDate: Date;

  @IsNotEmpty({ message: 'Start date is not empty!' })
  endDate: Date;

  @IsOptional()
  images: Omit<CreateImageDto, 'tourId'>[] | [];
}
