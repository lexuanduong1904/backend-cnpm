// import { Review } from '@/models/reviews/model/reviews.model';
import { BookingGuests } from '@/models/booking-guests/model/booking-guests.model';
import { Checkout } from '@/models/checkouts/model/checkouts.model';
import { Invoice } from '@/models/invoices/model/invoices.model';
import { Review } from '@/models/reviews/model/reviews.model';
import { Tour } from '@/models/tours/model/tours.model';
import { User } from '@/models/users/model/users.model';
import { BookingStatusEnum } from '@/types/enums/booking-status.enum';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'Booking', freezeTableName: true })
export class Booking extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @ForeignKey(() => Tour)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  tourId: string;

  @Column({
    type: DataType.ENUM(...Object.values(BookingStatusEnum)),
    allowNull: false,
    defaultValue: BookingStatusEnum.Pending,
  })
  status: BookingStatusEnum;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  bookingDate: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
  })
  ticketQuantity: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  totalPrice: number;

  @BelongsTo(() => User, 'userId')
  user: User;

  @BelongsTo(() => Tour, 'tourId')
  tour: Tour;

  @HasOne(() => Review)
  review: Review;

  @HasOne(() => Checkout)
  checkout: Checkout;

  @HasMany(() => BookingGuests)
  bookingGuests: BookingGuests[];

  @HasOne(() => Invoice)
  invoice: Invoice;
}
