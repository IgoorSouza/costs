import { FastifyReply, FastifyRequest } from "fastify";
import {
  createService,
  getService,
  removeService,
} from "../repositories/services-repository";
import { CreateService as CreateServiceRequestBody } from "../interfaces/services";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function create(
  request: FastifyRequest<{ Body: CreateServiceRequestBody }>,
  reply: FastifyReply
) {
  try {
    const service = await createService(request.body);

    reply.status(200).send(service);
  } catch (error: unknown) {
    reply.status(500).send(error);
  }
}

export async function remove(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;

    await getService(id);
    await removeService(id);

    reply.status(200).send("Service successfully removed.");
  } catch (error: unknown) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return reply.status(404).send("Service does not exist.");
    }

    reply.status(500).send(error);
  }
}
