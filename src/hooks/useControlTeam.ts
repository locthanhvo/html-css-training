import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Constants
import { controlTeamsQueryKeys } from '@/constants';

// Services
import {
  createControl,
  deleteControl,
  getControl,
  getControlList,
  updateControl,
} from '@/services';

// Types
import { TControl } from '@/types';

export const useGetControlTeamsList = ({
  filter,
}: {
  filter?: Record<string, string>;
}) => {
  const { data: controlTeams, isFetching: isControlTeamsListLoading } =
    useQuery({
      queryKey: [...controlTeamsQueryKeys.list({ filter })] as const,
      queryFn: getControlList,
    });

  return { controlTeams, isControlTeamsListLoading };
};

export const useCreateControlTeam = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: handleCreateControlTeams } = useMutation({
    mutationFn: createControl,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: controlTeamsQueryKeys.lists(),
      }),
  });

  return { handleCreateControlTeams };
};

export const useDeleteControlTeam = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: handleDeleteControlTeam, isPending: isDeleteLoading } =
    useMutation({
      mutationFn: deleteControl,
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: controlTeamsQueryKeys.lists(),
        }),
    });

  return { handleDeleteControlTeam, isDeleteLoading };
};

export const useEditControlTeam = ({
  filter,
}: {
  filter?: Record<string, string>;
}) => {
  const queryClient = useQueryClient();
  const {
    data: controlTeamDetailUpdate,
    isPending: isEditLoading,
    mutateAsync: handleEditControlTeam,
  } = useMutation({
    mutationFn: updateControl,
    onSuccess: (updateControl) => {
      queryClient.setQueryData(
        controlTeamsQueryKeys.list({ filter }),
        (oldData: TControl[]) => {
          return oldData.map((control) =>
            control.id === updateControl.id ? updateControl : control,
          );
        },
      );
    },
  });

  return { isEditLoading, controlTeamDetailUpdate, handleEditControlTeam };
};

export const useGetControlTeamDetail = (id: string) => {
  const queryClient = useQueryClient();
  const { data: controlTeamDetail, isFetching: isDetailLoading } = useQuery({
    queryKey: controlTeamsQueryKeys.detail(id),
    queryFn: getControl,
    initialData: () =>
      queryClient
        .getQueryData<TControl[]>(controlTeamsQueryKeys.lists())
        ?.find((control) => control.id === id),
    staleTime: 10 * (60 * 100),
    enabled: !!id,
  });

  return { controlTeamDetail, isDetailLoading };
};
