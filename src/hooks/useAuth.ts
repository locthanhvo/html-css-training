import { useMutation, useQuery } from '@tanstack/react-query';

// Constants
import { userLoginQueryKeys } from '@/constants';

// Services
import { createUser, getUsers } from '@/services';

export const useAuth = () => {
  const { data: users, isPending: isLoading } = useQuery({
    queryKey: [userLoginQueryKeys.USER_LOGIN],
    queryFn: getUsers,
  });

  const { mutateAsync: handleSignUp } = useMutation({
    mutationFn: createUser,
  });

  return {
    users,
    isLoading,
    handleSignUp,
  };
};
