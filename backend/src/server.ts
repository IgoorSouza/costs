import fastify from "fastify";
import cors from "@fastify/cors";
import usersRoutes from "./routes/users-routes";
import projectsRoutes from "./routes/projects-routes";

const server = fastify();

server.register(cors, {
  origin: process.env.FRONTEND_URL ?? "*",
});

server.register(usersRoutes, { prefix: "/users" });
server.register(projectsRoutes, { prefix: "/projects" });

const port = 3000;
server.listen({ port }, (error: any) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log(`Server running on port ${port}`);
});

export default server;
