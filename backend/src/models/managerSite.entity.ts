
import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Users } from './userDB.entity';


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

  @Column({
    type: DataType.INTEGER
  })
  userId: number

  @BelongsTo(() => Users, {
    foreignKey: 'userId',
    targetKey: 'userId'
  })
  users: Users
}