// 이력서, 지원내역, 저장한공고

import { IsNumber, IsString } from 'class-validator';

//이력서
export class CreateResumeDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  file: string;
}

//이력서 수정
export class UpdateResumeDto extends CreateResumeDto {
  @IsNumber()
  resumeId: number;
}

//이력서 삭제
export class DeleteResumeDto {
  @IsNumber()
  resumeID: number;
}

// 지원내역
export class SupportDetailsDto {

}