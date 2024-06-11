import { QueryFunctionContext } from '@tanstack/react-query';

// services
import { apiRequest } from '@/services';

// Types
import { TBrigade } from '@/types';

// Constants
import { API_PATHS, HTTP_METHOD, brigadeQueryKeys } from '@/constants';

export const createBrigade = async ({ brigade }: { brigade: TBrigade }) => {
  return await apiRequest<TBrigade>(HTTP_METHOD.POST, API_PATHS.BRIGADES, {
    ...brigade,
  });
};

export const getBrigadeList = async ({
  queryKey: [{ filter }],
}: QueryFunctionContext<ReturnType<(typeof brigadeQueryKeys)['list']>>) => {
  const params = {
    _sort: '-createdAt',
    ...filter,
  };
  const urlParams = new URLSearchParams(params);

  return await apiRequest<TBrigade[]>(
    HTTP_METHOD.GET,
    `${API_PATHS.BRIGADES}?${urlParams}`,
  );
};

export const deleteBrigade = async ({ id }: { id: string }) => {
  return await apiRequest<TBrigade>(
    HTTP_METHOD.DELETE,
    `${API_PATHS.BRIGADES}/${id}`,
  );
};

export const getBrigade = async ({
  queryKey: [{ id }],
}: QueryFunctionContext<ReturnType<(typeof brigadeQueryKeys)['detail']>>) => {
  return await apiRequest<TBrigade>(
    HTTP_METHOD.GET,
    `${API_PATHS.BRIGADES}/${id}`,
  );
};

export const updateBrigade = async ({ brigade }: { brigade: TBrigade }) => {
  return await apiRequest<TBrigade>(
    HTTP_METHOD.PUT,
    `${API_PATHS.BRIGADES}/${brigade.id}`,
    {
      ...brigade,
    },
  );
};
