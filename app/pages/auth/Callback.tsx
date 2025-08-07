import axios from 'axios';
import { redirect } from 'react-router';
import type { Route } from './+types/Callback';
import {
  accessTokenCookie,
  refreshTokenCookie,
  stateCookie,
} from '~/utils/server/cookies';
import { authAxios } from '~/utils/server/axiosRequest';
import apiRoutes from '~/constants/apiRoutes';

export async function loader({ request }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const storedState = (await stateCookie.parse(cookieHeader)) || '';

  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  if (code && state && storedState === state) {
    try {
      const response = await authAxios('post', apiRoutes.token, {
        code: code,
        redirect_uri: `${url.origin}/callback`,
        grant_type: 'authorization_code',
      });
      if (response.status !== 200) {
        console.error('Error fetching access token:', response.data);
        return redirect('/get-started');
      }
      return redirect('/', {
        headers: {
          'Set-Cookie': [
            await accessTokenCookie.serialize(response.data.access_token, {
              maxAge: response.data.expires_in,
            }),
            await refreshTokenCookie.serialize(response.data.refresh_token),
          ].join(', '),
        },
      });
    } catch (error: any) {
      console.error('Error fetching access token:', error);
    }
  }
  return redirect('/get-started');
}

function Callback() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md text-center">
        <svg
          className="animate-spin h-10 w-10 text-gray-500 mx-auto"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      </div>
    </div>
  );
}

export default Callback;
