import { FastifyInstance } from "fastify";
import { create, remove } from "../controllers/services-controller";
import checkAuthentication from "../middleware/check-authentication";

export default async function servicesRoutes(server: FastifyInstance) {
  server.addHook("preHandler", checkAuthentication);
  server.post("/create", create);
  server.delete("/remove/:id", remove);
}
