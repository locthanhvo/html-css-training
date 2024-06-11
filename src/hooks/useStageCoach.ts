import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Constants
import { stageCoachesQueryKeys } from '@/constants';

// Services
import {
  createStageCoach,
  deleteStageCoach,
  getStageCoach,
  getStageCoachList,
  updateStageCoach,
} from '@/services';

// Types
import { TControl } from '@/types';

export const useGetStageCoachList = ({
  filter,
}: {
  filter?: Record<string, string>;
}) => {
  const { data: stageCoaches, isFetching: isStageCoachListLoading } = useQuery({
    queryKey: [...stageCoachesQueryKeys.list({ filter })] as const,
    queryFn: getStageCoachList,
  });

  return { stageCoaches, isStageCoachListLoading };
};

export const useCreateStageCoach = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: handleCreateStageCoach } = useMutation({
    mutationFn: createStageCoach,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: stageCoachesQueryKeys.lists(),
      }),
  });

  return { handleCreateStageCoach };
};

export const useDeleteStageCoach = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: handleDeleteStageCoach, isPending: isDeleteLoading } =
    useMutation({
      mutationFn: deleteStageCoach,
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: stageCoachesQueryKeys.lists(),
        }),
    });

  return { handleDeleteStageCoach, isDeleteLoading };
};

export const useEditStageCoach = ({
  filter,
}: {
  filter?: Record<string, string>;
}) => {
  const queryClient = useQueryClient();
  const {
    data: stageCoachDetailUpdate,
    isPending: isEditLoading,
    mutateAsync: handleEditStageCoach,
  } = useMutation({
    mutationFn: updateStageCoach,
    onSuccess: (updateStageCoach) => {
      queryClient.setQueryData(
        stageCoachesQueryKeys.list({ filter }),
        (oldData: TControl[]) => {
          return oldData.map((control) =>
            control.id === updateStageCoach.id ? updateStageCoach : control,
          );
        },
      );
    },
  });

  return { isEditLoading, stageCoachDetailUpdate, handleEditStageCoach };
};

export const useGetStageCoachDetail = (id: string) => {
  const queryClient = useQueryClient();
  const { data: stageCoachDetail, isFetching: isDetailLoading } = useQuery({
    queryKey: stageCoachesQueryKeys.detail(id),
    queryFn: getStageCoach,
    initialData: () =>
      queryClient
        .getQueryData<TControl[]>(stageCoachesQueryKeys.lists())
        ?.find((control) => control.id === id),
    staleTime: 10 * (60 * 100),
    enabled: !!id,
  });

  return { stageCoachDetail, isDetailLoading };
};
