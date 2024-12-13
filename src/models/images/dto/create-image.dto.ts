import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateImageDto {
  @IsNotEmpty({ message: 'TourId is not empty!' })
  tourId: string;

  @IsNotEmpty({ message: "Image'url is not empty!" })
  imageUrl: string;

  @IsOptional()
  description: string;
}
