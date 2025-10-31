import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PetsService {
   constructor(private prisma: PrismaService, private readonly userService: UsersService,) {}

  async create(createPetDto: CreatePetDto) {
    await this.userService.findOne(createPetDto.ownerId);

    return this.prisma.pet.create({
      data: {
        ...createPetDto,
      },
    });
  }

  async findAll() {
    return this.prisma.pet.findMany();
  }

  async findOne(id: number) {
    const pet = await this.prisma.pet.findUnique({ where: { id } });
    if (!pet) throw new NotFoundException('Pet not found');
    return pet;
  }

  async update(id: number, updatePetDto: UpdatePetDto) {
    const pet = await this.findOne(id);
    return this.prisma.pet.update({
      where: { id: pet.id },
      data: updatePetDto,
    });
  }

  async remove(id: number) {
    const pet = await this.findOne(id);
    return this.prisma.pet.delete({ where: { id: pet.id } });
  }
}
