import { FastifyInstance } from "fastify";
import { register, login } from "../controllers/users-controller";

export default async function usersRoutes(server: FastifyInstance) {
  server.post("/register", register);
  server.post("/login", login);
}
