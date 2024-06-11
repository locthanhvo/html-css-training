import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Constants
import { companyQueryKeys } from '@/constants';

// Services
import {
  createCompany,
  deleteCompany,
  getCompany,
  getCompanyList,
  updateCompany,
} from '@/services';

// Types
import { TCompanyList } from '@/types';

export const useGetCompanyList = ({
  page,
  filter,
}: {
  page: number;
  filter?: Record<string, string>;
}) => {
  const { data: companies, isFetching: isCompanyListLoading } = useQuery({
    queryKey: [...companyQueryKeys.list({ page, filter })] as const,
    queryFn: getCompanyList,
  });

  return { companies, isCompanyListLoading };
};

export const useCreateCompany = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: handleCreateCompany } = useMutation({
    mutationFn: createCompany,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: companyQueryKeys.lists(),
      }),
  });

  return { handleCreateCompany };
};

export const useDeleteCompany = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: handleDeleteCompany, isPending: isDeleteLoading } =
    useMutation({
      mutationFn: deleteCompany,
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: companyQueryKeys.lists(),
        }),
    });

  return { handleDeleteCompany, isDeleteLoading };
};

export const useEditCompany = ({
  page,
  filter,
}: {
  page: number;
  filter?: Record<string, string>;
}) => {
  const queryClient = useQueryClient();
  const {
    data: companyDetailUpdate,
    isPending: isEditLoading,
    mutateAsync: handleEditCompany,
  } = useMutation({
    mutationFn: updateCompany,
    onSuccess: (updatedCompany) => {
      queryClient.setQueryData(
        companyQueryKeys.list({ page, filter }),
        (oldData: TCompanyList) => {
          return {
            ...oldData,
            data: oldData.data.map((company) =>
              company.id === updatedCompany.id ? updatedCompany : company,
            ),
          };
        },
      );
    },
  });

  return { isEditLoading, companyDetailUpdate, handleEditCompany };
};

export const useGetCompanyDetail = (id: string) => {
  const queryClient = useQueryClient();

  const { data: companyDetail, isFetching: isCompanyLoading } = useQuery({
    queryKey: companyQueryKeys.detail(id),
    queryFn: getCompany,
    initialData: () =>
      queryClient
        .getQueryData<TCompanyList>(companyQueryKeys.lists())
        ?.data.find((company) => company.id === id),
    staleTime: 10 * (60 * 100),
    enabled: !!id,
  });

  return { companyDetail, isCompanyLoading };
};
