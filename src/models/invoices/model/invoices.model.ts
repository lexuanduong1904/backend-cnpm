import { Booking } from '@/models/bookings/model/bookings.model';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'Invoice', freezeTableName: true })
export class Invoice extends Model {
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
  amout: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  dateIssued: Date;

  @Column({
    type: DataType.TEXT,
  })
  details: string;

  @BelongsTo(() => Booking)
  booking: Booking;
}
