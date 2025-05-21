import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CreateAddressDto {
  @IsNotEmpty()
  line1: string;

  @IsNotEmpty()
  @IsInt()
  pincode: number;
  
}