import { lazy } from 'react';

// Types
import { IRoute } from '@/types';

// Constants
import { PRIVATE_ROUTERS } from '@/constants';

// Pages
const UserListPage = lazy(() => import('@/pages/UserList'));
const UserActionPage = lazy(() => import('@/pages/UserAction'));

const ControlPage = lazy(() => import('@/pages/Control'));

export const PRIVATE_ROUTES: IRoute[] = [
  {
    path: PRIVATE_ROUTERS.USERS,
    Component: UserListPage,
    title: 'Users',
  },
  {
    path: PRIVATE_ROUTERS.USER_ADD,
    Component: UserActionPage,
    title: 'Users',
  },
  {
    path: PRIVATE_ROUTERS.USER_EDIT,
    Component: UserActionPage,
    title: 'Users',
  },
  {
    path: PRIVATE_ROUTERS.CONTROLS,
    Component: ControlPage,
    title: 'Controls',
  },
];
