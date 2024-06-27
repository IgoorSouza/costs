import { FastifyReply, FastifyRequest } from "fastify";
import jwt, {
  Secret,
  JwtPayload,
  TokenExpiredError,
  JsonWebTokenError,
} from "jsonwebtoken";

declare module "fastify" {
  interface FastifyRequest {
    userId: string;
  }
}

const accessTokenSecret: Secret = process.env.ACCESS_TOKEN_SECRET || "";

export default async function verifyAuthentication(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const accessToken = request.headers.authorization?.slice(7);
    if (!accessToken) throw new Error("User is not authenticated.");

    const { userId } = jwt.verify(accessToken, accessTokenSecret) as JwtPayload;
    request.userId = userId;
  } catch (error: unknown) {
    if (error instanceof TokenExpiredError) {
      return reply.status(401).send("Session expired.");
    }

    if (error instanceof JsonWebTokenError) {
      return reply.status(401).send("Invalid token.");
    }

    if (
      error instanceof Error &&
      error.message === "User is not authenticated."
    ) {
      return reply.status(401).send(error.message);
    }

    reply.status(500).send(error);
  }
}
