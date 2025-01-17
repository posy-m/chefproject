import { AutoIncrement, BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript';
import { RecruitmentNotice } from './recruitmentNotice.entity';
import { Users } from './userDB.entity';


@Table({
  tableName: 'supportDetails',
  timestamps: true
})

export class SupportDetails extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  applicationId: number;

  @Column({
    type: DataType.INTEGER
  })
  userId: number

  @Column({
    type: DataType.INTEGER
  })
  companyId: number

  // users
  @BelongsTo(() => Users, {
    foreignKey: 'userId',
    targetKey: 'userId'
  })
  users: Users


  // 채용 공고 
  @BelongsTo(() => RecruitmentNotice, {
    foreignKey: 'companyId',
    targetKey: 'companyId'
  })
  recruitmentNotice: RecruitmentNotice;

}