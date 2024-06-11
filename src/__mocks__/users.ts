import { STATUS } from '@/constants';

export const USERS = Array.from({ length: 5 }).map((_, index) => ({
  id: `${index}`,
  firstName: 'Devon',
  lastName: 'Lane',
  email: 'devon@mail.com',
  phone: '+237 6 99 88 77 66',
  status: STATUS.VALID,
  createdAt: '2024-06-05 14:46:58',
  updatedAt: '2024-06-05 14:46:58',
}));
