import { Tour } from '@/models/tours/model/tours.model';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'Image', freezeTableName: true })
export class Image extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

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
  imageUrl: string;

  @Column({
    type: DataType.TEXT,
  })
  description: string;

  @BelongsTo(() => Tour, 'tourId')
  tour: Tour;
}
