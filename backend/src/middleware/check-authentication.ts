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

export default function checkAuthentication(
  request: FastifyRequest,
  reply: FastifyReply,
  done: () => void
) {
  try {
    const accessToken = request.headers.authorization?.slice(7);
    if (!accessToken) throw 401;

    const { userId } = jwt.verify(accessToken, accessTokenSecret) as JwtPayload;
    request.userId = userId;

    done();
  } catch (error: any) {
    if (error === 401) {
      return reply.status(401).send("User is not authenticated.");
    }

    if (error instanceof TokenExpiredError) {
      return reply.status(401).send("Session expired.");
    }

    if (error instanceof JsonWebTokenError) {
      return reply.status(401).send("Invalid token.");
    }

    reply.status(500).send(error);
  }
}
