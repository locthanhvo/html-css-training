import { User } from '@/types';

export type QueryParamsType<
  T extends Record<string, string | number | boolean>
> = {
  page: number;
  limit: number;
  sortBy: string;
  order: string;
} & T;

export type UserQueryParamsType = QueryParamsType<{
  email: string;
  firstName: string;
}>;

export type AllowedQueryKeys<
  T extends Record<string, string | number | boolean>
> = keyof QueryParamsType<T>;

export type QueryExecutor<T extends Record<string, string | number | boolean>> =
  (query: QueryParamsType<T>) => Promise<void>;
