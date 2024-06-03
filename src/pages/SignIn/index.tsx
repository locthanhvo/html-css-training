import { memo, useCallback, useEffect } from 'react';
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
  const { errorMessage, handleSignIn } = useAuth();
  const setUser = authStore((state) => state.setUser);

  const handleUserSignIn = useCallback(async (data: TAuthForm) => {
    const response = await handleSignIn(data.email, data.password);

    if (response) {
      setUser({ user: response });

      toast(
        customToast(SUCCESS_MESSAGES.SIGN_IN_SUCCESS, '', TOAST_STATUS.SUCCESS),
      );

      navigate(PRIVATE_ROUTERS.ROOT);
    }
  }, []);

  useEffect(() => {
    if (errorMessage) {
      toast({
        title: ERROR_MESSAGES.SIGN_IN_FAILED,
        description: errorMessage,
        status: 'error',
      });
    }
  }, [errorMessage, toast]);

  return <AuthForm onSubmit={handleUserSignIn} />;
};

export default memo(SignInPage);
