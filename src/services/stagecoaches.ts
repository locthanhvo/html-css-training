import { QueryFunctionContext } from '@tanstack/react-query';

// services
import { apiRequest } from '@/services';

// Types
import { TControl } from '@/types';

// Constants
import { API_PATHS, HTTP_METHOD, stageCoachesQueryKeys } from '@/constants';

export const createStageCoach = async ({ control }: { control: TControl }) => {
  return await apiRequest<TControl>(HTTP_METHOD.POST, API_PATHS.STAGE_COACHES, {
    ...control,
  });
};

export const getStageCoachList = async ({
  queryKey: [{ filter }],
}: QueryFunctionContext<
  ReturnType<(typeof stageCoachesQueryKeys)['list']>
>) => {
  const params = {
    _sort: '-createdAt',
    ...filter,
  };
  const urlParams = new URLSearchParams(params);

  return await apiRequest<TControl[]>(
    HTTP_METHOD.GET,
    `${API_PATHS.STAGE_COACHES}?${urlParams}`,
  );
};

export const deleteStageCoach = async ({ id }: { id: string }) => {
  return await apiRequest<TControl>(
    HTTP_METHOD.DELETE,
    `${API_PATHS.STAGE_COACHES}/${id}`,
  );
};

export const getStageCoach = async ({
  queryKey: [{ id }],
}: QueryFunctionContext<
  ReturnType<(typeof stageCoachesQueryKeys)['detail']>
>) => {
  return await apiRequest<TControl>(
    HTTP_METHOD.GET,
    `${API_PATHS.STAGE_COACHES}/${id}`,
  );
};

export const updateStageCoach = async ({ control }: { control: TControl }) => {
  return await apiRequest<TControl>(
    HTTP_METHOD.PUT,
    `${API_PATHS.STAGE_COACHES}/${control.id}`,
    {
      ...control,
    },
  );
};
