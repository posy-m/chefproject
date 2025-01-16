import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'savedAnnouncement',
  timestamps: true,
})

export class SavedAnnouncement extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  savedID: number;

}