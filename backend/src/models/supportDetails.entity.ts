import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { RecruitmentNotice } from './recruitmentNotice.entity';
import { Users } from './userDB.entity';
import { Resume } from './resume.entity';


@Table({
  tableName: 'supportDetails',
  timestamps: true
})

export class SupportDetails extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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

  @ForeignKey(() => Resume)
  @Column
  resumeId: number;

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

  //Resume
  @BelongsTo(() => Resume)
  resume: Resume;

}