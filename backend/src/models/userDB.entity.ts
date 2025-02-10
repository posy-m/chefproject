import { Table, Model, Column, DataType, HasMany, HasOne } from 'sequelize-typescript';
import { RecruitmentNotice } from './recruitmentNotice.entity';
import { Resume } from './resume.entity';
import { ManagerSite } from './managerSite.entity';
import { SupportDetails } from './supportDetails.entity';
import { SavedAnnouncement } from './savedAnnouncement.entity';
import { CompanyInfo } from './companyInfo.entity';


export enum UserType {
  COMPANY = 'company',
  PERSONAL = 'personal',
  ADMIN = 'admin'
}

@Table({
  timestamps: true,
  tableName: 'userDB'
})


export class Users extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })
  userId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      isNumeric: true
    },
    unique: true
  })
  phoneNumber: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ENUM(...Object.values(UserType))
  })
  userType: UserType;

  //사업자 등록증
  @HasOne(() => CompanyInfo, {
    sourceKey: 'userId',
    foreignKey: 'userId'
  })
  companyInfo: CompanyInfo;

  // 채용 공고
  @HasMany(() => RecruitmentNotice, {
    sourceKey: 'userId',
    foreignKey: 'userId'
  })
  recruitmentNotice: RecruitmentNotice[]


  // 이력서
  @HasMany(() => Resume, {
    sourceKey: 'userId',
    foreignKey: 'userId'
  })
  resume: Resume[]

  // 관리자 사이트
  @HasMany(() => ManagerSite, {
    sourceKey: 'userId',
    foreignKey: 'userId'
  })
  managerSite: ManagerSite[]

  // 지원내역 
  @HasMany(() => SupportDetails, {
    sourceKey: 'userId',
    foreignKey: 'userId'
  })
  applicationId: SupportDetails[]

  // 저장한 공고 
  @HasMany(() => SavedAnnouncement, {
    sourceKey: 'userId',
    foreignKey: 'userId'
  })
  savedAnnouncement: SavedAnnouncement[]


}