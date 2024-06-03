import { lazy } from 'react';

// Types
import { IRoute } from '@/types';

// Constants
import { PUBLIC_ROUTERS } from '@/constants';

// Pages
const SignInPage = lazy(() => import('@/pages/SignIn'));
const SignUpPage = lazy(() => import('@/pages/SignUp'));

export const PUBLIC_ROUTES: IRoute[] = [
  {
    path: PUBLIC_ROUTERS.SIGN_IN,
    Component: SignInPage,
  },
  {
    path: PUBLIC_ROUTERS.SIGN_UP,
    Component: SignUpPage,
  },
];
