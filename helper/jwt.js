import { accessToken, refreshToken } from "@/secret/secret";
import jwt from "jsonwebtoken";
 const createToken = (payload) => {
  const accessT = jwt.sign(payload, accessToken, { expiresIn: "1d" });
  const refreshT = jwt.sign(payload, refreshToken, { expiresIn: "7d" });
  return {
    accessT,
    refreshT,
  };
};



export {createToken}