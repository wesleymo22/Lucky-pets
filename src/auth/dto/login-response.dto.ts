import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', description: 'Token JWT gerado após login' })
  access_token: string;
    
  @ApiProperty({ example: '3200', description: 'Tempo de expiração do token' })
  expiresIn: number
}
