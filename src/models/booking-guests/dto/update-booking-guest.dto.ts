import { IsOptional } from 'class-validator';

export class UpdateBookingGuestDto {
  @IsOptional()
  guestName: string;

  @IsOptional()
  guestPhoneNumber: string;

  @IsOptional()
  guestEmai: string;
}
