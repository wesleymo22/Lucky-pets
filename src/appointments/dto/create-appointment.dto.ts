import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ServiceType } from '@prisma/client';
import { IsDateString, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({ example: '2025-11-10T10:00:00.000Z' })
  @IsDateString()
  date: string;

  @ApiProperty({ example: ServiceType.CONSULTA_GERAL, enum: ServiceType })
  @IsEnum(ServiceType)
  service: ServiceType;

  @ApiPropertyOptional({ example: 'Revisão anual' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ example: 1, description: 'ID do pet' })
  @IsInt()
  petId: number;
}
