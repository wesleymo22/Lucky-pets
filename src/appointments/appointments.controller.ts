import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('Appointments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo agendamento' })
  @ApiResponse({ status: 201, description: 'Agendamento criado com sucesso.' })
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os agendamentos' })
  @ApiQuery({ name: 'date', required: false, description: 'Filtrar por data (YYYY-MM-DD)' })
  @ApiQuery({ name: 'service', required: false, description: 'Filtrar por tipo de serviço' })
  @ApiResponse({ status: 200, description: 'Agendamentos retornados com sucesso.' })
  findAll(@Query('date') date?: string, @Query('service') service?: string) {
    return this.appointmentsService.findAll({ date, service });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um agendamento pelo ID' })
  @ApiResponse({ status: 200, description: 'Agendamento encontrado.' })
  @ApiResponse({ status: 404, description: 'Agendamento não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um agendamento pelo ID' })
  @ApiResponse({ status: 200, description: 'Agendamento atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Agendamento não encontrado.' })
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentsService.update(+id, updateAppointmentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um agendamento pelo ID' })
  @ApiResponse({ status: 200, description: 'Agendamento removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Agendamento não encontrado.' })
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(+id);
  }
}
