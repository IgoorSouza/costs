import { FastifyRequest, FastifyReply } from "fastify";
import jwt, { Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createUser, findUser } from "../repository/users-repository";
import { registerValidation, loginValidation } from "../validation/users";

interface RequestBody {
  email: string;
  password: string;
}

interface RegisterRequestBody extends RequestBody {
  name: string;
}

const secret: Secret = process.env.JWT_SECRET ?? Math.random().toString(36);

export async function register(
  request: FastifyRequest<{ Body: RegisterRequestBody }>,
  reply: FastifyReply
) {
  try {
    const userData = request.body;

    registerValidation.parse(userData);

    userData.password = await bcrypt.hash(userData.password, 8);

    const user = await createUser(userData);

    reply.status(201).send(user);
  } catch (error: any) {
    if (error.code === "P2002") {
      return reply.status(409).send("User already exists.");
    }

    reply.status(400).send(error);
  }
}

export async function login(
  request: FastifyRequest<{ Body: RequestBody }>,
  reply: FastifyReply
) {
  try {
    const userData = request.body;
    loginValidation.parse(userData);

    const user = await findUser(userData.email);

    if (!user) throw 404;

    const passwordMatches = await bcrypt.compare(
      userData.password,
      user.password
    );

    if (!passwordMatches) throw 401;

    const token = jwt.sign(user.id, secret);

    reply.status(200).send({ name: user.name, token });
  } catch (error: any) {
    if (error === 404) {
      return reply.status(404).send("User does not exist.");
    }

    if (error === 401) {
      return reply.status(401).send("Wrong password.");
    }

    reply.status(400).send(error);
  }
}
