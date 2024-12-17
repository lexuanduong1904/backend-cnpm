import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateInvoiceDto {
  @IsNotEmpty({ message: 'BookingId is not empty!' })
  bookingId: string;

  @IsOptional()
  details: string;
}
