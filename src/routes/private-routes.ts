import { lazy } from 'react';

// Types
import { IRoute } from '@/types';

// Constants
import { PRIVATE_ROUTERS } from '@/constants';

// Pages
const UserListPage = lazy(() => import('@/pages/UserList'));

export const PRIVATE_ROUTES: IRoute[] = [
  {
    path: PRIVATE_ROUTERS.USERS,
    Component: UserListPage,
  },
];
