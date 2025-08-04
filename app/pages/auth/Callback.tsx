import { CircularProgress, Grid } from '@mui/material';
import axios from 'axios';
import { redirect } from 'react-router';
import type { Route } from './+types/Callback';
import {
  accessTokenCookie,
  refreshTokenCookie,
  stateCookie,
} from '~/utils/cookies.server';
import { authAxios } from '~/utils/axiosRequest.server';
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
    <Grid container spacing={2} paddingTop={'25vh'} justifyContent="center">
      <Grid size={{ xs: 11, sm: 6, md: 4 }} textAlign="center">
        <CircularProgress />
      </Grid>
    </Grid>
  );
}

export default Callback;
