import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'savedAnnouncement',
  timestamps: true,
})

export class SavedAnnouncement extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true
  })
  savedID: number;

}