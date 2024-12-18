import { Booking } from '@/models/bookings/model/bookings.model';
import { PaymentMethodEnum } from '@/types/enums/payment-method.enum';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'Checkout', freezeTableName: true })
export class Checkout extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => Booking)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  bookingId: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  amount: number;

  @Column({
    type: DataType.ENUM(...Object.values(PaymentMethodEnum)),
    allowNull: false,
  })
  paymentMethod: PaymentMethodEnum;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  paymentDate: Date;

  @BelongsTo(() => Booking, 'bookingId')
  booking: Booking;
}
