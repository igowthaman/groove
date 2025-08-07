import React from 'react';
import { data } from 'react-router';
import { accessTokenCookie } from '~/utils/server/cookies';

export async function loader({ request }: { request: Request }) {
  const cookieHeader = request.headers.get('Cookie');
  const storedAccessToken = (await accessTokenCookie.parse(cookieHeader)) || '';
  return data({ accessToken: storedAccessToken });
}

export default function Home() {
  return (
    <div>
      <h1>Welcome to Groove</h1>
      <p>Your music journey starts here!</p>
    </div>
  );
}
