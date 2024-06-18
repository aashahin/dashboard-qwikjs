import { isDev } from "@builder.io/qwik/build";
import redirect from "~/utils/server/redirect";
import type { RequestEventAction } from "@builder.io/qwik-city";

export const loginDone = (req: RequestEventAction, data: any) => {
  req.cookie.set("accessToken", data.accessToken, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    path: "/",
    secure: !isDev,
    sameSite: "strict",
    httpOnly: true,
  });
  req.cookie.set("refreshToken", data.refreshToken, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    path: "/",
    secure: !isDev,
    sameSite: "strict",
    httpOnly: true,
  });
  const { roles } = data.data;
  if (roles.includes("admin")) {
    return redirect(302, "/admin", req);
  } else if (roles.includes("vendor")) {
    return redirect(302, "/dashboard", req);
  } else {
    return redirect(302, "/", req);
  }
};
