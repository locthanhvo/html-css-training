import { QueryFunctionContext } from '@tanstack/react-query';

// services
import { apiRequest } from '@/services';

// Types
import { TControl } from '@/types';

// Constants
import { API_PATHS, HTTP_METHOD, controlTeamsQueryKeys } from '@/constants';

export const createControl = async ({ control }: { control: TControl }) => {
  return await apiRequest<TControl>(HTTP_METHOD.POST, API_PATHS.CONTROL_TEAMS, {
    ...control,
  });
};

export const getControlList = async ({
  queryKey: [{ filter }],
}: QueryFunctionContext<
  ReturnType<(typeof controlTeamsQueryKeys)['list']>
>) => {
  const params = {
    _sort: '-createdAt',
    ...filter,
  };
  const urlParams = new URLSearchParams(params);

  return await apiRequest<TControl[]>(
    HTTP_METHOD.GET,
    `${API_PATHS.CONTROL_TEAMS}?${urlParams}`,
  );
};

export const deleteControl = async ({ id }: { id: string }) => {
  return await apiRequest<TControl>(
    HTTP_METHOD.DELETE,
    `${API_PATHS.CONTROL_TEAMS}/${id}`,
  );
};

export const getControl = async ({
  queryKey: [{ id }],
}: QueryFunctionContext<
  ReturnType<(typeof controlTeamsQueryKeys)['detail']>
>) => {
  return await apiRequest<TControl>(
    HTTP_METHOD.GET,
    `${API_PATHS.CONTROL_TEAMS}/${id}`,
  );
};

export const updateControl = async ({ control }: { control: TControl }) => {
  return await apiRequest<TControl>(
    HTTP_METHOD.PUT,
    `${API_PATHS.CONTROL_TEAMS}/${control.id}`,
    {
      ...control,
    },
  );
};
