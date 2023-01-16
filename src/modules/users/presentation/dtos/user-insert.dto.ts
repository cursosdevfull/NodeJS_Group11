import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

export enum DocumentType {
  DNI = "DNI",
  RUC = "RUC",
  CE = "CE",
}

export class UserInsertDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(7)
  password: string;

  @IsArray()
  roles: number[];

  @IsEnum(DocumentType)
  documentType: string;
}
