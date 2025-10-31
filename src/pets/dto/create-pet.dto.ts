import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePetDto {
  @IsString()
  name: string;

  @IsString()
  species: string;

  @IsOptional()
  @IsNumber()
  age?: number;

  @IsOptional()
  @IsNumber()
  weight?: number;
  
  @IsNumber()
  ownerId: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
