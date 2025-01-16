import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';


@Table({
  tableName: 'companyImg',
  timestamps: true

})

export class CompanyImg extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
  })
  imageId: number

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  imgUrl: string;
}



