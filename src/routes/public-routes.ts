import { lazy } from 'react';

// Types
import { IRoute } from '@/types';

// Constants
import { PUBLIC_ROUTERS } from '@/constants';

// Pages
const DashboardPage = lazy(() => import('@/pages/Dashboard'));

export const PUBLIC_ROUTES: IRoute[] = [
  {
    path: PUBLIC_ROUTERS.ROOT,
    Component: DashboardPage,
  },
];
