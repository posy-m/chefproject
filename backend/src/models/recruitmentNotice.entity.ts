import { BelongsTo, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { CompanyImg } from './companyImg.entity';
import { SupportDetails } from './supportDetails.entity';
import { SavedAnnouncement } from './savedAnnouncement.entity';
import { Users } from './userDB.entity';

@Table({
  tableName: 'recruitmentNotice',
  updatedAt: true
})

export class RecruitmentNotice extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  companyId: number

  @Column({
    type: DataType.INTEGER
  })
  userId: number

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  region: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  work: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  personalHistory: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string

  // users

  @BelongsTo(() => Users, {
    foreignKey: 'userId',
    targetKey: 'userId'
  })
  user: Users;

  // 저장한 이미지
  @HasMany(() => CompanyImg, {
    sourceKey: 'companyId',
    foreignKey: 'companyId',

  })
  companyImg: CompanyImg[]

  // 저장한 공고
  @HasMany(() => SavedAnnouncement, {
    sourceKey: 'companyId',
    foreignKey: 'companyId',
  })
  savedAnnouncement: SavedAnnouncement[]


  // 지원공고
  @HasMany(() => SupportDetails, {
    foreignKey: 'companyId',
    sourceKey: 'companyId'
  })
  supportDetails: SupportDetails[];
}