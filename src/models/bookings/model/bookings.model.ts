// import { Review } from '@/models/reviews/model/reviews.model';
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
    type: DataType.STRING(100),
    allowNull: false,
  })
  status: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  bookingDate: Date;

  @BelongsTo(() => User, 'userId')
  user: User;

  @BelongsTo(() => Tour, 'tourId')
  tour: Tour;
}
