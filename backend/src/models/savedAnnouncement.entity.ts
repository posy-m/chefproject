import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript';
import { RecruitmentNotice } from './recruitmentNotice.entity';
import { Users } from './userDB.entity';

@Table({
  tableName: 'savedAnnouncement',
  timestamps: true,
})

export class SavedAnnouncement extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  savedID: number;

  @Column({
    type: DataType.INTEGER
  })
  userId: number

  @Column({
    type: DataType.INTEGER
  })
  companyId: number

  @BelongsTo(() => Users, {
    foreignKey: 'userId',
    targetKey: 'userId'
  })
  users: Users;

  @BelongsTo(() => RecruitmentNotice, {
    foreignKey: 'companyId',
    targetKey: 'companyId'
  })
  recruitmentNotice: RecruitmentNotice;

}