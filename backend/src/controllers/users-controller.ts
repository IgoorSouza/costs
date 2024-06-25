import { FastifyRequest, FastifyReply } from "fastify";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createUser, getUser } from "../repositories/users-repository";
import { registerValidation, loginValidation } from "../validation/users";

interface RequestBody {
  email: string;
  password: string;
}

interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
}

const accessTokenSecret: Secret = process.env.ACCESS_TOKEN_SECRET || "";
const refreshTokenSecret: Secret = process.env.REFRESH_TOKEN_SECRET || "";

export async function register(
  request: FastifyRequest<{ Body: RegisterRequestBody }>,
  reply: FastifyReply
) {
  try {
    const userData = request.body;
    registerValidation.parse(userData);

    userData.password = await bcrypt.hash(userData.password, 8);

    await createUser(userData);

    reply.status(201).send("User successfully created.");
  } catch (error: any) {
    if (error.code === "P2002") {
      return reply.status(409).send("User already exists.");
    }

    reply.status(500).send(error);
  }
}

export async function login(
  request: FastifyRequest<{ Body: RequestBody }>,
  reply: FastifyReply
) {
  try {
    const userData = request.body;
    loginValidation.parse(userData);

    const user = await getUser(userData.email);
    if (!user) throw 404;

    const passwordMatches = await bcrypt.compare(
      userData.password,
      user.password
    );

    if (!passwordMatches) throw 401;

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
        sameSite: "strict",
        partitioned: true,
        domain: process.env.RENDER_EXTERNAL_HOSTNAME ?? undefined,
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 // 7 days 
      })
      .send({ name: user.name, accessToken });
  } catch (error: any) {
    if (error === 404) {
      return reply.status(404).send("User does not exist.");
    }

    if (error === 401) {
      return reply.status(401).send("Wrong password.");
    }

    reply.status(500).send(error);
  }
}

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { refreshToken } = request.cookies;

    if (!refreshToken) {
      throw 401;
    }

    const { userId, name } = jwt.verify(
      refreshToken,
      refreshTokenSecret
    ) as JwtPayload;

    const accessToken = jwt.sign({ userId }, accessTokenSecret, {
      expiresIn: "20m",
    });

    return reply.status(200).send({ name, accessToken });
  } catch (error: any) {
    if (error === 401) {
      return reply.status(401).send("User is not authenticated.");
    }

    if (error.message === "jwt expired") {
      return reply.status(401).send("Authentication expired.");
    }

    reply.status(500).send(error);
  }
}

export async function logout(request: FastifyRequest, reply: FastifyReply) {
  try {
    reply.clearCookie("refreshToken");
    return reply.status(200).send("Successfully logged out.");
  } catch (error: any) {
    reply.status(500).send(error);
  }
}
