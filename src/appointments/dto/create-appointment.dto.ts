import { IsDateString, IsInt, IsOptional, IsString } from "class-validator";

export class CreateAppointmentDto {
  @IsDateString()
  date: string;

  @IsString()
  service: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsInt()
  petId: number;
}
