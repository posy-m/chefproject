import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class SignUpPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value || typeof value !== 'object') {
      throw new BadRequestException('입력 형식이 잘못 되었습니다.')
    }

    const requiredFields = ['name', 'email', 'phoneNumber', 'password'];
    for (const field of requiredFields) {
      if (!value[field]) {
        throw new BadRequestException(`필수 입력값 ${field}를 확인해주세요.`);
      }
    }

    const password = value.password;
    if (typeof password !== 'string') {
      throw new BadRequestException('비밀번호는 문자열이어야 합니다.');
    }

    if (password.length < 5 || password.length > 20) {
      throw new BadRequestException('비밀번호는 최소 5자 이상 20자 이내이어야 합니다.');
    }


    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).*$/;
    if (!passwordRegex.test(password)) {
      throw new BadRequestException('비밀번호는 최소 하나의 문자, 숫자, 특수문자를 포함해야 합니다.');
    }

    return value;
  }
}

@Injectable()
export class LoginPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {

    if (!value || typeof value !== 'object') {
      throw new BadRequestException('입력 형식이 잘못 되었습니다.')
    }

    const password = value.password;
    if (typeof password !== 'string') {
      throw new BadRequestException('비밀번호는 문자열이어야 합니다.');
    }

    if (password.length < 5 || password.length > 20) {
      throw new BadRequestException('비밀번호는 최소 5자 이상 20자 이내이어야 합니다.');
    }


    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).*$/;
    if (!passwordRegex.test(password)) {
      throw new BadRequestException('비밀번호는 최소 하나의 문자, 숫자, 특수문자를 포함해야 합니다.');
    }

  }
}