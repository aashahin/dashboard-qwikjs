import { isDev } from "@builder.io/qwik/build";

type Props = {
  redirect: any;
  cookie: any;
  env: any;
  next: any;
};

const userFetch = async (accessToken: string, env: any, redirect: any) => {
  return await fetch(`${env.get("URL_API")}/auth/verify`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(async (res) => {
      if (res.ok) {
        return res.json();
      } else {
        return false;
      }
    })
    .catch(() => {
      throw redirect(308, "/login");
    });
};

export default async (req: Props) => {
  const { redirect, cookie, env } = req;
  const accessToken = cookie.get("accessToken")?.value;
  const refreshToken = cookie.get("refreshToken")?.value;

  if (!accessToken || !refreshToken) {
    throw redirect(308, "/login");
  } else {
    const user = await userFetch(accessToken, env, redirect);
    if (!user) {
      const refresh = await fetch(`${env.get("URL_API")}/auth/refresh`, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      })
        .then(async (res) => {
          if (res.ok) {
            const newAccessToken = await res.json();
            cookie.set("accessToken", newAccessToken.accessToken, {
              expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
              path: "/",
              secure: !isDev,
              sameSite: "strict",
              httpOnly: true,
            });
            return userFetch(newAccessToken.accessToken, env, redirect);
          } else {
            throw redirect(308, "/login");
          }
        })
        .catch(() => {
          throw redirect(308, "/login");
        });

      if (!refresh) {
        throw redirect(308, "/login");
      } else {
        return refresh;
      }
    } else {
      return user;
    }
  }
};
