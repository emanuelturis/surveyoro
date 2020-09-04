import crypto from "crypto";

export const generateToken = () =>
  new Promise<string>((resolve, reject) => {
    crypto.randomBytes(64, (error, buffer) => {
      if (error) {
        reject("error generating token");
      }
      const token = buffer.toString("hex");
      resolve(token as string);
    });
  });
