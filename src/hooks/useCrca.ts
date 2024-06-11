import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Constants
import { crcaQueryKeys } from '@/constants';

// Services
import {
  createCrca,
  deleteCrca,
  getCrca,
  getCrcaList,
  updateCrca,
} from '@/services';

// Types
import { TControl } from '@/types';

export const useGetCrcaList = ({
  filter,
}: {
  filter?: Record<string, string>;
}) => {
  const { data: crca, isFetching: isCrcaListLoading } = useQuery({
    queryKey: [...crcaQueryKeys.list({ filter })] as const,
    queryFn: getCrcaList,
  });

  return { crca, isCrcaListLoading };
};

export const useCreateCrca = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: handleCreateCrca } = useMutation({
    mutationFn: createCrca,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: crcaQueryKeys.lists(),
      }),
  });

  return { handleCreateCrca };
};

export const useDeleteCrca = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: handleDeleteCrca, isPending: isDeleteLoading } =
    useMutation({
      mutationFn: deleteCrca,
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: crcaQueryKeys.lists(),
        }),
    });

  return { handleDeleteCrca, isDeleteLoading };
};

export const useEditCrca = ({
  filter,
}: {
  filter?: Record<string, string>;
}) => {
  const queryClient = useQueryClient();
  const {
    data: detailUpdate,
    isPending: isEditLoading,
    mutateAsync: handleEditCrca,
  } = useMutation({
    mutationFn: updateCrca,
    onSuccess: (updateCrca) => {
      queryClient.setQueryData(
        crcaQueryKeys.list({ filter }),
        (oldData: TControl[]) => {
          return oldData.map((control) =>
            control.id === updateCrca.id ? updateCrca : control,
          );
        },
      );
    },
  });

  return { isEditLoading, detailUpdate, handleEditCrca };
};

export const useGetCrcaDetail = (id: string) => {
  const queryClient = useQueryClient();
  const { data: crcaDetail, isFetching: isDetailLoading } = useQuery({
    queryKey: crcaQueryKeys.detail(id),
    queryFn: getCrca,
    initialData: () =>
      queryClient
        .getQueryData<TControl[]>(crcaQueryKeys.lists())
        ?.find((control) => control.id === id),
    staleTime: 10 * (60 * 100),
    enabled: !!id,
  });

  return { crcaDetail, isDetailLoading };
};
