import * as React from 'react';
import { data, Link } from 'react-router';
import { apiAxios } from '~/utils/axiosRequest.server';
import { accessTokenCookie } from '~/utils/cookies';

const pages = ['Search', 'Categories', 'Library'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export async function loader({ request }: { request: Request }) {
  const cookieHeader = request.headers.get('Cookie');
  const storedAccessToken = (await accessTokenCookie.parse(cookieHeader)) || '';
  const userData = await apiAxios('get', '/api/user', {
    headers: {
      Authorization: `Bearer ${storedAccessToken}`,
    },
  });
  return data({ accessToken: storedAccessToken, user: userData });
}

function ResponsiveAppBar() {
  return (
    <div className="h-screen w-full p-4 flex flex-col justify-between">
      <div>
        <div>
          <Link to="/" className="text-2xl font-bold">
            Groove
          </Link>
        </div>
        <div className="mt-5 flex flex-col gap-5">
          {pages.map((page) => (
            <Link to="/" key={page}>{page}</Link>
          ))}
        </div>
      </div>
      <div>
        <Link to="/profile">
          <img src="#" alt="User" />
        </Link>
      </div>
    </div>
  );
}
export default ResponsiveAppBar;
