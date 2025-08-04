import { CircularProgress, Grid } from '@mui/material';
import { red } from '@mui/material/colors';
import axios, { Axios, AxiosError, type AxiosResponse } from 'axios';
import React, { useEffect } from 'react';
import { redirect, useSearchParams } from 'react-router';

function Callback() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');
    const storedState = localStorage.getItem('state');
    if (code && state && storedState === state) {
      localStorage.removeItem('state');
      axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: null,
        params: {
          code: code,
          redirect_uri: 'http://localhost:5173/callback',
          grant_type: 'authorization_code',
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa(`${import.meta.env.VITE_CLIENT_ID}:${import.meta.env.VITE_CLIENT_SECRET}`)}`,
        },
      })
        .then((response: AxiosResponse) => {
          const { access_token, refresh_token } = response.data;
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', refresh_token);
          redirect('/home');
        })
        .catch((error: AxiosError) => {
          console.error('Error fetching access token:', error);
          redirect('/get-started');
        });
    } else {
      redirect('/get-started');
    }
  }, []);

  return (
    <Grid container spacing={2} paddingTop={'25vh'} justifyContent="center">
      <Grid size={{ xs: 11, sm: 6, md: 4 }} textAlign="center">
        <CircularProgress />
      </Grid>
    </Grid>
  );
}

export default Callback;
