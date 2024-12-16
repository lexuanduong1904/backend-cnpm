import { CreateBookingGuestDto } from '@/models/booking-guests/dto/create-booking-guest.dto';
import { BookingStatusEnum } from '@/types/enums/booking-status.enum';
import { IsOptional } from 'class-validator';

export class UpdateBookingDto {
  @IsOptional()
  status: BookingStatusEnum;

  @IsOptional()
  ticketQuantity: number;

  @IsOptional()
  guests: Omit<CreateBookingGuestDto, 'bookingId'>[] | [];
}
