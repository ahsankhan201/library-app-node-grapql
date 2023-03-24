import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtSecret } from "../configuration/connection";

export const authorization = (context: any) => {
  const token = getTokenFromHeader(context);
  if (!token) {
    throw new Error("No token provided");
  }
  try {
    const secret = jwtSecret;
    const decoded = jwt.verify(token, secret) as JwtPayload;
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

const getTokenFromHeader = (context: any): string | null => {
  const authHeader = context.req.headers.authorization;
  if (authHeader && authHeader.split(" ")[0] === "Bearer") {
    return authHeader.split(" ")[1];
  }
  return null;
};

module.exports = { authorization };
