import { CreateBookingGuestDto } from '@/models/booking-guests/dto/create-booking-guest.dto';
import { IsNotEmpty } from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty({ message: 'UserId is not empty!' })
  userId: string;

  @IsNotEmpty({ message: 'TourId is not empty!' })
  tourId: string;

  @IsNotEmpty({ message: 'TicketQuantity is not empty!' })
  ticketQuantity: number;

  @IsNotEmpty({ message: 'List guests is not empty!' })
  guests: Omit<CreateBookingGuestDto, 'bookingId'>[] | [];
}
