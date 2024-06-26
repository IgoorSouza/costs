import fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import usersRoutes from "./routes/users-routes";
import projectsRoutes from "./routes/projects-routes";
import servicesRoutes from "./routes/services-routes";

const server = fastify();

server.register(cors, {
  origin: process.env.FRONTEND_URL ?? [
    "http://localhost:4173",
    "http://localhost:5173",
  ],
  credentials: true,
});
server.register(cookie);

server.register(usersRoutes, { prefix: "/users" });
server.register(projectsRoutes, { prefix: "/projects" });
server.register(servicesRoutes, { prefix: "/services" });

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
server.listen({ port, host: "0.0.0.0" }, (error: unknown) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log(`Server running on port ${port}`);
});

export default server;
