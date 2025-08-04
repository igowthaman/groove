import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';

export default [
  layout('./pages/layout.tsx', [index('./pages/home/index.tsx')]),
  layout('./pages/auth/authLayout.tsx', [
    route('get-started', './pages/auth/GetStarted.tsx'),
    route('callback', './pages/auth/Callback.tsx'),
  ]),
] satisfies RouteConfig;
