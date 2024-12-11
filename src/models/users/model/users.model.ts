import { hashPasswordHelper } from '@/helpers/utils';
import { Booking } from '@/models/bookings/model/bookings.model';
import {
  BeforeCreate,
  BeforeUpdate,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'User', freezeTableName: true })
export class User extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phoneNumber: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isAdmin: boolean;

  @HasMany(() => Booking)
  bookings: Booking[];

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(instance: User) {
    if (instance.password) {
      instance.password = await hashPasswordHelper(instance.password);
    }
  }
}
