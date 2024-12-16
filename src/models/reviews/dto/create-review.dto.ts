import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty({ message: 'BookingId is not empty!' })
  bookingId: string;

  @IsNotEmpty({ message: 'Rating is not empty!' })
  rating: number;

  @IsOptional()
  comment: string;
}
