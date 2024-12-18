import { Controller } from '@nestjs/common';
import { BookingGuestsService } from './booking-guests.service';

@Controller('booking-guests')
export class BookingGuestsController {
  constructor(private readonly bookingGuestsService: BookingGuestsService) {}
}
