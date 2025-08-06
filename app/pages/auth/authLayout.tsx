import React from 'react';
import { Outlet, redirect } from 'react-router';
import { accessTokenCookie, refreshTokenCookie } from '~/utils/cookies';
import type { Route } from './+types/authLayout';

export async function loader({ request }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const storedAccessToken = (await accessTokenCookie.parse(cookieHeader)) || '';
  const storedRefreshToken =
    (await refreshTokenCookie.parse(cookieHeader)) || '';
  if (storedAccessToken || storedRefreshToken) return redirect('/');
}

export default function AuthLayout() {
  return <Outlet />;
}
