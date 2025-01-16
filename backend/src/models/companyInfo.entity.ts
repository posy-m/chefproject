import { Column, DataType, Model, Table } from 'sequelize-typescript';


@Table({
  tableName: 'companyInfo'
})

export class CompanyInfo extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
  })
  businessID: number; // 외래 키

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  businessNumber: string

}