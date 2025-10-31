import { PrismaClient, Species, ServiceType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // 1️⃣ Criar usuário
  const passwordHash = await bcrypt.hash('Teste@123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'teste@teste.com' },
    update: {},
    create: {
      email: 'teste@teste.com',
      password: passwordHash,
      name: 'Usuário de Teste',
    },
  });

  // 2️⃣ Criar pets
  const pet1 = await prisma.pet.create({
    data: {
      name: 'Lucky',
      species: Species.CACHORRO,
      age: 3,
      weight: 15.5,
      notes: 'Tem alergia ao shampo X',
      ownerId: user.id,
    },
  });

  const pet2 = await prisma.pet.create({
    data: {
      name: 'Max',
      species: Species.GATO,
      age: 2,
      weight: 4.2,
      notes: 'Gato laranja com as patas brancas',
      ownerId: user.id,
    },
  });

  // 3️⃣ Criar agendamentos
  await prisma.appointment.createMany({
    data: [
      {
        date: new Date('2025-11-10T10:00:00Z'),
        service: ServiceType.CONSULTA_GERAL,
        notes: 'Revisão anual',
        petId: pet1.id,
      },
      {
        date: new Date('2025-11-12T14:30:00Z'),
        service: ServiceType.VACINACAO,
        notes: 'Vacina antirrábica',
        petId: pet2.id,
      },
    ],
  });

  console.log('✅ Seed executado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
