// Types
import { TUser } from '@/types';

// Status
import { STATUS } from '@/constants';

export const EMAIL_ADMIN = 'admin@gmail.com';

export const INITIAL_USER: TUser = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phone: '',
  status: STATUS.INACTIVE,
  createdAt: '',
  updatedAt: '',
};
