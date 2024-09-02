import type { NextResponse } from "next/server";

interface SessionCookies {
  sessionToken: string;
  expires: Date;
}

interface RefreshCookie {
  refreshToken: string;
  expires: Date;
  sessionToken: string;
}

interface CookieOptions {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
  maxAge?: number;
  path?: string;
  domain?: string;
}


export function useCookie() {
  const setCookie = (
    response: NextResponse,
    name: string,
    value: string,
    additionalOptions: Partial<CookieOptions> = {}
  ): void => {
    const isProduction = process.env.NODE_ENV === "production";
    const cookieOptions: CookieOptions = {
      httpOnly: false,
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
      maxAge: 24 * 60 * 60,
      path: "/",
      ...additionalOptions,
    };

    if (isProduction && process.env.COOKIE_DOMAIN) {
      let domain = process.env.COOKIE_DOMAIN;
      if (!domain.startsWith('.') && domain !== 'localhost') {
        domain = `.${domain}`;
      }
      cookieOptions.domain = domain;
    }

    response.cookies.set(name, value, cookieOptions);
  };
  return {
    setCookie
  }
}

