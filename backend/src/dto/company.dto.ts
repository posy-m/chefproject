import { IsNumber, IsString, IsArray, IsOptional } from 'class-validator';


// 채용공고
export class CreateRecruimenDto {

  @IsString()
  region: string;

  @IsString()
  work: string;

  @IsString()
  personalHistory: string;

  @IsString()
  content: string

  @IsArray()  // 여러 이미지를 배열로 저장
  @IsOptional()
  imageId?: number[];  // 이미지 테이블의 id를 저장
}

export class UpdateRecruimenDto extends CreateRecruimenDto {
  @IsNumber()
  companyId: number
}

export class DeleteRecruimenDto {
  @IsNumber()
  companyId: number
}