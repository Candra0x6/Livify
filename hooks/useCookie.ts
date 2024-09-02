import { parse, serialize } from 'cookie';
import type { NextResponse } from 'next/server';

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
    response: NextResponse,
    name: string,
    value: string,
    options: Partial<CookieOptions> = {}
  ): void => {
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieOptions: CookieOptions = {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 24 * 60 * 60,
      path: '/',
      ...options,
    };

    const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
    const cookieString = serialize(name, stringValue, cookieOptions);

    response.headers.append('Set-Cookie', cookieString);
  };

  const getCookie = (request: Request, name: string): string | undefined => {
    const cookies = parse(request.headers.get('session') || '');
    return cookies[name];
  };

  return {
    setCookie,
    getCookie,
  };
}