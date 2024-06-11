import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Constants
import { brigadeQueryKeys } from '@/constants';

// Services
import {
  createBrigade,
  deleteBrigade,
  getBrigade,
  getBrigadeList,
  updateBrigade,
} from '@/services';

// Types
import { TBrigade } from '@/types';

export const useGetBrigadeList = ({
  filter,
}: {
  filter?: Record<string, string>;
}) => {
  const { data: brigades, isFetching: isBrigadesListLoading } = useQuery({
    queryKey: [...brigadeQueryKeys.list({ filter })] as const,
    queryFn: getBrigadeList,
  });

  return { brigades, isBrigadesListLoading };
};

export const useCreateBrigade = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: handleCreateBrigade } = useMutation({
    mutationFn: createBrigade,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: brigadeQueryKeys.lists(),
      }),
  });

  return { handleCreateBrigade };
};

export const useDeleteBrigade = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: handleDeleteBrigade, isPending: isDeleteLoading } =
    useMutation({
      mutationFn: deleteBrigade,
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: brigadeQueryKeys.lists(),
        }),
    });

  return { handleDeleteBrigade, isDeleteLoading };
};

export const useEditBrigade = ({
  filter,
}: {
  filter?: Record<string, string>;
}) => {
  const queryClient = useQueryClient();
  const {
    data: brigadeDetailUpdate,
    isPending: isEditLoading,
    mutateAsync: handleEditBrigade,
  } = useMutation({
    mutationFn: updateBrigade,
    onSuccess: (updateBrigade) => {
      queryClient.setQueryData(
        brigadeQueryKeys.list({ filter }),
        (oldData: TBrigade[]) => {
          return oldData.map((brigade) =>
            brigade.id === updateBrigade.id ? updateBrigade : brigade,
          );
        },
      );
    },
  });

  return { isEditLoading, brigadeDetailUpdate, handleEditBrigade };
};

export const useGetBrigadeDetail = (id: string) => {
  const queryClient = useQueryClient();
  const { data: brigadeDetail, isFetching: isBrigadeLoading } = useQuery({
    queryKey: brigadeQueryKeys.detail(id),
    queryFn: getBrigade,
    initialData: () =>
      queryClient
        .getQueryData<TBrigade[]>(brigadeQueryKeys.lists())
        ?.find((brigade) => brigade.id === id),
    staleTime: 10 * (60 * 100),
    enabled: !!id,
  });

  return { brigadeDetail, isBrigadeLoading };
};
