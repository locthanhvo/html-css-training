import { memo, useCallback, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

// Components
import { AuthForm } from '@/components';

// Types
import { TAuthForm, TUser } from '@/types';

// Hooks
import { useAuth } from '@/hooks';

// Stores
import { authStore } from '@/stores';
import {
  ERROR_MESSAGES,
  PRIVATE_ROUTERS,
  SUCCESS_MESSAGES,
  TOAST_STATUS,
} from '@/constants';

// Utils
import { customToast } from '@/utils';

const SignUpPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { handleSignUp, errorMessage } = useAuth();
  const setUser = authStore((state) => state.setUser);

  const handleUserSignUp = useCallback(async (data: TAuthForm) => {
    const payload: TUser = {
      email: data.email,
      password: data.password,
      phone: data.phone,
      createdAt: new Date(),
    };

    const response = await handleSignUp(payload);

    if (response) {
      setUser({ user: payload });

      toast(
        customToast(SUCCESS_MESSAGES.SIGN_UP_SUCCESS, '', TOAST_STATUS.SUCCESS),
      );

      navigate(PRIVATE_ROUTERS.ROOT);
    }
  }, []);

  useEffect(() => {
    if (errorMessage) {
      toast({
        title: ERROR_MESSAGES.SIGN_UP_FAILED,
        description: errorMessage,
        status: 'error',
      });
    }
  }, [errorMessage, toast]);

  return <AuthForm isRegister onSubmit={handleUserSignUp} />;
};

export default memo(SignUpPage);
