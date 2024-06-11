import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  redirect,
  Route,
} from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Wrappers
import RouteProtected from './RouteProtected';

// routes
import { PUBLIC_ROUTES } from './public-routes';
import { PRIVATE_ROUTES } from './private-routes';

// Stores
import { authStore } from '@/stores';

// Constants
import { PRIVATE_ROUTERS } from '@/constants';

// Components
const Fallback = lazy(() => import('@/components/Fallback'));

// Layouts
const MainLayout = lazy(() => import('@/layouts/MainLayout'));
const SecondaryLayout = lazy(() => import('@/layouts/SecondaryLayout'));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<RouteProtected />}>
        <Route
          path={PRIVATE_ROUTERS.ROOT}
          element={
            <Suspense fallback={<Fallback />}>
              <MainLayout />
            </Suspense>
          }
        >
          <Route
            index
            element={<Navigate to={PRIVATE_ROUTERS.USERS} replace />}
          />

          {PRIVATE_ROUTES.map(({ path, Component, title }) => (
            <Route
              key={path}
              path={path}
              id={path}
              element={
                <Suspense fallback={<Fallback />}>
                  <Component />
                </Suspense>
              }
              loader={() => ({ title })}
            />
          ))}
        </Route>
      </Route>
      <Route element={<SecondaryLayout />}>
        {PUBLIC_ROUTES.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback={<Fallback />}>
                <Component />
              </Suspense>
            }
            loader={() => {
              const user = authStore.getState().user.email;

              return user ? redirect(PRIVATE_ROUTERS.ROOT) : null;
            }}
          />
        ))}
      </Route>
    </Route>,
  ),
);
