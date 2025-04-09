
import {NextResponse as res} from 'next/server'
const successResponse = ({
  statusCode = 200,
  message = "Successed",
  payload = {},
}) => {
  return res.json({ statusCode, success: true, message, payload });
};

const errorResponse = ({
  statusCode = 500,
  message = "Failed",
}) => {
  return res.json({ statusCode, success: false, message});
};

export { successResponse,errorResponse };
