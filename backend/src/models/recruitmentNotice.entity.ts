import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { CompanyImg } from './companyImg.entity';

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

  // 저장한 이미지
  @HasMany(() => CompanyImg, {
    sourceKey: 'companyId',
    foreignKey: 'imageId',
  })
  companyImg: CompanyImg[]
}