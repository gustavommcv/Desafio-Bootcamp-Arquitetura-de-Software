import jwt from "jsonwebtoken";
import User from "../models/User";

export default function generateToken(user: User): string {
  const secretKey = process.env.JWT_SECRET as string;
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.name,
    },
    secretKey,
    {
      expiresIn: "1h",
    }
  );

  return token;
}
