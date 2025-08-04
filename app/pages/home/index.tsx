import React from 'react';
import { accessTokenCookie } from '~/utils/cookies.server';

export async function loader({ request }: { request: Request }) {
  const cookieHeader = request.headers.get('Cookie');
  const storedAccessToken = (await accessTokenCookie.parse(cookieHeader)) || '';
  return { accessToken: storedAccessToken };
}

function HomePage(loaderData: Route.LoaderData<typeof loader>) {
  const { accessToken } = loaderData;
  const pages = ['Products', 'Pricing', 'Blog'];
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

  return <>homes</>;
}

export default HomePage;
