// File: lib/cookieUtils.ts
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';

interface CookieOptions {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  maxAge?: number;
  path?: string;
  domain?: string;
}

export function useCookie() {
  const setCookie = (
    name: string,
    value: string,
    options: Partial<CookieOptions> = {}
  ): void => {
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieStore = cookies();

    const cookieOptions: CookieOptions = {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 24 * 60 * 60, // 1 day
      path: '/',
      domain: process.env.COOKIE_DOMAIN || undefined,
      ...options,
    };

    if (isProduction && !process.env.COOKIE_DOMAIN) {
      cookieOptions.domain = undefined;
    }

    const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);

    cookieStore.set(name, stringValue, cookieOptions);
  };

  const getCookie = (name: string): string | undefined => {
    const cookieStore = cookies();
    return cookieStore.get(name)?.value;
  };

  const getCookieFromRequest = (request: NextRequest, name: string): string | undefined => {
    const cookieStore = request.cookies;
    return cookieStore.get(name)?.value;
  };

  return {
    setCookie,
    getCookie,
    getCookieFromRequest,
  };
}