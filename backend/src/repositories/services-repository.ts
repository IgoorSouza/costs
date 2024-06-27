import prisma from "../services/prisma";
import { CreateService as ServiceData } from "../interfaces/services";

export async function getService(id: string) {
  return await prisma.service.findUniqueOrThrow({
    where: {
      id,
    },
  });
}

export async function createService(serviceData: ServiceData) {
  return await prisma.service.create({
    data: serviceData,
  });
}

export async function removeService(id: string) {
  return await prisma.service.delete({
    where: {
      id,
    },
  });
}
