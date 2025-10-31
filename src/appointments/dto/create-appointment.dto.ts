import { ServiceType } from "@prisma/client";
import { IsDateString, IsEnum, IsInt, IsOptional, IsString } from "class-validator";

export class CreateAppointmentDto {
  @IsDateString()
  date: string;

  @IsString()
  @IsEnum(ServiceType)
  service: ServiceType;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsInt()
  petId: number;
}
