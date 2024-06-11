import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Constants
import { INITIAL_USER, userQueryKeys } from '@/constants';

// Services
import {
  createUser,
  deleteUser,
  getUser,
  getUserList,
  updateUser,
} from '@/services';
import { formatResponseUser } from '@/utils';

export const useGetUserList = ({
  filter,
  page,
}: {
  page: number;
  filter?: Record<string, string>;
}) => {
  const { data: users, isFetching: isUserListLoading } = useQuery({
    queryKey: [...userQueryKeys.list({ filter, page })] as const,
    queryFn: getUserList,
    select: (users) => ({
      ...users,
      data: formatResponseUser(users.data),
    }),
  });

  return { isUserListLoading, users };
};

export const useGetUserDetail = (id: string) => {
  const { data: userDetail, isFetching: isUserLoading } = useQuery({
    queryKey: userQueryKeys.detail(id),
    queryFn: getUser,
    enabled: !!id,
    placeholderData: INITIAL_USER,
  });

  return { userDetail, isUserLoading };
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: handleCreateUser } = useMutation({
    mutationFn: createUser,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: userQueryKeys.lists(),
      }),
  });

  return { handleCreateUser };
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: handleDeleteUser, isPending: isDeleteLoading } =
    useMutation({
      mutationFn: deleteUser,
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: userQueryKeys.lists(),
        }),
    });

  return { handleDeleteUser, isDeleteLoading };
};

export const useEditUser = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: handleEditUser } = useMutation({
    mutationFn: updateUser,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: userQueryKeys.lists(),
      }),
  });

  return { handleEditUser };
};
