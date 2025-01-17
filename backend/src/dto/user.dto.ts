export class CreateUserDto {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}
export class CreateCompanyUserDto {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  businessNumber: string;
}

export class UserLginDto {
  userId: number;
  email: string;
  password: string;
}