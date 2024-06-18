import fastify from "fastify";
import cors from "@fastify/cors";
import usersRoutes from "./routes/users-routes";
import projectsRoutes from "./routes/projects-routes";
import servicesRoutes from "./routes/services-routes";

const server = fastify();

server.register(cors, {
  origin: process.env.FRONTEND_URL ?? "*",
});

server.register(usersRoutes, { prefix: "/users" });
server.register(projectsRoutes, { prefix: "/projects" });
server.register(servicesRoutes, { prefix: "/services" });

const port = 3000;
server.listen({ port, host: "0.0.0.0" }, (error: any) => {
  if (error) {
    return console.error(error);
  }

  console.log(`Server running on port ${port}`);
});

export default server;
