import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsStrongPassword,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Senha@123',
    description: 'Senha forte com letras, números e símbolos',
  })
  @IsStrongPassword()
  password: string;

  @ApiProperty({ example: 'João da Silva' })
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  name: string;
}
