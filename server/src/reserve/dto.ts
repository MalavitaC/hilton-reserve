import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsDateString,
  IsMobilePhone,
  IsNotEmpty,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class AddReserveDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  guestName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsMobilePhone(['zh-CN'])
  guestPhone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  reserveDateTime: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  @Min(1)
  tableSize: number;
}

export class ModifyReserveDto extends PartialType(AddReserveDto) {}
