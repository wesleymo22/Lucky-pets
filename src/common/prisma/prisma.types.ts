import { Prisma } from '@prisma/client';

export type SafeUser = Prisma.UserGetPayload<{
  select: {
    id: true;
    email: true;
    name: true;
    createdAt: true;
  };
}>;

export type UserWithPets = Prisma.UserGetPayload<{
  include: {
    pets: true;
  };
}>;

export type PetWithAppointments = Prisma.PetGetPayload<{
  include: {
    appointments: true;
  };
}>;