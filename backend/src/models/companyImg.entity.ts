import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript';
import { RecruitmentNotice } from './recruitmentNotice.entity';


@Table({
  tableName: 'companyImg',
  timestamps: true

})

export class CompanyImg extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  imageId: number

  @Column({
    type: DataType.INTEGER,
  })
  companyId: number

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  imgUrl: string;

  @BelongsTo(() => RecruitmentNotice, {
    foreignKey: 'companyId',
    targetKey: 'companyId'
  })
  recruitmentNotice: RecruitmentNotice;

}



