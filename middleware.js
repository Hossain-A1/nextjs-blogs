import { NextResponse as res } from "next/server";
import { server_url } from "./secret/secret";
export const config = {
  matcher: "/admin/:path*",
};

export const middleware = async (request) => {
  const accessTkn = request.cookies.get("adminToken");

  if (!accessTkn) {
    return res.redirect(new URL("/login", request.url));
  }

  const api = await fetch(`${server_url}/api/session`, {
    method: "post",
    body: JSON.stringify({ token: accessTkn.value }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!api.ok) {
    return res.redirect(new URL("/login", request.url));
  }
  

  const body = await api.json();
  if (!body?.payload) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return res.next();
  // session.cookies.set("session", JSON.stringify(body.payload), {
  //   maxAge: 7 * 24 * 60 * 60,
  //   secure:false,
  //   path: "/",
  //   httpOnly: true,
  // });
  // return session;
};
