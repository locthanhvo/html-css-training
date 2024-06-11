import { QueryFunctionContext } from '@tanstack/react-query';

// services
import { apiRequest } from '@/services';

// Types
import { TControl } from '@/types';

// Constants
import { API_PATHS, HTTP_METHOD, crcaQueryKeys } from '@/constants';

export const createCrca = async ({ control }: { control: TControl }) => {
  return await apiRequest<TControl>(HTTP_METHOD.POST, API_PATHS.CRCA, {
    ...control,
  });
};

export const getCrcaList = async ({
  queryKey: [{ filter }],
}: QueryFunctionContext<ReturnType<(typeof crcaQueryKeys)['list']>>) => {
  const params = {
    _sort: '-createdAt',
    ...filter,
  };
  const urlParams = new URLSearchParams(params);

  return await apiRequest<TControl[]>(
    HTTP_METHOD.GET,
    `${API_PATHS.CRCA}?${urlParams}`,
  );
};

export const deleteCrca = async ({ id }: { id: string }) => {
  return await apiRequest<TControl>(
    HTTP_METHOD.DELETE,
    `${API_PATHS.CRCA}/${id}`,
  );
};

export const getCrca = async ({
  queryKey: [{ id }],
}: QueryFunctionContext<ReturnType<(typeof crcaQueryKeys)['detail']>>) => {
  return await apiRequest<TControl>(HTTP_METHOD.GET, `${API_PATHS.CRCA}/${id}`);
};

export const updateCrca = async ({ control }: { control: TControl }) => {
  return await apiRequest<TControl>(
    HTTP_METHOD.PUT,
    `${API_PATHS.CRCA}/${control.id}`,
    {
      ...control,
    },
  );
};
