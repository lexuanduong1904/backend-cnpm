import { Booking } from '@/models/bookings/model/bookings.model';
import { Image } from '@/models/images/model/images.model';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'Tour', freezeTableName: true })
export class Tour extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  destination: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  startLocation: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  transportation: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  startDate: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  endDate: Date;

  @HasMany(() => Booking)
  bookings: Booking[];

  @HasMany(() => Image)
  images: Image[];
}
