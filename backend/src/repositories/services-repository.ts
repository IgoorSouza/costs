import prisma from "../services/prisma";

interface ServiceData {
  name: string;
  cost: number;
  description?: string;
  projectId: string;
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
