import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
  createProject,
  getAllProjects,
  getProject,
  removeProject,
  updateProject,
} from "../repositories/projects-repository";
import {
  CreateProject as CreateProjectRequestBody,
  UpdateProject as UpdateProjectRequestBody,
} from "../interfaces/projects";

export async function getAll(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { userId } = request;

    const projects = await getAllProjects(userId);

    reply.status(200).send(projects);
  } catch (error: unknown) {
    reply.status(500).send(error);
  }
}

export async function getOne(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const { userId } = request;

    const project = await getProject({ id, userId });

    reply.status(200).send(project);
  } catch (error: unknown) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return reply.status(404).send("Project does not exist.");
    }

    reply.status(500).send(error);
  }
}

export async function create(
  request: FastifyRequest<{ Body: CreateProjectRequestBody }>,
  reply: FastifyReply
) {
  try {
    const { userId } = request;

    const project = await createProject({
      ...request.body,
      userId,
    });

    reply.status(201).send(project);
  } catch (error: unknown) {
    reply.status(500).send(error);
  }
}

export async function update(
  request: FastifyRequest<{ Body: UpdateProjectRequestBody }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.body;
    const { userId } = request;

    await getProject({ id, userId });
    const project = await updateProject({
      ...request.body,
      userId,
    });

    reply.status(200).send(project);
  } catch (error: unknown) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return reply.status(404).send("Project does not exist.");
    }

    reply.status(500).send(error);
  }
}

export async function remove(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const { userId } = request;

    await getProject({ id, userId });
    await removeProject({
      id,
      userId,
    });

    reply.status(200).send("Project successfully removed.");
  } catch (error: unknown) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return reply.status(404).send("Project does not exist.");
    }

    reply.status(500).send(error);
  }
}
