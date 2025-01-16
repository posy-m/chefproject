
import { Column, DataType, Model, Table } from 'sequelize-typescript';


@Table({
  tableName: 'managerSite'
})

export class ManagerSite extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  statisticsID: number
}