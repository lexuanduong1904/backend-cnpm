import { PaymentMethodEnum } from '@/types/enums/payment-method.enum';
import { IsNotEmpty } from 'class-validator';

export class CreateCheckoutDto {
  @IsNotEmpty({ message: 'BookingId is not empty!' })
  bookingId: string;

  @IsNotEmpty({ message: 'Payment Method is not empty!' })
  paymentMethod: PaymentMethodEnum;
}
