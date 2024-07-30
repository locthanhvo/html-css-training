import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { Suspense } from 'react';

// Routes
import { PUBLIC_ROUTES } from './public-routes';

// Layouts
import { MainLayout } from '@/layouts';

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
