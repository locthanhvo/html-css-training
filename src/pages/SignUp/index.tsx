import { memo, useCallback } from 'react';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

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
  STATUS,
  SUCCESS_MESSAGES,
  TOAST_STATUS,
} from '@/constants';

// Utils
import { customToast } from '@/utils';

const SignUpPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { users, isLoading, handleSignUp } = useAuth();
  const setUser = authStore((state) => state.setUser);

  const handleUserSignUp = useCallback(
    async (data: TAuthForm) => {
      try {
        const isUser = users?.some((user) => user.email === data.email);

        if (isUser) {
          toast(
            customToast({
              title: ERROR_MESSAGES.SIGN_UP_FAILED,
              description: ERROR_MESSAGES.USER_EXISTS,
              status: TOAST_STATUS.ERROR,
            }),
          );
        } else {
          const payload: TUser = {
            id: uuidv4(),
            email: data.email,
            firstName: '',
            lastName: '',
            password: data.password,
            phone: data.phone,
            status: STATUS.ACTIVE,
            createdAt: new Date().toISOString(),
          };

          await handleSignUp({ user: payload });

          setUser({ user: payload });

          toast(
            customToast({
              title: SUCCESS_MESSAGES.SIGN_UP_SUCCESS,
              status: TOAST_STATUS.SUCCESS,
            }),
          );

          navigate(PRIVATE_ROUTERS.ROOT);
        }
      } catch (error) {
        toast(
          customToast({
            title: ERROR_MESSAGES.SIGN_UP_FAILED,
            status: TOAST_STATUS.ERROR,
          }),
        );
      }
    },
    [handleSignUp, navigate, toast, setUser, users],
  );

  return (
    <AuthForm isLoading={isLoading} isRegister onSubmit={handleUserSignUp} />
  );
};

export default memo(SignUpPage);
