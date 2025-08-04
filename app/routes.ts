import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('get-started', './pages/auth/GetStarted.tsx'),
  route('callback', './pages/auth/Callback.tsx'),
] satisfies RouteConfig;
