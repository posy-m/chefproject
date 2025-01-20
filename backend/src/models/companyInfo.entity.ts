import { BelongsTo, Column, DataType, Model, Table, ForeignKey } from 'sequelize-typescript';
import { Users } from './userDB.entity';

@Table({
  tableName: 'companyInfo'
})

export class CompanyInfo extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  businessID: number;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER
  })
  userId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  businessNumber: string;

  @BelongsTo(() => Users, {
    foreignKey: 'userId',
    targetKey: 'userId'
  })
  users: Users;
}
