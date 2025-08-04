import { Grid } from '@mui/material';
import { data, Outlet, redirect } from 'react-router';
import ResponsiveAppBar from '~/components/AppBar';
import apiRoutes from '~/constants/apiRoutes';
import { authAxios } from '~/utils/axiosRequest.server';
import { accessTokenCookie, refreshTokenCookie } from '~/utils/cookies.server';

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
    <Grid container height={'100vh'} width="100%">
      <Grid sx={{ xs: 1, md: 6}} style={{maxWidth: '200px',height: '100vh', overflowY: 'auto'}}>
        <ResponsiveAppBar />
      </Grid>
      <Grid sx={{ xs: 11, md: 6}} style={{ padding: '20px' }}>
        <Outlet />
      </Grid>
    </Grid>
  );
}
