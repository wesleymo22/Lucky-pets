import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    // Verifica se o pet pertence ao usuário autenticado
    const pet = await this.prisma.pet.findUnique({
      where: { id: createAppointmentDto.petId },
      select: { ownerId: true },
    });

    if (!pet) throw new NotFoundException('Pet not found');

    return this.prisma.appointment.create({
      data: {
        ...createAppointmentDto,
        date: new Date(createAppointmentDto.date),
      },
    });
  }

  async findAll(filters?: { date?: string; service?: string }) {
    const where: any = {};

    if (filters?.date) {
      const startOfDay = new Date(filters.date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(filters.date);
      endOfDay.setHours(23, 59, 59, 999);

      where.date = {
        gte: startOfDay,
        lte: endOfDay,
      };
    }

    if (filters?.service) {
      where.service = {
        contains: filters.service,
        mode: 'insensitive',
      };
    }

    return this.prisma.appointment.findMany({
      where,
      include: {
        pet: {
          select: { id: true, name: true, species: true },
        },
      },
      orderBy: { date: 'asc' },
    });
  }

  async findOne(id: number) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
      include: { pet: true },
    });

    if (!appointment) throw new NotFoundException('Appointment not found');

    return appointment;
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    await this.findOne(id);
    return this.prisma.appointment.update({
      where: { id },
      data: {
        ...updateAppointmentDto,
        ...(updateAppointmentDto.date && { date: new Date(updateAppointmentDto.date) }),
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.appointment.delete({ where: { id } });
  }
}
