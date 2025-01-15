import { Column, DataType, Model, Table } from 'sequelize-typescript';


@Table({
  tableName: 'componyNumber'
})

export class ComponyNumber extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true
  })
  businessNumber: string
}