import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Species } from '@prisma/client';

export class CreatePetDto {
  @ApiProperty({ example: 'Lucky' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'CACHORRO', enum: Species })
  @IsEnum(Species, {
    message: 'species must be one of: CACHORRO, GATO, OUTROS',
  })
  species: Species;

  @ApiPropertyOptional({ example: 3 })
  @IsOptional()
  @IsNumber()
  age?: number;

  @ApiPropertyOptional({ example: 5.4 })
  @IsOptional()
  @IsNumber()
  weight?: number;

  @ApiProperty({ example: 1, description: 'ID do dono do pet' })
  @IsNumber()
  ownerId: number;

  @ApiPropertyOptional({ example: 'Pet amigável' })
  @IsOptional()
  @IsString()
  notes?: string;
}
