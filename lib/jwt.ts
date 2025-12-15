import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

const JWT_SECRET = process.env.JWT_SECRET!;

export interface JWTpayload{
    id:ObjectId
}
export function signToken(payload:JWTpayload) {
  return jwt.sign(payload,JWT_SECRET,{
    expiresIn:"7d"
  });
}

export function verifyToken(token: string) {
  console.log(token)
  return jwt.verify(token, JWT_SECRET);
}
