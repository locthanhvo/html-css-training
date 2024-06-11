import { QueryFunctionContext } from '@tanstack/react-query';

// services
import { apiRequest } from '@/services';

// Types
import { TUser, TUserList } from '@/types';

// Constants
import { API_PATHS, HTTP_METHOD, PAGE_SIZE, userQueryKeys } from '@/constants';

export const getUsers = async () => {
  return await apiRequest<TUser[]>(HTTP_METHOD.GET, API_PATHS.USERS);
};

export const createUser = async ({ user }: { user: TUser }) => {
  return await apiRequest<TUser>(HTTP_METHOD.POST, API_PATHS.USERS, {
    ...user,
  });
};

export const getUserList = async ({
  queryKey: [{ page, filter }],
}: QueryFunctionContext<ReturnType<(typeof userQueryKeys)['list']>>) => {
  const params = {
    _page: page.toString(),
    _per_page: PAGE_SIZE.toString(),
    _sort: '-createdAt',
    ...filter,
  };
  const urlParams = new URLSearchParams(params);

  return await apiRequest<TUserList>(
    HTTP_METHOD.GET,
    `${API_PATHS.USERS}?${urlParams}`,
  );
};

export const deleteUser = async ({ id }: { id: string }) => {
  return await apiRequest<TUser>(
    HTTP_METHOD.DELETE,
    `${API_PATHS.USERS}/${id}`,
  );
};

export const getUser = async ({
  queryKey: [{ id }],
}: QueryFunctionContext<ReturnType<(typeof userQueryKeys)['detail']>>) => {
  return await apiRequest<TUser>(HTTP_METHOD.GET, `${API_PATHS.USERS}/${id}`);
};

export const updateUser = async ({ user }: { user: TUser }) => {
  return await apiRequest<TUser>(
    HTTP_METHOD.PUT,
    `${API_PATHS.USERS}/${user.id}`,
    {
      ...user,
    },
  );
};
