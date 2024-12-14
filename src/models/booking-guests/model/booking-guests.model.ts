import { Booking } from '@/models/bookings/model/bookings.model';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'BookingGuests', freezeTableName: true })
export class BookingGuests extends Model {
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
    type: DataType.STRING(100),
    allowNull: false,
  })
  guestName: string;

  @Column({
    type: DataType.STRING(15),
    allowNull: true,
  })
  guestPhoneNumber: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  guestEmail: string;

  @BelongsTo(() => Booking, 'bookingId')
  booking: Booking;
}
