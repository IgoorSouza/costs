import { FastifyRequest, FastifyReply } from "fastify";
import jwt, { Secret, JwtPayload, JsonWebTokenError } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { createUser, getUser } from "../repositories/users-repository";
import {
  Register as RegisterRequestBody,
  Login as LoginRequestBody,
} from "../interfaces/users";

const accessTokenSecret: Secret = process.env.ACCESS_TOKEN_SECRET || "";
const refreshTokenSecret: Secret = process.env.REFRESH_TOKEN_SECRET || "";

export async function register(
  request: FastifyRequest<{ Body: RegisterRequestBody }>,
  reply: FastifyReply
) {
  try {
    const userData = request.body;
    userData.password = await bcrypt.hash(userData.password, 8);

    await createUser(userData);

    reply.status(201).send("User successfully created.");
  } catch (error: unknown) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return reply.status(409).send("User already exists.");
    }

    reply.status(500).send(error);
  }
}

export async function login(
  request: FastifyRequest<{ Body: LoginRequestBody }>,
  reply: FastifyReply
) {
  try {
    const userData = request.body;

    const user = await getUser(userData.email);

    const passwordMatches = await bcrypt.compare(
      userData.password,
      user.password
    );
    if (!passwordMatches) throw new Error("Wrong password.");

    const refreshToken = jwt.sign(
      { userId: user.id, name: user.name },
      refreshTokenSecret,
      {
        expiresIn: "7d",
      }
    );

    const accessToken = jwt.sign({ userId: user.id }, accessTokenSecret, {
      expiresIn: "20m",
    });

    reply
      .status(200)
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        domain: process.env.RENDER_EXTERNAL_HOSTNAME ?? "localhost",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60, // 7 days
      })

      .send({ name: user.name, accessToken });
  } catch (error: unknown) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return reply.status(404).send("User does not exist.");
    }

    if (error instanceof Error && error.message === "Wrong password.") {
      return reply.status(401).send(error.message);
    }

    reply.status(500).send(error);
  }
}

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { refreshToken } = request.cookies;
    if (!refreshToken) throw new Error("User is not authenticated.");

    const { userId, name } = jwt.verify(
      refreshToken,
      refreshTokenSecret
    ) as JwtPayload;

    const accessToken = jwt.sign({ userId }, accessTokenSecret, {
      expiresIn: "20m",
    });

    return reply.status(200).send({ name, accessToken });
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      error.message === "User is not authenticated."
    ) {
      return reply.status(401).send("User is not authenticated.");
    }

    if (error instanceof JsonWebTokenError && error.message === "jwt expired") {
      return reply.status(401).send("Authentication expired.");
    }

    reply.status(500).send(error);
  }
}

export async function logout(request: FastifyRequest, reply: FastifyReply) {
  try {
    reply.clearCookie(
      "refreshToken",
      process.env.NODE_ENV === "production"
        ? {
            path: "/",
            domain: process.env.RENDER_EXTERNAL_HOSTNAME,
            sameSite: "none",
            secure: true,
            httpOnly: true,
          }
        : { path: "/" }
    );
    
    return reply.status(200).send("Successfully logged out.");
  } catch (error: unknown) {
    reply.status(500).send(error);
  }
}
