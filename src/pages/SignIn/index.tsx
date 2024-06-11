import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

// Components
import { AuthForm } from '@/components';

// Types
import { TAuthForm } from '@/types';

// Hooks
import { useAuth } from '@/hooks';

// Stores
import { authStore } from '@/stores';

// Utils
import { customToast } from '@/utils';

// Constants
import {
  ERROR_MESSAGES,
  PRIVATE_ROUTERS,
  SUCCESS_MESSAGES,
  TOAST_STATUS,
} from '@/constants';

const SignInPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { users, isLoading } = useAuth();
  const setUser = authStore((state) => state.setUser);

  const handleUserSignIn = useCallback(
    async (data: TAuthForm) => {
      try {
        const response = users?.find(
          (user) =>
            user.email === data.email && user.password === data.password,
        );

        if (response) {
          setUser({ user: response });
          toast(
            customToast({
              title: SUCCESS_MESSAGES.SIGN_IN_SUCCESS,
              status: TOAST_STATUS.SUCCESS,
            }),
          );

          navigate(PRIVATE_ROUTERS.ROOT);
        }
      } catch (error) {
        toast(
          customToast({
            title: ERROR_MESSAGES.SIGN_IN_FAILED,
            status: TOAST_STATUS.ERROR,
          }),
        );
      }
    },
    [users, setUser, toast, navigate],
  );

  return <AuthForm isLoading={isLoading} onSubmit={handleUserSignIn} />;
};

export default memo(SignInPage);
