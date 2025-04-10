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


const verifyToken = (token) => {
  const decode = jwt.verify(token, accessToken);
  return decode
 
};



export {createToken,verifyToken}