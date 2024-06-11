import { STATUS } from '@/constants';

export type TUser = {
  id?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  status?: STATUS;
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type TAuthForm = Omit<TUser, 'id' | 'createdAt'> & {
  confirmPassword: string;
  isAcceptPrivacyPolicy: boolean;
};

export type TUserList = {
  items: number;
  pages: number;
  next: number;
  prev: number;
  data: TUser[];
};

export type TQueryKey = {
  page: number;
  filter?: Record<string, string>;
};
