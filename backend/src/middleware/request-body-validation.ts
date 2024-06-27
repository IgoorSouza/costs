import { FastifyReply, FastifyRequest } from "fastify";
import { ZodError, ZodSchema } from "zod";
import { Register, Login } from "../interfaces/users";
import { CreateProject, UpdateProject } from "../interfaces/projects";
import { CreateService } from "../interfaces/services";

export default function requestBodyValidation(validation: ZodSchema) {
  return async (
    request: FastifyRequest<{
      Body: Register | Login | CreateProject | UpdateProject | CreateService;
    }>,
    reply: FastifyReply,
    done: () => void
  ) => {
    try {
      await validation.parseAsync(request.body);
      done();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return reply.status(400).send("Validation error: " + error);
      }

      return reply.status(500).send(error);
    }
  };
}
