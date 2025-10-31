import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports: [UsersModule],
  controllers: [PetsController],
  providers: [PetsService],
})
export class PetsModule {}
