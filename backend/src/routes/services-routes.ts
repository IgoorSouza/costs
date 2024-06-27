import { FastifyInstance } from "fastify";
import { create, remove } from "../controllers/services-controller";
import verifyAuthentication from "../middleware/verify-authentication";
import requestBodyValidation from "../middleware/request-body-validation";
import { createServiceValidation } from "../validation/services";

export default async function servicesRoutes(server: FastifyInstance) {
  server.addHook("preHandler", verifyAuthentication);
  server.post(
    "/create",
    { preValidation: requestBodyValidation(createServiceValidation) },
    create
  );
  server.delete("/remove/:id", remove);
}
