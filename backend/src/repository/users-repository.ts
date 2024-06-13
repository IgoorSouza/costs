import prisma from "../services/prisma";

interface UserData {
  name: string;
  email: string;
  password: string;
}

export async function createUser(userData: UserData) {
  return await prisma.user.create({
    data: userData,
  });
}

export async function findUser(userEmail: string) {
  return await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      projects: true,
    },
  });
}
