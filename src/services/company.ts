import { QueryFunctionContext } from '@tanstack/react-query';

// services
import { apiRequest } from '@/services';

// Types
import { TCompany, TCompanyList } from '@/types';

// Constants
import {
  API_PATHS,
  HTTP_METHOD,
  PAGE_SIZE,
  companyQueryKeys,
} from '@/constants';

export const createCompany = async ({ company }: { company: TCompany }) => {
  return await apiRequest<TCompany>(HTTP_METHOD.POST, API_PATHS.COMPANIES, {
    ...company,
  });
};

export const getCompanyList = async ({
  queryKey: [{ filter, page }],
}: QueryFunctionContext<ReturnType<(typeof companyQueryKeys)['list']>>) => {
  const params = {
    _page: page.toString(),
    _per_page: PAGE_SIZE.toString(),
    _sort: '-createdAt',
    ...filter,
  };
  const urlParams = new URLSearchParams(params);

  return await apiRequest<TCompanyList>(
    HTTP_METHOD.GET,
    `${API_PATHS.COMPANIES}?${urlParams}`,
  );
};

export const deleteCompany = async ({ id }: { id: string }) => {
  return await apiRequest<TCompany>(
    HTTP_METHOD.DELETE,
    `${API_PATHS.COMPANIES}/${id}`,
  );
};

export const getCompany = async ({
  queryKey: [{ id }],
}: QueryFunctionContext<ReturnType<(typeof companyQueryKeys)['detail']>>) => {
  return await apiRequest<TCompany>(
    HTTP_METHOD.GET,
    `${API_PATHS.COMPANIES}/${id}`,
  );
};

export const updateCompany = async ({ company }: { company: TCompany }) => {
  return await apiRequest<TCompany>(
    HTTP_METHOD.PUT,
    `${API_PATHS.COMPANIES}/${company.id}`,
    {
      ...company,
    },
  );
};
