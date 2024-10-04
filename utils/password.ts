"use server";

import crypto from "crypto";

const hashPassword = (password: string) => {
  const hash = crypto.createHash("sha256").update(password).digest("hex");
  // const hash = password
  return hash;
};

const comparePasswordAndHash = (password: string, hashedPassword: string) => {
  const Passwordhashed = hashPassword(password);
  const result = (Passwordhashed === hashedPassword);
  return result;
};

export { hashPassword, comparePasswordAndHash };