import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async create(createAppointmentDto: CreateAppointmentDto, userId: number) {
    // Verifica se o pet pertence ao usuário autenticado
    const pet = await this.prisma.pet.findUnique({
      where: { id: createAppointmentDto.petId },
      select: { ownerId: true },
    });

    if (!pet) throw new NotFoundException('Pet not found');
    if (pet.ownerId !== userId)
      throw new ForbiddenException('You do not have permission to create an appointment for this pet');

    return this.prisma.appointment.create({
      data: {
        ...createAppointmentDto,
        date: new Date(createAppointmentDto.date),
      },
    });
  }

  async findAll(userId: number, filters?: { date?: string; service?: string }) {
    const pets = await this.prisma.pet.findMany({
      where: { ownerId: userId },
      select: { id: true },
    });

    const petIds = pets.map((p) => p.id);

    return this.prisma.appointment.findMany({
      where: {
        petId: { in: petIds },
        ...(filters?.date && {
          date: {
            gte: new Date(filters.date),
            lt: new Date(new Date(filters.date).setDate(new Date(filters.date).getDate() + 1)),
          },
        }),
      },
      include: { pet: true },
      orderBy: { date: 'asc' },
    });
  }

  async findOne(id: number, userId: number) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
      include: { pet: true },
    });

    if (!appointment) throw new NotFoundException('Appointment not found');
    if (appointment.pet.ownerId !== userId)
      throw new ForbiddenException('You do not have access to this appointment');

    return appointment;
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto, userId: number) {
    await this.findOne(id, userId);
    return this.prisma.appointment.update({
      where: { id },
      data: {
        ...updateAppointmentDto,
        ...(updateAppointmentDto.date && { date: new Date(updateAppointmentDto.date) }),
      },
    });
  }

  async remove(id: number, userId: number) {
    await this.findOne(id, userId);
    return this.prisma.appointment.delete({ where: { id } });
  }
}
