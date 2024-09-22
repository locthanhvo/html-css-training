'use server';
import { revalidateTag } from 'next/cache';

// Constants
import { API_ENDPOINT } from '@/constants';

// Services
import { apiClient } from '@/services';

// Types
import { IUserModel, IUserStatistics, TDataSource } from '@/types';

interface FetchDataProps {
  searchParams?: {
    search?: string;
    page?: number;
    limit?: number;
  };
  options?: RequestInit;
}

export const getUsers = async ({
  searchParams,
  options = { cache: 'no-store' },
}: FetchDataProps) => {
  const params = new URLSearchParams(searchParams as Record<string, string>);

  const url = `${API_ENDPOINT.USERS}?${params}`;

  return await apiClient.getData<TDataSource[]>(url, options);
};

export const getUserStatistics = async (): Promise<IUserStatistics> => {
  try {
    const url = `${API_ENDPOINT.USERS}`;

    const users = await apiClient.getData<TDataSource[]>(url, {
      cache: 'no-store',
      next: { tags: [API_ENDPOINT.USERS] },
    });

    return {
      total: users.data.length,
      new: users.data.filter((user) => user.status === 'online').length,
      top: users.data.filter((user) => user.status === 'offline').length,
      other:
        users.data.length -
        users.data.filter((user) => user.status === 'offline').length,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred in the request get users';
    throw new Error(errorMessage);
  }
};

export const addUser = async (data: IUserModel) => {
  try {
    const url = `${API_ENDPOINT.USERS}`;
    await apiClient.postData(url, data);

    revalidateTag(API_ENDPOINT.USERS);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
};

export const deleteUser = async (id: string) => {
  try {
    const url = `/${API_ENDPOINT.USERS}/${id}`;

    await apiClient.deleteData(url);

    revalidateTag(API_ENDPOINT.USERS);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
};

export const getUser = async (id: string) => {
  try {
    const url = `/${API_ENDPOINT.USERS}/${id}`;

    return await apiClient.getData<IUserModel>(url, { cache: 'no-store' });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
};

export const updateUser = async (id: string, data: IUserModel) => {
  try {
    const url = `/${API_ENDPOINT.USERS}/${id}`;
    await apiClient.putData(url, data);

    revalidateTag(API_ENDPOINT.USERS);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
};
