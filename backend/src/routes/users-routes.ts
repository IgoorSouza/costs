import { FastifyInstance } from "fastify";
import { register, login, refresh, logout } from "../controllers/users-controller";

export default async function usersRoutes(server: FastifyInstance) {
  server.post("/register", register);
  server.post("/login", login);
  server.post("/refresh", refresh);
  server.post("/logout", logout);
}
