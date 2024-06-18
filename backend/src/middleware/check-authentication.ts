import { FastifyReply, FastifyRequest } from "fastify";
import jwt, { Secret } from "jsonwebtoken";

declare module "fastify" {
  interface FastifyRequest {
    userId: string;
  }
}

const secret: Secret = process.env.JWT_SECRET ?? Math.random().toString(36);

export default function checkAuthentication(
  request: FastifyRequest,
  reply: FastifyReply,
  done: () => void
) {
  try {
    const token = request.headers.authorization?.slice(7);
    if (!token) throw 401;

    const userId = jwt.verify(token, secret)?.toString();
    request.userId = userId;

    done();
  } catch (error: any) {
    if (error === 401) {
      return reply.status(401).send("User is not authenticated.");
    }
    
    if (error.message === "invalid signature") {
      return reply.status(401).send("Invalid token.");
    }

    reply.status(500).send(error);
  }
}
