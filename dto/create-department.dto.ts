import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CreateDepartmentDto {
  @IsNotEmpty()
  name: string;
  
}