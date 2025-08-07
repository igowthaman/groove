import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';

export default [
  layout('./pages/layout.tsx', [
    index('./pages/home.tsx'),
    route('search', './pages/search.tsx'),
    route('library', './pages/library.tsx'),
    route('profile', './pages/profile.tsx'),
  ]),
  layout('./pages/auth/authLayout.tsx', [
    route('get-started', './pages/auth/GetStarted.tsx'),
    route('callback', './pages/auth/Callback.tsx'),
  ]),
] satisfies RouteConfig;
