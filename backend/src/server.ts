import fastify from "fastify";
import cors from "@fastify/cors";

const app = fastify();

app.register(cors, {
  origin: process.env.FRONTEND_URL ?? [
    "http://localhost:4173",
    "http://localhost:5173",
  ],
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = 3000;
app.listen({ port }, (error) => {
  if (error) return console.error(error);
  console.log(`Server running on port ${port}`);
});
