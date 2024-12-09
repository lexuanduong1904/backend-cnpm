// import { Booking } from '@/models/bookings/model/bookings.model';
// import { Tour } from '@/models/tours/model/tours.model';
// import { User } from '@/models/users/model/users.model';
import { Tour } from '@/models/tours/model/tours.model';
import { User } from '@/models/users/model/users.model';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'Review', freezeTableName: true })
export class Review extends Model {
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

  // @ForeignKey(() => Booking)
  // @Column({
  //   type: DataType.UUID,
  //   allowNull: false,
  // })
  // bookingId: string;

  @Column({
    type: DataType.TINYINT,
    allowNull: false,
  })
  rating: number;

  @Column({
    type: DataType.TEXT,
  })
  comment: string;

  @BelongsTo(() => User, 'userId')
  user: User;

  @BelongsTo(() => Tour, 'tourId')
  tour: Tour;

  // @BelongsTo(() => Booking, 'bookingId')
  // booking: Booking;
}
