import { useCallback, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

// Types
import { TUser } from '@/types';

// Constants
import { API_PATHS, ERROR_MESSAGES } from '@/constants';

// Services
import { APIs } from '@/services';

interface ErrorResponse {
  message: string;
}

export const useAuth = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const { mutateAsync: getUsers, isPending: isLoading } = useMutation({
    mutationFn: async () => await APIs.get<TUser[]>(API_PATHS.USERS),
  });

  const { mutateAsync: createUser } = useMutation({
    mutationFn: async (userInfo: TUser) =>
      await APIs.post<TUser>(API_PATHS.USERS, {
        data: { id: uuidv4(), ...userInfo },
      }),
  });

  const handleSignUp = useCallback(async (userInfo: TUser) => {
    try {
      const users = await getUsers();
      const isUser = users.some((user) => user.email === userInfo.email);

      if (isUser) {
        setErrorMessage(ERROR_MESSAGES.USER_EXISTS);
      } else {
        return await createUser(userInfo);
      }
    } catch (error) {
      setErrorMessage((error as ErrorResponse).message);
    }
  }, []);

  const handleSignIn = useCallback(async (email: string, password: string) => {
    try {
      const users = await getUsers();
      const user = users.find(
        (user) => user.email === email && user.password === password,
      );

      if (!user) {
        setErrorMessage(ERROR_MESSAGES.INVALID_USERS);
      } else {
        return user;
      }
    } catch (error) {
      setErrorMessage((error as ErrorResponse).message);
    }
  }, []);

  return {
    isLoading,
    errorMessage,
    handleSignUp,
    handleSignIn,
  };
};
