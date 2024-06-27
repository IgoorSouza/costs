import prisma from "../services/prisma";
import { Register as UserData } from "../interfaces/users";

export async function createUser(userData: UserData) {
  return await prisma.user.create({
    data: userData,
  });
}

export async function getUser(userEmail: string) {
  return await prisma.user.findUniqueOrThrow({
    where: {
      email: userEmail,
    },
    select: {
      id: true,
      name: true,
      password: true,
    },
  });
}
