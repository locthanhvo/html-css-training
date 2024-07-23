import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { Suspense } from 'react';

// routes
import { PUBLIC_ROUTES } from './public-routes';
import { Box } from '@chakra-ui/react';
import MainLayout from '@/layouts/MainLayout';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      {PUBLIC_ROUTES.map(({ path, Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <Suspense fallback={<Box>Loading...</Box>}>
              <Component />
            </Suspense>
          }
        />
      ))}
    </Route>,
  ),
);
