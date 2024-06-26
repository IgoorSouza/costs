import { FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import {
  createService,
  removeService,
} from "../repositories/services-repository";
import { createServiceValidation } from "../validation/services";

interface ServiceData {
  name: string;
  cost: number;
  description?: string;
  projectId: string;
}

export async function create(
  request: FastifyRequest<{ Body: ServiceData }>,
  reply: FastifyReply
) {
  try {
    createServiceValidation.parse(request.body);

    const service = await createService(request.body);

    reply.status(200).send(service);
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

    await removeService(id);

    reply.status(200).send("Service successfully removed.");
  } catch (error: unknown) {
    reply.status(500).send(error);
  }
}
