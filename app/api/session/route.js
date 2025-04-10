
const { verifyToken } = require("@/helper/jwt");
const { errorResponse, successResponse } = require("@/helper/response");

export const POST = async (req) => {
  try {
    const { token } = await req.json();

    if (!token) {
      return errorResponse({ statusCode: 401, message: "Unauthorized" });
    }
    const session = verifyToken(token);

    return successResponse({
      statusCode: 200,
      message: "Session was retun successfully",
      payload: session,
    });
  } catch (error) {
    return errorResponse({
      statusCode: 401,
      message: `Unauthorized ${error.message}`,
    });
  }
};
