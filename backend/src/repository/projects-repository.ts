import prisma from "../services/prisma";

interface CreateProject {
  name: string;
  budget: number;
  category: string;
  userId: string;
}

interface UpdateProject {
  id: string;
  name?: string;
  budget?: number;
  category?: string;
  userId: string;
}

interface RemoveProject {
  id: string;
  userId: string;
}

export async function createProject(project: CreateProject) {
  return await prisma.project.create({
    data: project,
  });
}

export async function getUserProjects(userId: string) {
  return await prisma.project.findMany({
    where: {
      userId,
    },
  });
}

export async function updateProject(project: UpdateProject) {
  return await prisma.project.update({
    where: {
      id: project.id,
      userId: project.userId,
    },
    data: project,
  });
}

export async function removeProject({ id, userId }: RemoveProject) {
  return await prisma.project.delete({
    where: {
      id,
      userId,
    },
  });
}
