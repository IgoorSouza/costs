import { FastifyInstance } from "fastify";
import {
  getAll,
  getOne,
  create,
  update,
  remove,
} from "../controllers/projects-controller";
import checkAuthentication from "../middleware/check-authentication";

export default async function projectsRoutes(server: FastifyInstance) {
  server.decorateRequest("userId", null);
  server.addHook("preHandler", checkAuthentication);
  server.get("/", getAll);
  server.get("/:id", getOne);
  server.post("/create", create);
  server.put("/update", update);
  server.delete("/remove/:id", remove);
}
