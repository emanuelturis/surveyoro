import jwt from "jsonwebtoken";
import { User } from "../db/models/User";

const secret = process.env.SECRET || "surveyoro";

interface IUser {
  id: string;
}

export const createToken = ({ id }: { id: string }) =>
  jwt.sign({ id }, secret, { expiresIn: "7d" });

export const getUserFromToken = async (token: string) => {
  try {
    const { id } = <IUser>jwt.verify(token, secret);
    return User.query().findOne("id", id);
  } catch {
    return null;
  }
};
