import { createCookie } from 'react-router';

export const stateCookie = createCookie('state', {
  maxAge: 60, // 1 minute
  httpOnly: true,
  sameSite: 'lax',
  secure: true,
});

export const accessTokenCookie = createCookie('access_token', {
  maxAge: 60 * 60, // 1 hour
  httpOnly: true,
  sameSite: 'lax',
  secure: true,
});

export const refreshTokenCookie = createCookie('refresh_token', {
  maxAge: 60 * 60 * 24 * 30, // 30 days
  httpOnly: true,
  sameSite: 'lax',
  secure: true,
});
