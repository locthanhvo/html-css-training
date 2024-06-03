import { Navigate, Outlet } from 'react-router-dom';

// Constants
import { PUBLIC_ROUTERS } from '@/constants';

// Stores
import { authStore } from '@/stores';

const RouteProtected = () => {
  const user = authStore((state) => state.user);

  return user.email ? <Outlet /> : <Navigate to={PUBLIC_ROUTERS.SIGN_IN} />;
};

export default RouteProtected;
