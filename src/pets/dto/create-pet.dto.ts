import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Species } from '@prisma/client';

export class CreatePetDto {
  @IsString()
  name: string;

  @IsString()
  @IsEnum(Species, {message: 'species must bo one of: CACHORRO, GATO, OUTROS'})
  species: Species;

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
