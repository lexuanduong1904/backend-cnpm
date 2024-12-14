import { IsNotEmpty } from 'class-validator';

export class CreateBookingGuestDto {
  @IsNotEmpty({ message: 'Name is not empty!' })
  guestName: string;
}
