import { FastifyInstance } from "fastify";
import {
  register,
  login,
  refresh,
  logout,
} from "../controllers/users-controller";
import requestBodyValidation from "../middleware/request-body-validation";
import { registerValidation, loginValidation } from "../validation/users";

export default async function usersRoutes(server: FastifyInstance) {
  server.post(
    "/register",
    { preValidation: requestBodyValidation(registerValidation) },
    register
  );
  server.post(
    "/login",
    { preValidation: requestBodyValidation(loginValidation) },
    login
  );
  server.post("/refresh", refresh);
  server.post("/logout", logout);
}
