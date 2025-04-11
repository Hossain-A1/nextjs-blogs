const accessToken = process.env.ACCESS_TOKEN_SECRET;
const refreshToken = process.env.REFRESH_TOKEN_SECRET;

const server_url = process.env.NEXT_PUBLIC_SERVER_URL;

const adminEmail = process.env.ADMIN_EMAIL || "mrhossainahmed7@gmail.com";
const adminPassword = process.env.ADMIN_PASSWORD;

export { accessToken, refreshToken, server_url, adminEmail, adminPassword };
