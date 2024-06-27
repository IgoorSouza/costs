import { FastifyInstance } from "fastify";
import {
  getAll,
  getOne,
  create,
  update,
  remove,
} from "../controllers/projects-controller";
import verifyAuthentication from "../middleware/verify-authentication";
import requestBodyValidation from "../middleware/request-body-validation";
import {
  createProjectValidation,
  updateProjectValidation,
} from "../validation/projects";

export default async function projectsRoutes(server: FastifyInstance) {
  server.decorateRequest("userId", null);
  server.addHook("preHandler", verifyAuthentication);
  server.get("/", getAll);
  server.get("/:id", getOne);
  server.post(
    "/create",
    { preValidation: requestBodyValidation(createProjectValidation) },
    create
  );
  server.put(
    "/update",
    { preValidation: requestBodyValidation(updateProjectValidation) },
    update
  );
  server.delete("/remove/:id", remove);
}
