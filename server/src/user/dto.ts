import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddUserDto {
  @IsString()
  @IsNotEmpty()
  account: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNumber()
  @IsNotEmpty()
  @IsIn([0, 1])
  role: 0 | 1;
}
