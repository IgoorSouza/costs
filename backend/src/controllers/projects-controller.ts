import { FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import {
  createProject,
  getAllProjects,
  getProject,
  removeProject,
  updateProject,
} from "../repositories/projects-repository";
import {
  createProjectValidation,
  updateProjectValidation,
} from "../validation/projects";

interface RequestBody {
  id: string;
  name?: string;
  budget?: number;
  category?: string;
}

interface CreateProjectRequestBody {
  name: string;
  budget: number;
  category: string;
}

export async function create(
  request: FastifyRequest<{ Body: CreateProjectRequestBody }>,
  reply: FastifyReply
) {
  try {
    createProjectValidation.parse(request.body);
    const { userId } = request;

    const project = await createProject({
      ...request.body,
      userId,
    });

    reply.status(201).send(project);
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return reply.status(400).send(error);
    }

    reply.status(500).send(error);
  }
}

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

    if (!project) throw new Error("Project not found.");

    reply.status(200).send(project);
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Project not found") {
      return reply.status(404).send(error.message);
    }

    reply.status(500).send(error);
  }
}

export async function update(
  request: FastifyRequest<{ Body: RequestBody }>,
  reply: FastifyReply
) {
  try {
    updateProjectValidation.parse(request.body);
    const { userId } = request;

    const project = await updateProject({
      ...request.body,
      userId,
    });

    reply.status(200).send(project);
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return reply.status(400).send(error);
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

    await removeProject({
      id,
      userId,
    });

    reply.status(200).send("Project successfully removed.");
  } catch (error: unknown) {
    reply.status(500).send(error);
  }
}
