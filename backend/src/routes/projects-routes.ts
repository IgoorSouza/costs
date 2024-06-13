import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import {
  get,
  create,
  update,
  remove,
} from "../controllers/projects-controller";

declare module "fastify" {
  interface FastifyRequest {
    userId: string;
  }
}

export default async function projectsRoutes(server: FastifyInstance) {
  server.decorateRequest("userId", null);
  server.addHook("preHandler", checkAuthentication);
  server.get("/", get);
  server.post("/create", create);
  server.put("/update", update);
  server.delete("/remove", remove);
}

function checkAuthentication(
  request: FastifyRequest,
  reply: FastifyReply,
  done: () => void
) {
  const token = request.headers.authorization?.slice(7);

  if (!token) {
    return reply.status(401).send("User is not authenticated.");
  }

  const userId = jwt.decode(token)?.toString();

  if (!userId) {
    return reply.status(401).send("Invalid token.");
  }

  request.userId = userId;

  done();
}
