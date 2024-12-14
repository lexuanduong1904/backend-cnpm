import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingGuestDto } from './create-booking-guest.dto';

export class UpdateBookingGuestDto extends PartialType(CreateBookingGuestDto) {}
