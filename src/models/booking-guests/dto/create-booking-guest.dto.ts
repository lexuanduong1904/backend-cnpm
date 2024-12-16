import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBookingGuestDto {
  @IsNotEmpty({ message: 'Name is not empty!' })
  bookingId: string;

  @IsNotEmpty({ message: 'Name is not empty!' })
  guestName: string;

  @IsOptional()
  guestPhoneNumber: string;

  @IsOptional()
  guestEmai: string;
}
