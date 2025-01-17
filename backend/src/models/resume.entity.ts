import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Users } from './userDB.entity';

@Table({
  tableName: 'resume',
  timestamps: true
})

export class Resume extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  resumeID: number;

  @Column({
    type: DataType.INTEGER
  })
  userId: number

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  file: string;

  @BelongsTo(() => Users, {
    foreignKey: 'userId',
    targetKey: 'userId'
  })
  users: Users
}