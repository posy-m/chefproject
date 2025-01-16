import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { RecruitmentNotice } from './recruitmentNotice.entity';


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

  // 채용 공고 
  @HasMany(() => RecruitmentNotice, {
    foreignKey: 'applicationId',
    sourceKey: 'comapnyId'
  })
  recruitmentNotice: RecruitmentNotice[]
}