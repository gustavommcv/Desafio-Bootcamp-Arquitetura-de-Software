import jwt from "jsonwebtoken";
import UserResponseDTO from "../dto/UserResponseDTO";

export default function generateToken(user: UserResponseDTO): string {
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
