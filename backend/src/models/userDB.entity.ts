import { Table, Model, Column, DataType } from 'sequelize-typescript';

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
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  })
  user_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      isNumeric: true
    }
  })
  phoneNumber: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ENUM(...Object.values(UserType)),
    allowNull: false,
  })
  userType: UserType;
}