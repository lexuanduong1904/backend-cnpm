import { Booking } from '@/models/bookings/model/bookings.model';

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

  @ForeignKey(() => Booking)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  bookingId: string;

  @Column({
    type: DataType.TINYINT,
    allowNull: false,
  })
  rating: number;

  @Column({
    type: DataType.TEXT,
  })
  comment: string;

  @BelongsTo(() => Booking, 'bookingId')
  booking: Booking;
}
