import prisma from "../services/prisma";
import {
  CreateProject as ProjectData,
  UpdateProject as NewProjectData,
} from "../interfaces/projects";

export async function getAllProjects(userId: string) {
  return await prisma.project.findMany({
    where: {
      userId,
    },
  });
}

export async function getProject({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) {
  return await prisma.project.findUniqueOrThrow({
    where: {
      id,
      userId,
    },
    select: {
      id: true,
      name: true,
      budget: true,
      category: true,
      services: true,
    },
  });
}

export async function createProject(projectData: ProjectData) {
  return await prisma.project.create({
    data: projectData,
  });
}

export async function updateProject(newProjectData: NewProjectData) {
  return await prisma.project.update({
    where: {
      id: newProjectData.id,
      userId: newProjectData.userId,
    },
    data: newProjectData,
  });
}

export async function removeProject({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) {
  return await prisma.project.delete({
    where: {
      id,
      userId,
    },
  });
}
