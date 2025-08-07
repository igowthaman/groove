import { data, Outlet, redirect } from 'react-router';
import AppBar from '~/components/appBar';
import apiRoutes from '~/constants/apiRoutes';
import { authAxios } from '~/utils/server/axiosRequest';
import { accessTokenCookie, refreshTokenCookie } from '~/utils/server/cookies';

export async function loader({ request }: { request: Request }) {
  const cookieHeader = request.headers.get('Cookie');
  const storedAccessToken = (await accessTokenCookie.parse(cookieHeader)) || '';
  const storedRefreshToken =
    (await refreshTokenCookie.parse(cookieHeader)) || '';

  if (storedAccessToken) return data({});
  if (storedRefreshToken) {
    try {
      const response = await authAxios('post', apiRoutes.token, {
        refresh_token: storedRefreshToken,
        grant_type: 'refresh_token',
      });
      if (response.status === 200) {
        return data(
          {},
          {
            headers: {
              'Set-Cookie': [
                await accessTokenCookie.serialize(response.data.access_token, {
                  maxAge: response.data.expires_in,
                }),
              ].join(', '),
            },
          }
        );
      }
      console.error('Error refreshing access token:', response.data);
    } catch (error) {
      console.error('Error fetching access token:', error);
    }
  }
  return redirect('/get-started');
}

export default function Layout() {
  return (
    <div className="flex h-screen w-full">
      <div className="h-screen overflow-y-auto">
        <AppBar />
      </div>
      <div className="flex-1 p-5">
        <Outlet />
      </div>
    </div>
  );
}
