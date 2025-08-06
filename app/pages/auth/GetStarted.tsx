import React from 'react';
import type { Route } from './+types/GetStarted';
import { data } from 'react-router';
import { stateCookie } from '~/utils/cookies';
import { authDomain } from '~/constants/domains';

const SCOPES = [
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'playlist-read-private',
  'playlist-read-collaborative',
  'playlist-modify-private',
  'playlist-modify-public',
  'user-follow-modify',
  'user-follow-read',
  'user-top-read',
  'user-read-recently-played',
  'user-library-modify',
  'user-library-read',
  'user-read-email',
];

export async function loader({ request }: Route.LoaderArgs) {
  const requestUrl = new URL(request.url);

  const state = Math.random().toString(36).substring(2, 15);
  const url = new URL(`${authDomain}/authorize`);
  url.searchParams.set('client_id', import.meta.env.VITE_CLIENT_ID || '');
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('redirect_uri', `${requestUrl.origin}/callback`);
  url.searchParams.set('scope', SCOPES.join(' '));
  url.searchParams.set('state', state);
  return data(
    { url: url.toString() },
    {
      headers: {
        'Set-Cookie': await stateCookie.serialize(state),
      },
    }
  );
}

function GetStarted({ loaderData }: Route.ComponentProps) {
  const { url } = loaderData;

  return (
    <div className="flex justify-center pt-[25vh]">
      <div className="w-full max-w-md text-center">
        <h2 className="text-4xl font-bold py-10">Groove</h2>
        <a
          href={url}
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}

export default GetStarted;
