import { FastifyReply, FastifyRequest } from "fastify";
import {
  createProject,
  getUserProjects,
  removeProject,
  updateProject,
} from "../repository/projects-repository";
import {
  createProjectValidation,
  removeProjectValidation,
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

export async function get(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { userId } = request;
    const projects = await getUserProjects(userId);

    reply.status(200).send(projects);
  } catch (error: any) {
    reply.status(400).send(error);
  }
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
  } catch (error: any) {
    reply.status(400).send(error);
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
  } catch (error: any) {
    if (error.code === "P2025") {
      return reply.status(404).send("Project not found.");
    }

    reply.status(400).send(error);
  }
}

export async function remove(
  request: FastifyRequest<{ Body: RequestBody }>,
  reply: FastifyReply
) {
  try {
    removeProjectValidation.parse(request.body);

    const { userId } = request;
    await removeProject({
      id: request.body.id,
      userId,
    });

    reply.status(200).send("Project successfully removed.");
  } catch (error: any) {
    if (error.code === "P2025") {
      return reply.status(404).send("Project not found.");
    }

    reply.status(400).send(error);
  }
}
