import { IsNotEmpty } from 'class-validator';

export class CreateTourDto {
  @IsNotEmpty({ message: 'Title is not empty!' })
  title: string;

  @IsNotEmpty({ message: 'Description is not empty!' })
  description: string;

  @IsNotEmpty({ message: 'Quantity is not empty!' })
  quantity: number;

  @IsNotEmpty({ message: 'Price is not empty!' })
  price: number;

  @IsNotEmpty({ message: 'Start date is not empty!' })
  startDate: Date;

  @IsNotEmpty({ message: 'Start date is not empty!' })
  endDate: Date;
}
